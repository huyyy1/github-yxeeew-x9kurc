'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'

const bookingSchema = z.object({
  serviceType: z.string(),
  date: z.string(),
  time: z.string(),
  location: z.string(),
  extras: z.array(z.string()).optional(),
})

export async function createBooking(formData: FormData) {
  const supabase = createClient()
  
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect('/login')
  }

  const rawData = {
    serviceType: formData.get('serviceType'),
    date: formData.get('date'),
    time: formData.get('time'),
    location: formData.get('location'),
    extras: formData.getAll('extras'),
  }

  const validatedData = bookingSchema.parse(rawData)

  try {
    await db.insert('bookings').values({
      ...validatedData,
      userId: session.user.id,
      status: 'pending',
    })

    revalidatePath('/bookings')
    redirect('/bookings/success')
  } catch (error) {
    console.error('Booking creation failed:', error)
    throw new Error('Failed to create booking')
  }
}