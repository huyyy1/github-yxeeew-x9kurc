const config = {
  appName: "SimplyMaid",
  appDescription: "Professional house cleaning services across Australia's major cities. Book trusted local cleaners for regular cleaning, deep cleaning, and end of lease cleaning.",
  domainName: "simplymaid.com.au",
  
  // SEO defaults
  seo: {
    title: {
      template: "%s | SimplyMaid",
      default: "SimplyMaid - Professional House Cleaning Services"
    },
    description: "Expert cleaners delivering spotless homes across Sydney, Melbourne, Brisbane, Perth, Adelaide, and Canberra. Book your professional cleaning service today.",
    keywords: [
      "house cleaning",
      "cleaning services",
      "home cleaners",
      "end of lease cleaning",
      "deep cleaning",
      "australia cleaning services"
    ]
  },
  
  // Social media
  social: {
    twitter: "@simplymaid",
    facebook: "simplymaidau",
    instagram: "simplymaid.au"
  }
} as const

export default config