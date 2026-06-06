import type { BusinessLeadDTO } from "~/types/business-lead.dto"

export function useAnalysisStream() {
  const config = useRuntimeConfig()

  function streamSession(
    sessionId: string,
    onUpdate: (data: {
      leadId: string
      status: NonNullable<BusinessLeadDTO['analysisStatus']>
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
      leadScore?: number | null
    }) => void,
    onSessionUpdate?: (status: string) => void,
    onDone?: () => void
  ) {
    if (import.meta.server) return

    const url = `${config.public.apiBaseUrl}/search/stream/${sessionId}`
    const source = new EventSource(url, { withCredentials: true })

    source.onmessage = (event) => {
      const data = JSON.parse(event.data)

      if (data.sessionStatus) {
        onSessionUpdate?.(data.sessionStatus)
        return
      }

      onUpdate(data)
    }

    source.onerror = () => {
      source.close()
      onDone?.()
    }

    return () => source.close()
  }

  return { streamSession }
}