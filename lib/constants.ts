// Design tokens and constants
export const CITIES = [
  { name: "Sydney", slug: "sydney" },
  { name: "Melbourne", slug: "melbourne" },
  { name: "Brisbane", slug: "brisbane" },
  { name: "Perth", slug: "perth" },
  { name: "Adelaide", slug: "adelaide" },
  { name: "Canberra", slug: "canberra" }
] as const

export const SERVICES = [
  { name: "Regular Cleaning", slug: "regular-cleaning" },
  { name: "Deep Cleaning", slug: "deep-cleaning" },
  { name: "End of Lease", slug: "end-of-lease" }
] as const

export type City = typeof CITIES[number]["slug"]
export type Service = typeof SERVICES[number]["slug"]