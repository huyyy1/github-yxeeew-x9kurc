import { logVersionInfo } from './version-logger'

// Log version info when starting dev server
logVersionInfo('dev', 'npm run dev')

// Exit successfully
process.exit(0)