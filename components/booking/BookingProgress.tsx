import { Separator } from '@/components/ui/separator'

export function BookingProgress() {
  return (
    <div className="border-b">
      <div className="container mx-auto py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">1</div>
              <span>Service</span>
            </div>
            <Separator className="w-8" />
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center">2</div>
              <span>Details</span>
            </div>
            <Separator className="w-8" />
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center">3</div>
              <span>Confirmation</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}