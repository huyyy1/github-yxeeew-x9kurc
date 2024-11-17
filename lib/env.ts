import { z } from 'zod'

const envSchema = z.object({
  // App
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  
  // Database
  POSTGRES_DATABASE_URL: z.string().url(),
  
  // Supabase
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
  
  // External Services
  NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: z.string().min(1),
  OPENAI_API_KEY: z.string().min(1).optional(),
  
  // Email (BentoNow)
  BENTO_API_BASE: z.string().url(),
  BENTO_SITE_KEY: z.string().min(1),
  BENTO_PUBLISHABLE_KEY: z.string().min(1),
  BENTO_SECRET_KEY: z.string().min(1),
})

export function validateEnv() {
  try {
    const parsed = envSchema.parse(process.env)
    return { success: true, data: parsed, errors: null }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.errors.map(err => ({
        path: err.path.join('.'),
        message: err.message
      }))
      console.error('❌ Environment validation failed:', errors)
      return { success: false, data: null, errors }
    }
    throw error
  }
}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envSchema> {}
  }
}

export const env = validateEnv()