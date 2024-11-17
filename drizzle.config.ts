import type { Config } from 'drizzle-kit'
import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

if (!process.env.POSTGRES_DATABASE_URL) {
  throw new Error('POSTGRES_DATABASE_URL environment variable is required')
}

export default {
  schema: './lib/db/schema.ts',
  out: './lib/db/migrations',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.POSTGRES_DATABASE_URL,
    ssl: true
  },
  verbose: true,
  strict: true
} satisfies Config