import { DashboardNav } from '@/components/dashboard/DashboardNav'
import { Container } from '@/components/ui/container'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <DashboardNav />
      <main className="flex-1">
        <Container className="py-8">
          {children}
        </Container>
      </main>
    </div>
  )
}