import type { BusinessLeadDTO } from '~/types/business-lead.dto'

export function useTemplateParser() {
  function cleanWebsiteUrl(url: string | null | undefined): string {
    if (!url) return ''
    return url
      .replace(/^(https?:\/\/)?(www\.)?/, '')
      .replace(/\/$/, '')
      .toLowerCase()
  }

  function parseTemplate(template: string, lead: BusinessLeadDTO): string {
    let result = template
      .replace(/\{company_name\}/g, lead.name)
      .replace(/\{website\}/g, lead.website ?? '')
      .replace(/\{clean_website\}/g, cleanWebsiteUrl(lead.website))
      .replace(/\{lcp\}/g, String(lead.largestContentfulPaint ?? ''))
      .replace(/\{page_size\}/g, String(lead.totalByteWeight ?? ''))
      .replace(/\{mobile_performance_score\}/g, String(lead.mobileScore ?? ''))
      .replace(/\{desktop_performance_score\}/g, String(lead.performanceScore ?? ''))
      .replace(/\{seo_score\}/g, String(lead.seoScore ?? ''))
      .replace(/\{accessibility_score\}/g, String(lead.accessibilityScore ?? ''))
      .replace(/\{best_practices_score\}/g, String(lead.bestPracticesScore ?? ''))

    result = result.replace(/\{if (.+?)\}([\s\S]*?)(?:\{else\}([\s\S]*?))?\{endif\}/g, (_, condition, ifContent, elseContent) => {
      return evaluateCondition(condition, lead) ? ifContent : (elseContent ?? '')
    })

    result = result.replace(/\n{3,}/g, '\n\n')

    return result.trim()
  }

  function evaluateCondition(condition: string, lead: BusinessLeadDTO): boolean {
    // Handle OR
    if (condition.includes(' or ')) {
      return condition.split(' or ').some(c => evaluateCondition(c.trim(), lead))
    }

    // Handle AND
    if (condition.includes(' and ')) {
      return condition.split(' and ').every(c => evaluateCondition(c.trim(), lead))
    }

    const match = condition.match(/(\w+)\s*(>|<|>=|<=|==|!=)\s*(\d+(\.\d+)?)/)
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
      case '!=': return fieldValue !== num
      default: return false
    }
  }

  function getLeadField(field: string, lead: BusinessLeadDTO): number | null {
    const map: Record<string, number | null | undefined> = {
      has_ssl: lead.hasSsl ? 1 : 0,
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