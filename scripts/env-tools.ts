import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { join } from 'path'
import { validateEnv } from '../lib/env'

// Backup environment variables
export async function backupEnv() {
  try {
    const envLocal = readFileSync(join(process.cwd(), '.env.local'), 'utf-8')
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    const backupDir = join(process.cwd(), 'backups')
    
    mkdirSync(backupDir, { recursive: true })
    writeFileSync(join(backupDir, `env-${timestamp}.backup`), envLocal)
    
    console.log('✅ Environment backup created:', `env-${timestamp}.backup`)
    return true
  } catch (error) {
    console.error('❌ Environment backup failed:', error)
    return false
  }
}

// Validate environment variables
export async function validateEnvironment() {
  const result = validateEnv()
  
  if (!result.success) {
    console.error('❌ Environment validation failed:')
    result.errors?.forEach(err => {
      console.error(`  - ${err.path}: ${err.message}`)
    })
    process.exit(1)
  }
  
  console.log('✅ Environment validation passed')
  return true
}

// If running directly, validate environment
if (require.main === module) {
  validateEnvironment()