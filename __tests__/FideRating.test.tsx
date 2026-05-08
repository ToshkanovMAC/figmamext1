/**
 * FideRating.tsx — unit testlar
 */
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import FideRating from '../app/components/FideRating'

describe('FideRating — render', () => {
  it('komponent render bo\'ladi', () => {
    render(<FideRating />)
    expect(screen.getByText(/FIDE Rating/i)).toBeInTheDocument()
  })

  it('shaxmat belgisi ko\'rsatiladi', () => {
    render(<FideRating />)
    expect(screen.getByText(/♟/)).toBeInTheDocument()
  })

  it('jadval sarlavhalari mavjud: #, PLAYER, ELO', () => {
    render(<FideRating />)
    expect(screen.getByText('#')).toBeInTheDocument()
    expect(screen.getByText('PLAYER')).toBeInTheDocument()
    expect(screen.getByText('ELO')).toBeInTheDocument()
  })

  it('barcha 6 ta o\'yinchi ko\'rsatiladi', () => {
    render(<FideRating />)
    expect(screen.getByText('Magnus Carlsen')).toBeInTheDocument()
    expect(screen.getByText('Fabiano Caruana')).toBeInTheDocument()
    expect(screen.getByText('Hikaru Nakamura')).toBeInTheDocument()
    expect(screen.getByText('Ding Liren')).toBeInTheDocument()
    expect(screen.getByText('Ian Nepomniachtchi')).toBeInTheDocument()
    expect(screen.getByText('Anish Giri')).toBeInTheDocument()
  })

  it('barcha ELO reytinglar ko\'rsatiladi', () => {
    render(<FideRating />)
    ;[2830, 2805, 2794, 2762, 2758, 2745].forEach(r => {
      expect(screen.getByText(String(r))).toBeInTheDocument()
    })
  })

  it('Magnus Carlsen 1-o\'rinda (birinchi qator)', () => {
    render(<FideRating />)
    const rows = screen.getAllByRole('row')
    // rows[0] = thead, rows[1] = 1-chi o'yinchi
    expect(rows[1]).toHaveTextContent('Magnus Carlsen')
    expect(rows[1]).toHaveTextContent('2830')
  })

  it('Fabiano Caruana 2-o\'rinda', () => {
    render(<FideRating />)
    const rows = screen.getAllByRole('row')
    expect(rows[2]).toHaveTextContent('Fabiano Caruana')
  })

  it('jadval elementi mavjud', () => {
    render(<FideRating />)
    expect(screen.getByRole('table')).toBeInTheDocument()
  })

  it('id="fide" atributi mavjud (anchor link uchun)', () => {
    const { container } = render(<FideRating />)
    expect(container.querySelector('#fide')).toBeInTheDocument()
  })

  it('Norvegiya bayrog\'i 🇳🇴 mavjud', () => {
    render(<FideRating />)
    expect(screen.getByText(/🇳🇴/)).toBeInTheDocument()
  })

  it('AQSh bayrog\'i 🇺🇸 ikki marta mavjud (Caruana + Nakamura)', () => {
    render(<FideRating />)
    expect(screen.getAllByText(/🇺🇸/).length).toBe(2)
  })

  it('reytinglar kamayish tartibida', () => {
    const ratings = [2830, 2805, 2794, 2762, 2758, 2745]
    for (let i = 0; i < ratings.length - 1; i++) {
      expect(ratings[i]).toBeGreaterThan(ratings[i + 1])
    }
  })

  it('7 ta qator mavjud (1 header + 6 data)', () => {
    render(<FideRating />)
    expect(screen.getAllByRole('row')).toHaveLength(7)
  })
})
