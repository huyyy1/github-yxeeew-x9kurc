'use client'

import { useEffect } from 'react'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <Container className="flex min-h-screen flex-col items-center justify-center text-center">
      <h2 className="text-2xl font-bold">Something went wrong!</h2>
      <p className="mt-4 text-muted-foreground">
        {error.message || 'An unexpected error occurred'}
      </p>
      <Button onClick={reset} className="mt-8">
        Try again
      </Button>
    </Container>
  )
}