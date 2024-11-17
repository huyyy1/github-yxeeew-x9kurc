import { execSync } from 'child_process'
import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import { diffJson } from 'diff'

interface Version {
  major: number
  minor: number
  patch: number
}

interface PackageJson {
  version: string
  dependencies: Record<string, string>
  devDependencies: Record<string, string>
}

// Check for dependency changes
function hasDependencyChanges(): boolean {
  try {
    const currentPkg = JSON.parse(readFileSync('package.json', 'utf-8'))
    const lastCommitPkg = JSON.parse(
      execSync('git show HEAD:package.json').toString()
    )

    const depsChanged = diffJson(
      currentPkg.dependencies,
      lastCommitPkg.dependencies
    ).length > 1
    
    const devDepsChanged = diffJson(
      currentPkg.devDependencies,
      lastCommitPkg.devDependencies
    ).length > 1

    return depsChanged || devDepsChanged
  } catch (error) {
    console.warn('⚠️ Could not check for dependency changes:', error)
    return false
  }
}

// Check for error-related commits
function hasErrorFixes(): boolean {
  try {
    const recentCommits = execSync('git log -n 10 --oneline')
      .toString()
      .toLowerCase()
    
    const errorKeywords = ['fix', 'error', 'bug', 'crash', 'exception']
    return errorKeywords.some(keyword => recentCommits.includes(keyword))
  } catch (error) {
    console.warn('⚠️ Could not check for error fixes:', error)
    return false
  }
}

function getCurrentVersion(): Version {
  const pkg = JSON.parse(readFileSync('package.json', 'utf-8')) as PackageJson
  const [major, minor, patch] = pkg.version.split('.').map(Number)
  return { major, minor, patch }
}

function determineVersionType(forcedType?: 'major' | 'minor' | 'patch'): 'major' | 'minor' | 'patch' {
  if (forcedType) return forcedType

  // Auto-detect version type
  if (hasDependencyChanges() || hasErrorFixes()) {
    return 'major' // Breaking change
  }

  // Check for feature additions
  const hasNewFeatures = execSync('git log -n 10 --oneline')
    .toString()
    .toLowerCase()
    .includes('feat')

  return hasNewFeatures ? 'minor' : 'patch'
}

function updateVersion(type?: 'major' | 'minor' | 'patch'): void {
  const version = getCurrentVersion()
  const versionType = determineVersionType(type)
  
  switch (versionType) {
    case 'major':
      version.major++
      version.minor = 0
      version.patch = 0
      break
    case 'minor':
      version.minor++
      version.patch = 0
      break
    case 'patch':
      version.patch++
      break
  }
  
  const newVersion = `${version.major}.${version.minor}.${version.patch}`
  
  // Update package.json
  const pkg = JSON.parse(readFileSync('package.json', 'utf-8'))
  pkg.version = newVersion
  writeFileSync('package.json', JSON.stringify(pkg, null, 2) + '\n')
  
  // Create git tag
  const date = new Date().toISOString().split('T')[0]
  const message = process.argv[3] || generateChangelogMessage(versionType)
  
  try {
    // Stage changes
    execSync('git add package.json')
    
    // Create commit
    execSync(`git commit -m "chore: bump version to ${newVersion}"`)
    
    // Create annotated tag
    execSync(`git tag -a v${newVersion} -m "${message}"`)
    
    // Update changelog
    updateChangelog(newVersion, versionType, message, date)

    // Push changes
    execSync('git push origin main --tags')
    
    console.log(`✅ Version bumped to ${newVersion}`)
    console.log('✅ Git tag created')
    console.log('✅ Changelog updated')
    console.log('✅ Changes pushed to remote')
  } catch (error) {
    console.error('❌ Failed to update version:', error)
    process.exit(1)
  }
}

