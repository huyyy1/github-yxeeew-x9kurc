import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function DashboardNav() {
  return (
    <nav className="w-64 border-r min-h-screen p-4">
      <div className="space-y-4">
        <Button variant="ghost" className="w-full justify-start" asChild>
          <Link href="/dashboard">Overview</Link>
        </Button>
        <Button variant="ghost" className="w-full justify-start" asChild>
          <Link href="/dashboard/bookings">Bookings</Link>
        </Button>
        <Button variant="ghost" className="w-full justify-start" asChild>
          <Link href="/dashboard/profile">Profile</Link>
        </Button>
        <Button variant="ghost" className="w-full justify-start" asChild>
          <Link href="/dashboard/settings">Settings</Link>
        </Button>
      </div>
    </nav>
  )
}