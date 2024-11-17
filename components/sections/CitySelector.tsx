import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

const cities = [
  {
    name: "Sydney",
    slug: "sydney",
    description: "Professional cleaning services across Sydney and surrounding suburbs"
  },
  {
    name: "Melbourne",
    slug: "melbourne",
    description: "Expert house cleaners serving Greater Melbourne"
  },
  {
    name: "Brisbane",
    slug: "brisbane",
    description: "Top-rated cleaning services throughout Brisbane"
  },
  {
    name: "Perth",
    slug: "perth",
    description: "Quality home cleaning across Perth metropolitan area"
  },
  {
    name: "Adelaide",
    slug: "adelaide",
    description: "Trusted cleaning professionals in Adelaide"
  },
  {
    name: "Canberra",
    slug: "canberra",
    description: "Reliable house cleaning services in the capital"
  }
]

export function CitySelector() {
  return (
    <section className="py-24">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Find Cleaners in Your City
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Professional cleaning services available across major Australian cities
          </p>
        </div>
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cities.map((city) => (
            <Link key={city.slug} href={`/${city.slug}`}>
              <Card className="h-full transition-colors hover:border-primary/50">
                <CardHeader>
                  <CardTitle>{city.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{city.description}</CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}