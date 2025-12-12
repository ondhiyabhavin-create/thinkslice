// Lightweight client-only fetch simulator wrapping static JSON files.
// It adds latency, simple caching, and random transient errors simulation.

const cache = new Map()

export async function fetchSim(url, { latency = 400, cacheTTL = 60_000 } = {}) {
  if (cache.has(url)) {
    const { ts, data } = cache.get(url)
    if (Date.now() - ts < cacheTTL) {
      // return cached copy with small latency
      await new Promise(r => setTimeout(r, Math.min(80, latency)))
      return { ok: true, json: async () => data }
    }
  }

  // Simulate network latency
  await new Promise(r => setTimeout(r, latency + Math.random() * 300))

  // Use browser fetch to read static public files
  const res = await fetch(url)
  if (!res.ok) return res
  const data = await res.json()
  cache.set(url, { ts: Date.now(), data })
  return { ok: true, json: async () => data }
}
