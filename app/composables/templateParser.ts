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
      .replace(/\{lcp_times\}/g, String(Math.round((lead.largestContentfulPaint ?? 0) / 2.5)))
      .replace(/\{page_size\}/g, String(lead.totalByteWeight ?? ''))
      .replace(/\{mobile_performance_score\}/g, String(lead.mobileScore ?? ''))
      .replace(/\{desktop_performance_score\}/g, String(lead.performanceScore ?? ''))
      .replace(/\{seo_score\}/g, String(lead.seoScore ?? ''))
      .replace(/\{accessibility_score\}/g, String(lead.accessibilityScore ?? ''))
      .replace(/\{best_practices_score\}/g, String(lead.bestPracticesScore ?? ''))
      .replace(/\{rating\}/g, String(lead.rating ?? ''))
      .replace(/\{review_count\}/g, String(lead.reviewCount ?? ''))

    result = expandElseIf(result)
    result = processConditions(result, lead)
    result = result.replace(/\n{3,}/g, '\n\n')

    return result.trim()
  }

  // Expands {elseif cond} into nested {else}{if cond}...{endif} using a depth counter
  // so that {endif}s are correctly added at each nesting level.
  function expandElseIf(text: string): string {
    if (!text.includes('{elseif ')) return text

    const tokenRe = /\{(if [^}]+|elseif [^}]+|else|endif)\}/g
    let result = ''
    let lastEnd = 0
    let depth = 0
    const elseifCounts: number[] = []

    for (const m of text.matchAll(tokenRe)) {
      const tag = m[1]!
      const full = m[0]
      const start = m.index!

      result += text.slice(lastEnd, start)
      lastEnd = start + full.length

      if (tag.startsWith('if ')) {
        depth++
        elseifCounts[depth] = 0
        result += full
      } else if (tag === 'endif') {
        const extra = elseifCounts[depth] ?? 0
        result += '{endif}'.repeat(extra) + full
        elseifCounts[depth] = 0
        depth--
      } else if (tag.startsWith('elseif ') && depth > 0) {
        const cond = tag.slice('elseif '.length)
        elseifCounts[depth] = (elseifCounts[depth] ?? 0) + 1
        result += `{else}{if ${cond}}`
      } else {
        result += full
      }
    }

    result += text.slice(lastEnd)
    return result
  }

  // Processes conditions inside-out: each pass replaces the innermost {if}...{endif}
  // blocks (those with no nested {if} inside) until none remain.
  function processConditions(text: string, lead: BusinessLeadDTO): string {
    const innermostIf = /\{if ([^}]+)\}((?:(?!\{if )[\s\S])*?)(?:\{else\}((?:(?!\{if )[\s\S])*?))?\{endif\}/g
    let prev = ''
    let result = text
    while (prev !== result) {
      prev = result
      result = result.replace(innermostIf, (_, condition, ifContent, elseContent) => {
        return evaluateCondition(condition, lead) ? ifContent : (elseContent ?? '')
      })
    }
    return result
  }

  function evaluateCondition(condition: string, lead: BusinessLeadDTO): boolean {
    if (condition.includes(' or ')) {
      return condition.split(' or ').some(c => evaluateCondition(c.trim(), lead))
    }

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
      has_website: lead.hasWebsite ? 1 : 0,
      has_ssl: lead.hasSsl == null ? null : lead.hasSsl ? 1 : 0,
      has_https_redirect: lead.hasHttpsRedirect == null ? null : lead.hasHttpsRedirect ? 1 : 0,
      has_viewport: lead.hasViewport == null ? null : lead.hasViewport ? 1 : 0,
      rating: lead.rating,
      review_count: lead.reviewCount,
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
