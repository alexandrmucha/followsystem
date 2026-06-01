export type BusinessLeadDTO = {
  id: string
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
  analysisStatus?: 'analyzing' | 'done' | 'error'
  performanceScore?: number | null
  mobileScore?: number | null
  seoScore?: number | null
  accessibilityScore?: number | null
  bestPracticesScore?: number | null
  hasViewport?: boolean | null
}