import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

if (!process.env.POSTGRES_DATABASE_URL) {
  throw new Error('POSTGRES_DATABASE_URL environment variable is required')
}

// For queries: Use connection pooling in production
const queryClient = postgres(process.env.POSTGRES_DATABASE_URL, {
  max: 1,
  ssl: true,
  prepare: false,
  debug: process.env.NODE_ENV === 'development',
  onnotice: () => {} // Silence notices
})

export const db = drizzle(queryClient, { schema })

// Helper function to check database connection
export async function checkDatabaseConnection() {
  try {
    const result = await queryClient`SELECT NOW()`
    return { connected: true, timestamp: result[0].now }
  } catch (error) {
    console.error('Database connection failed:', error)
    return { connected: false, error }
  }
}