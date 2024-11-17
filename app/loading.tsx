import { Container } from '@/components/ui/container'

export default function Loading() {
  return (
    <Container className="flex min-h-screen items-center justify-center">
      <div className="animate-pulse space-y-4">
        <div className="h-8 w-[200px] rounded-md bg-muted"></div>
        <div className="h-4 w-[300px] rounded-md bg-muted"></div>
      </div>
    </Container>
  )
}