import { checkDatabaseConnection } from '@/lib/db'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default async function DatabaseStatusPage() {
  const isConnected = await checkDatabaseConnection()

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Database Status</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Connection Status</CardTitle>
          <CardDescription>Current database connection status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <div className={`h-3 w-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
            <span>{isConnected ? 'Connected' : 'Disconnected'}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}