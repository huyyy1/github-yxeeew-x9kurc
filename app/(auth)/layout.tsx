import { Container } from '@/components/ui/container'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50">
      <Container size="sm" className="py-8">
        {children}
      </Container>
    </div>
  )
}