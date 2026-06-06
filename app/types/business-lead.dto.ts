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
  analysisStatus?: 'analyzing' | 'done' | 'error' | 'cancelled'
  performanceScore?: number | null
  mobileScore?: number | null
  seoScore?: number | null
  accessibilityScore?: number | null
  bestPracticesScore?: number | null
  largestContentfulPaint?: number | null
  totalByteWeight?: number | null
  hasSsl?: boolean | null
  email?: string | null
  isResponsive?: boolean | null
  aiMissingCtaMobile?: boolean | null
  aiMissingCtaDesktop?: boolean | null
  aiDesignScore?: number | null
  aiCopywritingScore?: number | null
  aiHasOwnWebsite?: boolean | null
  hasThirdLevelDomain?: boolean | null
  aiUsesWebBuilder?: boolean | null
  aiHasWebBuilderAds?: boolean | null
  aiCopyrightYear?: number | null
  leadScore?: number | null
}