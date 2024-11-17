import type { Metadata } from "next"
import config from "@/config"

export const getSEOTags = ({
  title,
  description,
  keywords,
  openGraph,
  canonicalUrlRelative,
  extraTags,
}: Metadata & {
  canonicalUrlRelative?: string
  extraTags?: Record<string, any>
} = {}): Metadata => {
  const baseUrl = process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : `https://${config.domainName}`

  return {
    title: title || config.appName,
    description: description || config.appDescription,
    keywords: keywords || config.seo.keywords,
    applicationName: config.appName,
    metadataBase: new URL(baseUrl),

    openGraph: {
      title: openGraph?.title || config.appName,
      description: openGraph?.description || config.appDescription,
      url: openGraph?.url || baseUrl,
      siteName: openGraph?.title || config.appName,
      locale: "en_AU",
      type: "website",
      images: [
        {
          url: `${baseUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: config.appName
        }
      ]
    },

    twitter: {
      title: openGraph?.title || config.appName,
      description: openGraph?.description || config.appDescription,
      card: "summary_large_image",
      creator: config.social.twitter,
      images: [`${baseUrl}/twitter-image.jpg`]
    },

    alternates: {
      canonical: canonicalUrlRelative ? `${baseUrl}${canonicalUrlRelative}` : baseUrl,
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

    ...extraTags,
  }
}

export const renderSchemaTags = () => {
  const schema = {
    "@context": "http://schema.org",
    "@type": "LocalBusiness",
    "@id": `https://${config.domainName}`,
    name: config.appName,
    description: config.appDescription,
    url: `https://${config.domainName}`,
    logo: `https://${config.domainName}/logo.png`,
    image: `https://${config.domainName}/share.png`,
    telephone: "+61 2 8006 4422",
    email: "support@simplymaid.com.au",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressCountry: "AU",
      addressRegion: "NSW",
      addressLocality: "Sydney"
    },
    areaServed: [
      {
        "@type": "City",
        name: "Sydney"
      },
      {
        "@type": "City",
        name: "Melbourne"
      },
      {
        "@type": "City",
        name: "Brisbane"
      },
      {
        "@type": "City",
        name: "Perth"
      },
      {
        "@type": "City",
        name: "Adelaide"
      },
      {
        "@type": "City",
        name: "Canberra"
      }
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "1250"
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "AUD",
      lowPrice: "120",
      highPrice: "450"
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema)
      }}
    />
  )
}