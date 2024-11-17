import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export function Hero() {
  return (
    <section className="py-24 px-4 bg-gradient-to-b from-muted/50 to-background">
      <div className="container">
        <div className="flex flex-col items-center text-center space-y-8 max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Professional House Cleaning Services
          </h1>
          <p className="text-xl text-muted-foreground">
            Expert cleaners delivering spotless homes across Australia's major cities
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" asChild>
              <Link href="/book">Book Now</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/services">View Services</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mt-12">
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">20k+</div>
                <p className="text-muted-foreground">Happy Customers</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">6</div>
                <p className="text-muted-foreground">Major Cities</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">4.9/5</div>
                <p className="text-muted-foreground">Customer Rating</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}