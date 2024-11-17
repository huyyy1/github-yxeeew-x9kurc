import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import postgres from 'postgres'
import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const runMigrations = async () => {
  if (!process.env.POSTGRES_DATABASE_URL) {
    throw new Error('POSTGRES_DATABASE_URL environment variable is required')
  }

  const migrationClient = postgres(process.env.POSTGRES_DATABASE_URL, { 
    max: 1,
    ssl: true
  })
  
  const db = drizzle(migrationClient)

  console.log('⏳ Running migrations...')
  
  try {
    await migrate(db, {
      migrationsFolder: './lib/db/migrations'
    })
    console.log('✅ Migrations completed!')
  } catch (error) {
    console.error('❌ Migration failed:', error)
    process.exit(1)
  }

  await migrationClient.end()
  process.exit(0)
}

runMigrations().catch((err) => {
  console.error('Migration error:', err)
  process.exit(1)
})