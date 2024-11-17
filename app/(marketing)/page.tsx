import { Hero } from '@/components/sections/Hero'
import { Features } from '@/components/sections/Features'
import { CitySelector } from '@/components/sections/CitySelector'
import { Reviews } from '@/components/sections/Reviews'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <CitySelector />
      <Reviews />
    </>
  )
}