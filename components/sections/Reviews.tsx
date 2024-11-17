import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Star } from 'lucide-react'

const reviews = [
  {
    name: "Sarah M.",
    location: "Sydney",
    rating: 5,
    comment: "Excellent service! The cleaners were professional and thorough."
  },
  {
    name: "James P.",
    location: "Melbourne",
    rating: 5,
    comment: "Very reliable and consistent cleaning service. Highly recommend!"
  },
  {
    name: "Emma L.",
    location: "Brisbane",
    rating: 5,
    comment: "Great attention to detail and friendly service."
  }
]

export function Reviews() {
  return (
    <section className="py-24">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            What Our Customers Say
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Read reviews from our satisfied customers across Australia
          </p>
        </div>
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center gap-2">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <CardTitle className="text-xl">{review.name}</CardTitle>
                <CardDescription>{review.location}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{review.comment}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}