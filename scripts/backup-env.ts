import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

function backupEnv() {
  try {
    // Read current .env.local
    const envLocal = readFileSync(join(process.cwd(), '.env.local'), 'utf-8')
    
    // Create backup with timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    const backupPath = join(process.cwd(), 'backups', `env-${timestamp}.backup`)
    
    writeFileSync(backupPath, envLocal)
    console.log('✅ Environment variables backed up successfully!')
  } catch (error) {
    console.error('❌ Failed to backup environment variables:', error)
  }
}

backupEnv()