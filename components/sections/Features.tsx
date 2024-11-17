import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Check } from 'lucide-react'

const features = [
  {
    title: "Professional Cleaners",
    description: "Experienced, vetted, and fully insured cleaning professionals"
  },
  {
    title: "Flexible Scheduling",
    description: "Book your preferred time, including evenings and weekends"
  },
  {
    title: "Quality Guaranteed",
    description: "100% satisfaction guarantee with our cleaning services"
  },
  {
    title: "Eco-Friendly Options",
    description: "Green cleaning solutions available upon request"
  },
  {
    title: "Online Booking",
    description: "Easy online booking and scheduling system"
  },
  {
    title: "Regular Updates",
    description: "Stay informed with real-time cleaning progress updates"
  }
]

export function Features() {
  return (
    <section className="py-24 bg-muted/50">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Why Choose SimplyMaid?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Experience the difference with our professional cleaning services
          </p>
        </div>
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title}>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="p-1 rounded-full bg-primary/10">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}