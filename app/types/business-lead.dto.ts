export type BusinessLeadDTO = {
  googlePlaceId: string
  name: string
  address: string | null
  website: string | null
  phone: string | null
  rating: number | null
  reviewCount: number | null
  types: string[]
  businessStatus: string | null
  hasWebsite: boolean
}