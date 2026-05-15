export function logError(stage: string, error: unknown, meta?: any) {
  console.error(JSON.stringify({
    stage,
    error,
    meta,
    time: new Date().toISOString(),
  }))
}