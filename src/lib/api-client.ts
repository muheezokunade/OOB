const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || ''

export async function apiFetch(path: string, init?: RequestInit) {
  const url = path.startsWith('http') ? path : `${API_BASE}${path}`
  const res = await fetch(url, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers || {}),
    },
    cache: 'no-store',
  })
  if (!res.ok) {
    let detail: any = null
    try { detail = await res.json() } catch {}
    const err = new Error(`API ${res.status}: ${res.statusText}`)
    ;(err as any).detail = detail
    throw err
  }
  try { return await res.json() } catch { return null }
}

export function getApiBase() { return API_BASE }


