# Content Strategy Documentation

## Overview

SimplyMaid's content architecture is designed to maximize local SEO impact through:
- City-specific landing pages
- Service area targeting
- LSI keyword optimization
- Content clustering
- Schema.org implementation
- Social proof integration

## Content Architecture

### 1. City Pages

Each major city (Sydney, Melbourne, Brisbane, etc.) has a dedicated content hierarchy:

```
/[city]/
├── index.mdx                # Main city landing page
├── services/               # City-specific services
│   ├── regular-cleaning/
│   ├── deep-cleaning/
│   └── end-of-lease/
├── locations/             # Service areas
│   ├── inner-west/
│   ├── eastern-suburbs/
│   └── north-shore/
└── guides/               # Local cleaning guides
```

#### City Landing Page Structure
```mdx
---
city: sydney
state: NSW
title: House Cleaning Services Sydney
description: Professional cleaners in Sydney...
keywords:
  primary: 
    - house cleaning sydney
    - domestic cleaning sydney
  secondary:
    - home cleaners sydney
    - residential cleaning sydney
  lsi:
    - apartment cleaning sydney
    - house keeping services sydney
serviceAreas:
  - name: Inner West
    postcode: "2040"
    suburbs: ["Leichhardt", "Marrickville"]
socialProof:
  featuredCleaners: true
  recentBookings: true
  reviews: true
schema:
  type: LocalBusiness
  subtype: CleaningService
---

<CityHero />
<ServiceAreas />
<CleanerProfiles />
<RecentBookings />
<Reviews />
<CityFAQ />
```

### 2. Content Clustering Strategy

#### Service Clusters
Each service type has its own content cluster:

```typescript
{
  'end-of-lease': {
    mainPage: '/services/end-of-lease-cleaning',
    cityPages: [
      '/sydney/end-of-lease-cleaning',
      '/melbourne/end-of-lease-cleaning'
    ],
    suburbPages: [
      '/sydney/inner-west/end-of-lease-cleaning',
      '/sydney/eastern-suburbs/end-of-lease-cleaning'
    ],
    relatedContent: [
      '/guides/end-of-lease-checklist',
      '/blog/bond-cleaning-tips'
    ],
    lsiKeywords: [
      'bond cleaning',
      'move out cleaning',
      'vacate cleaning'
    ]
  }
}
```

#### Location Clusters
Each city has its own location-based cluster:

```typescript
{
  'sydney': {
    mainPage: '/sydney',
    servicePages: [
      '/sydney/regular-cleaning',
      '/sydney/deep-cleaning'
    ],
    suburbPages: [
      '/sydney/inner-west',
      '/sydney/eastern-suburbs'
    ],
    guides: [
      '/guides/sydney-cleaning-costs',
      '/guides/sydney-cleaning-tips'
    ]
  }
}
```

### 3. LSI Keyword Implementation

#### Keyword Mapping
```typescript
{
  sydney: {
    primary: [
      "house cleaning sydney",
      "domestic cleaning sydney"
    ],
    secondary: [
      "home cleaners sydney",
      "residential cleaning sydney"
    ],
    lsi: [
      "apartment cleaning sydney",
      "house keeping services sydney"
    ],
    suburbs: {
      "inner-west": [
        "house cleaning inner west sydney",
        "cleaners inner west"
      ]
    }
  }
}
```

#### Content Generation Rules
1. Primary keywords: 2-3% density
2. Secondary keywords: 1-2% density
3. LSI keywords: Natural inclusion
4. Location markers: Every 300-400 words
5. Suburb mentions: In relevant sections

### 4. Schema.org Implementation

#### Local Business Schema
```json
{
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "CleaningService"],
  "name": "SimplyMaid Sydney",
  "areaServed": {
    "@type": "City",
    "name": "Sydney"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Cleaning Services",
    "itemListElement": [...]
  }
}
```

#### Service Schema
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "House Cleaning",
  "provider": {
    "@type": "LocalBusiness",
    "name": "SimplyMaid Sydney"
  },
  "areaServed": {...}
}
```

### 5. Social Proof Integration

#### Cleaner Profiles
- Professional photos
- Verified badge
- Service areas
- Specialties
- Review count
- Rating

#### Recent Activity
- Recent bookings by suburb
- Before/after photos
- Customer testimonials
- Service type breakdown

### 6. Content Generation System

#### OpenAI Integration
```typescript
interface ContentGeneration {
  type: 'city' | 'suburb' | 'service';
  location: string;
  keywords: string[];
  tone: 'professional' | 'friendly';
  sections: {
    hero: boolean;
    features: boolean;
    social: boolean;
    faq: boolean;
  };
}
```

#### Content Templates
1. City Landing Pages
2. Suburb Pages
3. Service Pages
4. Blog Posts
5. Guides

### 7. SEO Dashboard

#### Features
1. Content Editor
   - Rich text editor
   - Keyword density analysis
   - Readability score
   - Schema.org generator

2. Analytics
   - Page performance
   - Keyword rankings
   - Conversion rates
   - Local pack positions

3. Content Calendar
   - Publishing schedule
   - Content clusters
   - Keyword targeting
   - Author assignments

4. Optimization Tools
   - Title generator
   - Meta description optimizer
   - Header structure analyzer
   - Internal linking suggestions

### 8. Quality Guidelines

#### Content Standards
1. Minimum 1,500 words for city pages
2. 800-1,200 words for suburb pages
3. 2,000+ words for service pages
4. 1,200+ words for blog posts

#### Structure Requirements
1. Clear H1-H6 hierarchy
2. Table of contents for long content
3. FAQ section with structured data
4. Location markers every 300 words
5. Internal links to related content

#### Social Proof Requirements
1. Minimum 3 recent reviews
2. 2-3 featured cleaners
3. Recent booking activity
4. Before/after photos
5. Customer testimonials

### 9. Performance Metrics

#### SEO Goals
1. Top 3 positions for city terms
2. Top 5 for suburb terms
3. Featured snippets for FAQs
4. Local pack presence
5. Rich results for services

#### Content KPIs
1. Organic traffic growth
2. Conversion rates
3. Time on page
4. Bounce rate
5. Social shares

### 10. Implementation Checklist

#### New City Launch
1. Keyword research
2. Content cluster planning
3. Service area mapping
4. Cleaner profiles
5. Schema implementation
6. Social proof collection
7. Content generation
8. Technical SEO audit
9. Launch monitoring
10. Performance tracking

#### Monthly Maintenance
1. Content freshness updates
2. Review monitoring
3. Schema validation
4. Keyword position tracking
5. Competitor analysis
6. Performance optimization
7. Social proof updates
8. Internal linking audit
9. Local SEO verification
10. Analytics review