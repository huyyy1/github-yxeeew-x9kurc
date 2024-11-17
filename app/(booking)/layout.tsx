import { BookingProgress } from '@/components/booking/BookingProgress'
import { Container } from '@/components/ui/container'

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <BookingProgress />
      <main className="flex-1 py-8">
        <Container>
          {children}
        </Container>
      </main>
    </div>
  )
}