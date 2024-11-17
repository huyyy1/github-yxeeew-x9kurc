import { Metadata } from 'next'
import { SEOGPTDashboard } from '@/components/dashboard/admin/SEOGPTDashboard'

export const metadata: Metadata = {
  title: 'SEO Dashboard',
  description: 'AI-powered SEO analysis and optimization dashboard',
}

export default function SEODashboardPage() {
  return <SEOGPTDashboard />
}