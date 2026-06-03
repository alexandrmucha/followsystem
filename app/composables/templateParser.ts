import type { BusinessLeadDTO } from '~/types/business-lead.dto'

export function useTemplateParser() {
  function parseTemplate(template: string, lead: BusinessLeadDTO): string {
    let result = template
      .replace(/\{company_name\}/g, lead.name)
      .replace(/\{website\}/g, lead.website ?? '')
      .replace(/\{lcp\}/g, String(lead.largestContentfulPaint ?? ''))
      .replace(/\{page_size\}/g, String(lead.totalByteWeight ?? ''))
      .replace(/\{mobile_performance_score\}/g, String(lead.mobileScore ?? ''))
      .replace(/\{desktop_performance_score\}/g, String(lead.performanceScore ?? ''))
      .replace(/\{seo_score\}/g, String(lead.seoScore ?? ''))
      .replace(/\{accessibility_score\}/g, String(lead.accessibilityScore ?? ''))
      .replace(/\{best_practices_score\}/g, String(lead.bestPracticesScore ?? ''))

    result = result.replace(/\{if (.+?)\}([\s\S]*?)\{endif\}/g, (_, condition, content) => {
      return evaluateCondition(condition, lead) ? content : ''
    })

    result = result.replace(/\n{3,}/g, '\n\n')

    return result.trim()
  }

  function evaluateCondition(condition: string, lead: BusinessLeadDTO): boolean {
    const match = condition.match(/(\w+)\s*(>|<|>=|<=|==)\s*(\d+(\.\d+)?)/)
    if (!match) return false

    const [, field, operator, value] = match as [string, string, string, string]
    const fieldValue = getLeadField(field, lead)
    if (fieldValue == null) return false

    const num = parseFloat(value)
    switch (operator) {
      case '>': return fieldValue > num
      case '<': return fieldValue < num
      case '>=': return fieldValue >= num
      case '<=': return fieldValue <= num
      case '==': return fieldValue === num
      default: return false
    }
  }

  function getLeadField(field: string, lead: BusinessLeadDTO): number | null {
    const map: Record<string, number | null | undefined> = {
      lcp: lead.largestContentfulPaint,
      page_size: lead.totalByteWeight,
      mobile_performance_score: lead.mobileScore,
      desktop_performance_score: lead.performanceScore,
      seo_score: lead.seoScore,
      accessibility_score: lead.accessibilityScore,
      best_practices_score: lead.bestPracticesScore,
    }
    return map[field] ?? null
  }

  return { parseTemplate }
}