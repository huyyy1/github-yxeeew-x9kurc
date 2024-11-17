import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SERVICES } from '@/lib/constants'
import { ServiceHero } from '@/components/sections/ServiceHero'
import { ServiceFeatures } from '@/components/sections/ServiceFeatures'
import { ServicePricing } from '@/components/sections/ServicePricing'
import { ServiceFAQ } from '@/components/sections/ServiceFAQ'
import { ServiceCTA } from '@/components/sections/ServiceCTA'

interface ServicePageProps {
  params: {
    service: string
  }
}

export function generateMetadata({ params }: ServicePageProps): Metadata {
  const service = SERVICES.find(s => s.slug === params.service)
  if (!service) return {}

  return {
    title: `${service.name} Services - Professional House Cleaning`,
    description: `Professional ${service.name.toLowerCase()} services. Expert cleaners, satisfaction guaranteed. Book your cleaning service today.`
  }
}

export function generateStaticParams() {
  return SERVICES.map((service) => ({
    service: service.slug,
  }))
}

export default function ServicePage({ params }: ServicePageProps) {
  const service = SERVICES.find(s => s.slug === params.service)
  if (!service) notFound()

  return (
    <>
      <ServiceHero service={service} />
      <ServiceFeatures service={service} />
      <ServicePricing service={service} />
      <ServiceFAQ service={service} />
      <ServiceCTA service={service} />
    </>
  )
}