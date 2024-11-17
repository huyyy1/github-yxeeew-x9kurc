import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const headersList = await headers()
  const supabase = createClient()
  
  try {
    const { data, error } = await supabase
      .from('some_table')
      .select('*')
      .limit(10)

    if (error) throw error

    return NextResponse.json({ data })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}