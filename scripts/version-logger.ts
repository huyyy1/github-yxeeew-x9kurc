import { appendFileSync, mkdirSync } from 'fs'
import { join } from 'path'
import { execSync } from 'child_process'

interface LogEntry {
  timestamp: string
  type: 'install' | 'dev' | 'build'
  version: string
  nodeVersion: string
  command?: string
  output: string
}

export function logVersionInfo(type: LogEntry['type'], command?: string) {
  try {
    // Create logs directory if it doesn't exist
    const logsDir = join(process.cwd(), 'logs')
    mkdirSync(logsDir, { recursive: true })

    // Get current version from package.json
    const pkg = JSON.parse(execSync('cat package.json').toString())
    const version = pkg.version

    // Create log entry
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      type,
      version,
      nodeVersion: process.version,
      command,
      output: execSync('npm list --depth=0').toString()
    }

    // Append to log file
    const logFile = join(logsDir, 'version-history.log')
    appendFileSync(logFile, `
[${entry.timestamp}] ${entry.type.toUpperCase()}
Version: ${entry.version}
Node: ${entry.nodeVersion}
${command ? `Command: ${command}\n` : ''}
Dependencies:
${entry.output}
${'='.repeat(80)}
`)

    console.log(`✅ Version info logged: ${entry.version}`)
  } catch (error) {
    console.error('❌ Failed to log version info:', error)
  }
}