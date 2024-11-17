import { Metadata } from 'next'
import { BookingForm } from '@/components/booking/BookingForm'

export const metadata: Metadata = {
  title: 'Book a Cleaning Service',
  description: 'Book your professional house cleaning service',
}

export default function BookingFlowPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <BookingForm />
    </div>
  )
}