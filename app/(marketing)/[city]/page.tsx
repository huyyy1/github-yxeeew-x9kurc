import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CITIES } from '@/lib/constants'
import { getSEOTags } from '@/lib/seo'
import { CityHero } from '@/components/sections/CityHero'
import { ServiceAreas } from '@/components/sections/ServiceAreas'
import { CleanerProfiles } from '@/components/sections/CleanerProfiles'
import { RecentBookings } from '@/components/sections/RecentBookings'
import { CityFAQ } from '@/components/sections/CityFAQ'

interface CityPageProps {
  params: {
    city: string
  }
}

export function generateMetadata({ params }: CityPageProps): Metadata {
  const city = CITIES.find(c => c.slug === params.city)
  if (!city) return {}

  return getSEOTags({
    title: `House Cleaning Services in ${city.name}`,
    description: `Professional house cleaning services in ${city.name}. Book trusted local cleaners for regular cleaning, deep cleaning, and end of lease cleaning.`,
    canonicalUrlRelative: `/${params.city}`,
    openGraph: {
      title: `Professional House Cleaning in ${city.name}`,
      description: `Book trusted local cleaners in ${city.name} for regular cleaning, deep cleaning, and end of lease cleaning services. ✓ Professional ✓ Reliable ✓ Affordable`,
    }
  })
}

export default function CityPage({ params }: CityPageProps) {
  const city = CITIES.find(c => c.slug === params.city)
  if (!city) notFound()

  return (
    <>
      <CityHero city={city} />
      <ServiceAreas city={city} />
      <CleanerProfiles city={city} />
      <RecentBookings city={city} />
      <CityFAQ city={city} />
    </>
  )
}