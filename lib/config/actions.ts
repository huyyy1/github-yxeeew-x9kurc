'use server'

import { revalidatePath } from 'next/cache'
import { db } from '@/lib/db'

export async function updateConfig(config: any) {
  try {
    // Store in database
    await db.query`
      INSERT INTO config (key, value)
      VALUES ('site', ${JSON.stringify(config)})
      ON CONFLICT (key) DO UPDATE
      SET value = ${JSON.stringify(config)}
    `

    // Revalidate all pages to reflect config changes
    revalidatePath('/')
    
    return { success: true }
  } catch (error) {
    console.error('Failed to update config:', error)
    throw new Error('Failed to update configuration')
  }
}