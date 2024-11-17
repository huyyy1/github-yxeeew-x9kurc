'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { db } from '@/lib/db'
import { users } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export async function signUp(email: string) {
  const supabase = createClient()

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
    },
  })

  if (error) {
    throw error
  }

  revalidatePath('/')
  redirect('/auth/verify')
}

export async function signOut() {
  const supabase = createClient()
  await supabase.auth.signOut()
  revalidatePath('/')
  redirect('/')
}

export async function getUser() {
  const supabase = createClient()
  
  const { data: { session } } = await supabase.auth.getSession()
  if (!session?.user) return null

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, session.user.id))

  return user
}