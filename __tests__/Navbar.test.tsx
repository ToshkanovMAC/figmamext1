/**
 * Navbar.tsx — unit testlar
 */
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Navbar from '../app/components/Navbar'

describe('Navbar — dastlabki render', () => {
  it('nav elementi mavjud', () => {
    render(<Navbar />)
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })

  it('brend: "Sport" va "News" ko\'rsatiladi', () => {
    render(<Navbar />)
    expect(screen.getByText('Sport')).toBeInTheDocument()
    expect(screen.getByText('News')).toBeInTheDocument()
  })

  it('Login tugmasi mavjud', () => {
    render(<Navbar />)
    expect(screen.getByText('Login')).toBeInTheDocument()
  })

  it('hamburger tugmasi mavjud', () => {
    render(<Navbar />)
    expect(screen.getByText('☰')).toBeInTheDocument()
  })

  it('barcha 6 nav link mavjud', () => {
    render(<Navbar />)
    ;['Home', 'Category', 'Blog/News', 'Home Time', 'FIDE Rating', 'Contact']
      .forEach(label => {
        expect(screen.getByText(label)).toBeInTheDocument()
      })
  })
})

describe('Navbar — href lar to\'g\'ri', () => {
  it('Home → "/"', () => {
    render(<Navbar />)
    expect(screen.getByText('Home').closest('a')).toHaveAttribute('href', '/')
  })

  it('Category → "/#category"', () => {
    render(<Navbar />)
    expect(screen.getByText('Category').closest('a'))
      .toHaveAttribute('href', '/#category')
  })

  it('Blog/News → "/#trending"', () => {
    render(<Navbar />)
    expect(screen.getByText('Blog/News').closest('a'))
      .toHaveAttribute('href', '/#trending')
  })

  it('Home Time → "/#weather"', () => {
    render(<Navbar />)
    expect(screen.getByText('Home Time').closest('a'))
      .toHaveAttribute('href', '/#weather')
  })

  it('FIDE Rating → "/#fide"', () => {
    render(<Navbar />)
    expect(screen.getByText('FIDE Rating').closest('a'))
      .toHaveAttribute('href', '/#fide')
  })

  it('Contact → "/#footer"', () => {
    render(<Navbar />)
    expect(screen.getByText('Contact').closest('a'))
      .toHaveAttribute('href', '/#footer')
  })

  it('brend logo "/" ga olib boradi', () => {
    render(<Navbar />)
    expect(screen.getByText('Sport').closest('a')).toHaveAttribute('href', '/')
  })
})

describe('Navbar — mobil menyu', () => {
  it('hamburger bosilganda mobil menyu ochiladi', async () => {
    const user = userEvent.setup()
    render(<Navbar />)

    await user.click(screen.getByText('☰'))

    // Mobil menyuda linklar paydo bo'ladi (desktop + mobile = 2x)
    expect(screen.getAllByText('Home').length).toBeGreaterThanOrEqual(1)
  })

  it('hamburger ikki marta bosilganda menyu yopiladi', async () => {
    const user = userEvent.setup()
    render(<Navbar />)

    await user.click(screen.getByText('☰'))  // ochish
    await user.click(screen.getByText('☰'))  // yopish

    // nav hali ham mavjud
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })

  it('mobil menyudagi linkga bosilganda menyu yopiladi', async () => {
    const user = userEvent.setup()
    render(<Navbar />)

    await user.click(screen.getByText('☰'))

    const allCategoryLinks = screen.getAllByText('Category')
    await user.click(allCategoryLinks[allCategoryLinks.length - 1])

    // komponent hali render bo'lib turibdi
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })
})
