import Link from 'next/link'
import { Separator } from "@/components/ui/separator"

export function Footer() {
  return (
    <footer className="bg-muted">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">SimplyMaid</h3>
            <p className="text-muted-foreground">Professional house cleaning services across Australia</p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <nav className="flex flex-col space-y-2">
              <Link 
                href="/services/regular-cleaning" 
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Regular Cleaning
              </Link>
              <Link 
                href="/services/deep-cleaning"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Deep Cleaning
              </Link>
              <Link 
                href="/services/end-of-lease"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                End of Lease
              </Link>
            </nav>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Locations</h4>
            <nav className="flex flex-col space-y-2">
              <Link 
                href="/sydney"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Sydney
              </Link>
              <Link 
                href="/melbourne"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Melbourne
              </Link>
              <Link 
                href="/brisbane"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Brisbane
              </Link>
            </nav>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <nav className="flex flex-col space-y-2">
              <Link 
                href="/about"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                About
              </Link>
              <Link 
                href="/contact"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Contact
              </Link>
              <Link 
                href="/careers"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Careers
              </Link>
            </nav>
          </div>
        </div>
        
        <Separator className="my-8" />
        
        <div className="text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} SimplyMaid. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}