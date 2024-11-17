import { NextResponse } from 'next/server'
import { z } from 'zod'
import { withAuth } from '@/lib/auth'

const bookingSchema = z.object({
  service: z.string(),
  date: z.string(),
  time: z.string(),
  location: z.string(),
  extras: z.array(z.string()).optional(),
})

export const POST = withAuth(async (req) => {
  try {
    const body = await req.json()
    const data = bookingSchema.parse(body)

    // Handle booking creation
    // Integration with Launch27 API will go here

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid booking data' },
      { status: 400 }
    )
  }
})