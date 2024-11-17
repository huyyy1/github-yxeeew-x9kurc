import { mkdirSync } from 'fs'
import { join } from 'path'
import { logVersionInfo } from './version-logger'

// Ensure .git/hooks directory exists
try {
  mkdirSync(join(process.cwd(), '.git', 'hooks'), { recursive: true })
} catch (error) {
  // Ignore directory exists error
  if ((error as any).code !== 'EEXIST') {
    console.error('Failed to create hooks directory:', error)
  }
}

// Log version info after install
logVersionInfo('install', 'npm install')

// Exit successfully
process.exit(0)