function generateChangelogMessage(type: string): string {
  const changes: string[] = []

  if (hasDependencyChanges()) {
    changes.push('Dependencies updated')
  }
  if (hasErrorFixes()) {
    changes.push('Critical bug fixes')
  }

  const recentCommits = execSync('git log -n 5 --oneline')
    .toString()
    .split('\n')
    .filter(Boolean)
    .map(commit => commit.substring(8))
    .join(', ')

  changes.push(`Recent changes: ${recentCommits}`)

  return changes.join('. ')
}

function updateChangelog(version: string, type: string, message: string, date: string): void {
  const changelogPath = join(process.cwd(), 'docs', 'CHANGELOG.md')
  const changelog = readFileSync(changelogPath, 'utf-8')
  
  // Get detailed changes
  const dependencyChanges = getDependencyChanges()
  const errorFixes = getErrorFixes()
  const featureChanges = getFeatureChanges()
  
  const newEntry = `
## [${version}] - ${date}

### ${type.charAt(0).toUpperCase() + type.slice(1)} Changes
${message}

${dependencyChanges ? `### Dependency Updates\n${dependencyChanges}\n` : ''}
${errorFixes ? `### Error Fixes\n${errorFixes}\n` : ''}
${featureChanges ? `### New Features\n${featureChanges}\n` : ''}

### Commits
${getDetailedCommitLog()}
`
  
  const updatedChangelog = changelog.replace(
    /(# Changelog\n)/,
    `$1${newEntry}\n`
  )
  
  writeFileSync(changelogPath, updatedChangelog)
}

function getDependencyChanges(): string | null {
  try {
    const currentPkg = JSON.parse(readFileSync('package.json', 'utf-8'))
    const lastCommitPkg = JSON.parse(
      execSync('git show HEAD:package.json').toString()
    )

    const changes = []

    // Check dependencies
    const diffs = diffJson(currentPkg.dependencies, lastCommitPkg.dependencies)
    diffs.forEach(part => {
      if (part.added) {
        changes.push(`- Added: ${Object.keys(part.value).join(', ')}`)
      }
      if (part.removed) {
        changes.push(`- Removed: ${Object.keys(part.value).join(', ')}`)
      }
    })

    return changes.length ? changes.join('\n') : null
  } catch (error) {
    return null
  }
}

function getErrorFixes(): string | null {
  try {
    const fixes = execSync('git log -n 10 --grep="fix:" --oneline')
      .toString()
      .split('\n')
      .filter(Boolean)
      .map(line => `- ${line.substring(8)}`)
      .join('\n')

    return fixes || null
  } catch (error) {
    return null
  }
}

function getFeatureChanges(): string | null {
  try {
    const features = execSync('git log -n 10 --grep="feat:" --oneline')
      .toString()
      .split('\n')
      .filter(Boolean)
      .map(line => `- ${line.substring(8)}`)
      .join('\n')

    return features || null
  } catch (error) {
    return null
  }
}

function getDetailedCommitLog(): string {
  return execSync('git log $(git describe --tags --abbrev=0)..HEAD --pretty=format:"- %h %s (%an)"')
    .toString()
    .trim()
}

function createPreRelease(): void {
  const version = getCurrentVersion()
  const preVersion = `${version.major}.${version.minor}.${version.patch}-beta.1`
  
  try {
    // Create pre-release tag
    execSync(`git tag -a v${preVersion} -m "Pre-release ${preVersion}"`)
    execSync('git push origin --tags')
    console.log(`✅ Pre-release tag created and pushed: v${preVersion}`)
  } catch (error) {
    console.error('❌ Failed to create pre-release:', error)
    process.exit(1)
  }
}

function main(): void {
  const command = process.argv[2]
  
  switch (command) {
    case 'major':
    case 'minor':
    case 'patch':
      updateVersion(command)
      break
    case 'pre':
      createPreRelease()
      break
    case 'auto':
      updateVersion() // Auto-detect version type
      break
    default:
      console.error('❌ Invalid command. Use: major, minor, patch, pre, or auto')
      process.exit(1)
  }
}

main()