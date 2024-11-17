import { notFound } from 'next/navigation'
import { CITIES } from '@/lib/constants'

interface CityLayoutProps {
  children: React.ReactNode
  params: {
    city: string
  }
}

export function generateStaticParams() {
  return CITIES.map((city) => ({
    city: city.slug,
  }))
}

export default function CityLayout({ children, params }: CityLayoutProps) {
  if (!CITIES.find(city => city.slug === params.city)) {
    notFound()
  }

  return <>{children}</>
}