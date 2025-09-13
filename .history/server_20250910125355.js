import express from 'express'
import cors from 'cors'

const app = express()
const port = process.env.PORT || 3001

app.use(cors())

// Simple in-memory cache (10 minutes)
const cache = new Map()
const CACHE_TTL_MS = 10 * 60 * 1000

function setCache(key, value) {
  cache.set(key, { value, expires: Date.now() + CACHE_TTL_MS })
}

function getCache(key) {
  const entry = cache.get(key)
  if (!entry) return null
  if (Date.now() > entry.expires) {
    cache.delete(key)
    return null
  }
  return entry.value
}

async function fetchOpenMeteo(lat, lon) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,snowfall_sum&timezone=auto&forecast_days=7`
  const res = await fetch(url)
  if (!res.ok) throw new Error('open-meteo error')
  return res.json()
}

const PLACES = {
  tignes: { lat: 45.468, lon: 6.909 },
  val: { lat: 45.448, lon: 6.98 },
}

app.get('/api/weather', async (req, res) => {
  try {
    const place = (req.query.place || 'tignes').toLowerCase()
    if (!PLACES[place]) return res.status(400).json({ error: 'unknown place' })
    const key = `weather:${place}`
    const cached = getCache(key)
    if (cached) return res.json(cached)
    const { lat, lon } = PLACES[place]
    const data = await fetchOpenMeteo(lat, lon)
    setCache(key, data)
    res.json(data)
  } catch (e) {
    res.status(500).json({ error: 'failed to fetch weather' })
  }
})

app.get('/api/weather/combined', async (_req, res) => {
  try {
    const key = 'weather:combined'
    const cached = getCache(key)
    if (cached) return res.json(cached)
    const [tignes, val] = await Promise.all([
      fetchOpenMeteo(PLACES.tignes.lat, PLACES.tignes.lon),
      fetchOpenMeteo(PLACES.val.lat, PLACES.val.lon),
    ])
    const payload = { tignes, val }
    setCache(key, payload)
    res.json(payload)
  } catch (e) {
    res.status(500).json({ error: 'failed to fetch combined weather' })
  }
})

app.get('/api/health', (_req, res) => res.json({ ok: true }))

app.listen(port, () => {
  console.log(`Weather API listening on http://localhost:${port}`)
})


