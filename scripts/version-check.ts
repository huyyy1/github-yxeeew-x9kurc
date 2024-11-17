import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { join } from 'path'

interface VersionLog {
  timestamp: string
  version: string
  nodeVersion: string
  dependencies: Record<string, string>
  devDependencies: Record<string, string>
  command?: string
}

function logVersionInfo(command?: string) {
  try {
    // Create logs directory
    const logsDir = join(process.cwd(), 'logs')
    mkdirSync(logsDir, { recursive: true })

    // Read package.json
    const pkg = JSON.parse(readFileSync('package.json', 'utf-8'))
    
    // Create version log
    const log: VersionLog = {
      timestamp: new Date().toISOString(),
      version: pkg.version,
      nodeVersion: process.version,
      dependencies: pkg.dependencies,
      devDependencies: pkg.devDependencies,
      command
    }

    // Write to versioning.md
    const versioningPath = join(logsDir, 'versioning.md')
    const existingContent = readFileSync(versioningPath, 'utf-8').toString()
    
    const newEntry = `
## Version ${log.version} - ${new Date().toLocaleDateString()}

- Node Version: ${log.nodeVersion}
- Command: ${command || 'Manual Update'}
- Timestamp: ${log.timestamp}

### Dependencies
${Object.entries(log.dependencies)
  .map(([name, version]) => `- ${name}: ${version}`)
  .join('\n')}

### Dev Dependencies
${Object.entries(log.devDependencies)
  .map(([name, version]) => `- ${name}: ${version}`)
  .join('\n')}

---
`

    writeFileSync(versioningPath, newEntry + existingContent)
    console.log(`✅ Version info logged: ${log.version}`)
  } catch (error) {
    console.error('❌ Failed to log version info:', error)
  }
}

// Log version info
const command = process.env.npm_lifecycle_event
logVersionInfo(command)

// Exit successfully
process.exit(0)