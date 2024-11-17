import { Metadata } from 'next'
import { CustomerDashboard } from '@/components/dashboard/customer/CustomerDashboard'

export const metadata: Metadata = {
  title: 'Customer Dashboard',
  description: 'Manage your bookings and account',
}

export default function CustomerDashboardPage() {
  return <CustomerDashboard />
}