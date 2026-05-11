import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import WeatherWidget from '../app/components/WeatherWidget'

const mockFetch = vi.fn()
vi.stubGlobal('fetch', mockFetch)

const makeResponse = (code: number, temp = 28) => ({
  current_weather: { temperature: temp, weathercode: code },
  daily: {
    time: [
      '2026-05-08', '2026-05-09', '2026-05-10',
      '2026-05-11', '2026-05-12', '2026-05-13',
    ],
    temperature_2m_max: [30, 32, 29, 27, 25, 28],
    temperature_2m_min: [18, 20, 17, 15, 14, 16],
    weathercode: [code, 1, 2, 3, 0, 1],
  },
})

describe('WeatherWidget — yuklanish', () => {
  beforeEach(() => {
    mockFetch.mockReturnValue(new Promise(() => {}))
  })

  it('"Loading Weather..." ko\'rsatiladi', () => {
    render(<WeatherWidget />)
    expect(screen.getByText('Loading Weather...')).toBeInTheDocument()
  })
})

describe('WeatherWidget — muvaffaqiyatli yuklanish', () => {
  beforeEach(() => {
    mockFetch.mockResolvedValue({ json: async () => makeResponse(0, 28) })
  })

  it('"Loading Weather..." yo\'qoladi', async () => {
    render(<WeatherWidget />)
    await waitFor(() => {
      expect(screen.queryByText('Loading Weather...')).not.toBeInTheDocument()
    })
  })

  it('"Weather Today" sarlavhasi ko\'rsatiladi', async () => {
    render(<WeatherWidget />)
    await waitFor(() => {
      expect(screen.getByText(/Weather Today/i)).toBeInTheDocument()
    })
  })

  it('"Tashkent" shahri ko\'rsatiladi', async () => {
    render(<WeatherWidget />)
    await waitFor(() => {
      expect(screen.getByText(/Tashkent/i)).toBeInTheDocument()
    })
  })

  it('harorat raqami ko\'rsatiladi', async () => {
    render(<WeatherWidget />)
    await waitFor(() => {
      expect(screen.getAllByText(/28/).length).toBeGreaterThan(0)
    })
  })

  it('ob-havo holati "Clear Sky" ko\'rsatiladi (code=0)', async () => {
    render(<WeatherWidget />)
    await waitFor(() => {
      expect(screen.getByText(/Clear Sky/i)).toBeInTheDocument()
    })
  })

  it('☀️ belgisi ko\'rsatiladi (code=0)', async () => {
    render(<WeatherWidget />)
    await waitFor(() => {
      expect(screen.getAllByText('☀️').length).toBeGreaterThan(0)
    })
  })

  it('5 kunlik prognoz ko\'rsatiladi', async () => {
    render(<WeatherWidget />)
    await waitFor(() => {
      const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
      const found = days.some(d => {
        try { return screen.getAllByText(d).length > 0 } catch { return false }
      })
      expect(found).toBe(true)
    })
  })

  it('fetch open-meteo.com ga chaqiriladi', async () => {
    render(<WeatherWidget />)
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('open-meteo.com'),
      )
    })
  })

  it('Toshkent koordinatalari ishlatiladi (lat=41.2995, lon=69.2401)', async () => {
    render(<WeatherWidget />)
    await waitFor(() => {
      const url = mockFetch.mock.calls[0][0] as string
      expect(url).toContain('latitude=41.2995')
      expect(url).toContain('longitude=69.2401')
    })
  })
})

describe('WeatherWidget — xatolik holati', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
    mockFetch.mockRejectedValue(new Error('Network error'))
  })

  afterEach(() => vi.restoreAllMocks())

  it('xato bo\'lganda "Loading Weather..." ko\'rsatiladi (weather null qoladi)', async () => {
    render(<WeatherWidget />)
    await waitFor(() => {
      expect(console.error).toHaveBeenCalled()
    })
    expect(screen.getByText('Loading Weather...')).toBeInTheDocument()
  })
})

describe('WeatherWidget — ob-havo kodlari', () => {
  afterEach(() => mockFetch.mockClear())

  const cases = [
    { code: 0,  text: 'Clear Sky',     icon: '☀️' },
    { code: 1,  text: 'Mainly Clear',  icon: '🌤️' },
    { code: 2,  text: 'Partly Cloudy', icon: '⛅' },
    { code: 3,  text: 'Overcast',      icon: '☁️' },
    { code: 45, text: 'Foggy',         icon: '🌫️' },
    { code: 61, text: 'Rain',          icon: '🌧️' },
    { code: 71, text: 'Snow',          icon: '❄️' },
    { code: 95, text: 'Thunderstorm',  icon: '⛈️' },
  ]

  cases.forEach(({ code, text }) => {
    it(`weathercode ${code} → "${text}"`, async () => {
      mockFetch.mockResolvedValue({ json: async () => makeResponse(code) })
      render(<WeatherWidget />)
      await waitFor(() => {
        expect(screen.getByText(new RegExp(text, 'i'))).toBeInTheDocument()
      })
    })
  })
})
