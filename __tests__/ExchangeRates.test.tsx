
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import ExchangeRates from '../app/components/ExchangeRates'

const mockFetch = vi.fn()
vi.stubGlobal('fetch', mockFetch)

const apiResponse = {
  rates: { EUR: 0.92, GBP: 0.79, UZS: 12750, CNY: 7.23 },
}

describe('ExchangeRates — yuklanish (loading)', () => {
  beforeEach(() => {
    mockFetch.mockReturnValue(new Promise(() => {}))
  })

  it('komponent render bo\'ladi', () => {
    render(<ExchangeRates />)
    expect(screen.getByText('Exchange Rates')).toBeInTheDocument()
  })

  it('"..." loading holati ko\'rsatiladi', () => {
    render(<ExchangeRates />)
    expect(screen.getAllByText('...').length).toBeGreaterThan(0)
  })

  it('jadval sarlavhalari mavjud', () => {
    render(<ExchangeRates />)
    expect(screen.getByText('CURRENCY')).toBeInTheDocument()
    expect(screen.getByText('BUY')).toBeInTheDocument()
    expect(screen.getByText('SELL')).toBeInTheDocument()
  })

  it('barcha valyuta kodlari ko\'rsatiladi', () => {
    render(<ExchangeRates />)
    ;['USD', 'EUR', 'GBP', 'UZS', 'CNY'].forEach(code => {
      expect(screen.getByText(code)).toBeInTheDocument()
    })
  })

  it('valyuta nomlari ko\'rsatiladi', () => {
    render(<ExchangeRates />)
    expect(screen.getByText('US Dollar')).toBeInTheDocument()
    expect(screen.getByText('Euro')).toBeInTheDocument()
    expect(screen.getByText('Pound')).toBeInTheDocument()
    expect(screen.getByText('Uzbekistan Sum')).toBeInTheDocument()
    expect(screen.getByText('Yuan')).toBeInTheDocument()
  })

  it('bayroqlar ko\'rsatiladi', () => {
    render(<ExchangeRates />)
    expect(screen.getByText(/🇺🇸/)).toBeInTheDocument()
    expect(screen.getByText(/🇪🇺/)).toBeInTheDocument()
    expect(screen.getByText(/🇬🇧/)).toBeInTheDocument()
    expect(screen.getByText(/🇺🇿/)).toBeInTheDocument()
    expect(screen.getByText(/🇨🇳/)).toBeInTheDocument()
  })
})

describe('ExchangeRates — muvaffaqiyatli yuklanish', () => {
  beforeEach(() => {
    mockFetch.mockResolvedValue({ json: async () => apiResponse })
  })

  it('"..." yo\'qoladi', async () => {
    render(<ExchangeRates />)
    await waitFor(() => {
      expect(screen.queryByText('...')).not.toBeInTheDocument()
    })
  })

  it('fetch to\'g\'ri URL ga chaqiriladi', async () => {
    render(<ExchangeRates />)
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith('https://open.er-api.com/v6/latest/USD')
    })
  })

  it('USD dastlabki qiymatlari o\'zgarmaydi (buy=12,650)', async () => {
    render(<ExchangeRates />)
    await waitFor(() => {
      expect(screen.getByText('12,650')).toBeInTheDocument()
    })
  })

  it('"Updated:" matni ko\'rsatiladi', async () => {
    render(<ExchangeRates />)
    await waitFor(() => {
      expect(screen.getByText(/Updated:/)).toBeInTheDocument()
    })
  })
})

describe('ExchangeRates — xatolik holati', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
    mockFetch.mockRejectedValue(new Error('Network error'))
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('xato bo\'lganda dastlabki qiymatlar saqlanib qoladi', async () => {
    render(<ExchangeRates />)
    await waitFor(() => {
      expect(screen.getByText('USD')).toBeInTheDocument()
    })
  })

  it('xato bo\'lganda "..." o\'chadi (finally ishlaydi)', async () => {
    render(<ExchangeRates />)
    await waitFor(() => {
      expect(screen.queryByText('...')).not.toBeInTheDocument()
    })
  })

  it('xato bo\'lganda console.error chaqiriladi', async () => {
    render(<ExchangeRates />)
    await waitFor(() => {
      expect(console.error).toHaveBeenCalled()
    })
  })
})

describe('ExchangeRates — rates null holati', () => {
  it('API dan rates null kelganda dastlabki ma\'lumotlar saqlanadi', async () => {
    mockFetch.mockResolvedValue({ json: async () => ({ rates: null }) })
    render(<ExchangeRates />)
    await waitFor(() => {
      expect(screen.getByText('USD')).toBeInTheDocument()
    })
  })
})
