/**
 * CommentSection.tsx — unit testlar
 */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CommentSection from '../app/components/CommentSection'

// window.open mock
const mockOpen = vi.fn()
vi.stubGlobal('open', mockOpen)

// window.location mock
vi.stubGlobal('location', { href: 'http://localhost/test-article' })

describe('CommentSection — dastlabki render', () => {
  beforeEach(() => {
    mockOpen.mockClear()
  })

  it('komponent render bo\'ladi', () => {
    render(<CommentSection />)
    expect(screen.getByText(/Comments/i)).toBeInTheDocument()
  })

  it('dastlab 2 ta izoh mavjud → "Comments (2)"', () => {
    render(<CommentSection />)
    expect(screen.getByText('Comments (2)')).toBeInTheDocument()
  })

  it('dastlabki mualliflar ko\'rsatiladi', () => {
    render(<CommentSection />)
    expect(screen.getByText('Alex Turner')).toBeInTheDocument()
    expect(screen.getByText('Maria Santos')).toBeInTheDocument()
  })

  it('dastlabki izoh matnlari ko\'rsatiladi', () => {
    render(<CommentSection />)
    expect(screen.getByText(/Incredible coverage!/)).toBeInTheDocument()
    expect(screen.getByText(/Great article/)).toBeInTheDocument()
  })

  it('avatar harflari to\'g\'ri: A va M', () => {
    render(<CommentSection />)
    expect(screen.getByText('A')).toBeInTheDocument()
    expect(screen.getByText('M')).toBeInTheDocument()
  })

  it('"Your name" va "Your comment" input maydonlari mavjud', () => {
    render(<CommentSection />)
    expect(screen.getByPlaceholderText('Your name *')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Your comment *')).toBeInTheDocument()
  })

  it('"Post Comment" tugmasi mavjud', () => {
    render(<CommentSection />)
    expect(screen.getByText('Post Comment')).toBeInTheDocument()
  })

  it('Twitter va Facebook tugmalari mavjud', () => {
    render(<CommentSection />)
    expect(screen.getByText(/X Twitter/)).toBeInTheDocument()
    expect(screen.getByText(/f Facebook/)).toBeInTheDocument()
  })
})

describe('CommentSection — izoh qo\'shish', () => {
  it('yangi izoh muvaffaqiyatli qo\'shiladi', async () => {
    const user = userEvent.setup()
    render(<CommentSection />)

    await user.type(screen.getByPlaceholderText('Your name *'), 'Jasur Karimov')
    await user.type(screen.getByPlaceholderText('Your comment *'), 'Zo\'r maqola!')
    await user.click(screen.getByText('Post Comment'))

    expect(screen.getByText('Jasur Karimov')).toBeInTheDocument()
    expect(screen.getByText('Zo\'r maqola!')).toBeInTheDocument()
  })

  it('izoh qo\'shilgandan so\'ng comments soni oshadi', async () => {
    const user = userEvent.setup()
    render(<CommentSection />)

    await user.type(screen.getByPlaceholderText('Your name *'), 'Test')
    await user.type(screen.getByPlaceholderText('Your comment *'), 'Salom')
    await user.click(screen.getByText('Post Comment'))

    expect(screen.getByText('Comments (3)')).toBeInTheDocument()
  })

  it('yuborilgandan keyin input maydonlari tozalanadi', async () => {
    const user = userEvent.setup()
    render(<CommentSection />)

    const nameInput = screen.getByPlaceholderText('Your name *') as HTMLInputElement
    const textInput = screen.getByPlaceholderText('Your comment *') as HTMLTextAreaElement

    await user.type(nameInput, 'Test')
    await user.type(textInput, 'Izoh')
    await user.click(screen.getByText('Post Comment'))

    expect(nameInput.value).toBe('')
    expect(textInput.value).toBe('')
  })

  it('bo\'sh ism bilan izoh qo\'shib bo\'lmaydi', async () => {
    const user = userEvent.setup()
    render(<CommentSection />)

    await user.type(screen.getByPlaceholderText('Your comment *'), 'Faqat matn')
    await user.click(screen.getByText('Post Comment'))

    expect(screen.getByText('Comments (2)')).toBeInTheDocument()
  })

  it('bo\'sh matn bilan izoh qo\'shib bo\'lmaydi', async () => {
    const user = userEvent.setup()
    render(<CommentSection />)

    await user.type(screen.getByPlaceholderText('Your name *'), 'Faqat ism')
    await user.click(screen.getByText('Post Comment'))

    expect(screen.getByText('Comments (2)')).toBeInTheDocument()
  })

  it('faqat bo\'shliqdan iborat ism qabul qilinmaydi', async () => {
    const user = userEvent.setup()
    render(<CommentSection />)

    await user.type(screen.getByPlaceholderText('Your name *'), '   ')
    await user.type(screen.getByPlaceholderText('Your comment *'), 'Izoh')
    await user.click(screen.getByText('Post Comment'))

    expect(screen.getByText('Comments (2)')).toBeInTheDocument()
  })

  it('yangi izoh avatari ismning birinchi harfi (uppercase)', async () => {
    const user = userEvent.setup()
    render(<CommentSection />)

    await user.type(screen.getByPlaceholderText('Your name *'), 'Zafar')
    await user.type(screen.getByPlaceholderText('Your comment *'), 'Test')
    await user.click(screen.getByText('Post Comment'))

    expect(screen.getByText('Z')).toBeInTheDocument()
  })

  it('3 ta izoh ketma-ket qo\'shish mumkin', async () => {
    const user = userEvent.setup()
    render(<CommentSection />)

    for (let i = 1; i <= 3; i++) {
      await user.type(screen.getByPlaceholderText('Your name *'), `User${i}`)
      await user.type(screen.getByPlaceholderText('Your comment *'), `Izoh ${i}`)
      await user.click(screen.getByText('Post Comment'))
    }

    expect(screen.getByText('Comments (5)')).toBeInTheDocument()
  })
})

describe('CommentSection — ulashish (share)', () => {
  beforeEach(() => mockOpen.mockClear())

  it('Twitter bosilganda window.open chaqiriladi', async () => {
    const user = userEvent.setup()
    render(<CommentSection />)

    await user.click(screen.getByText(/X Twitter/))
    expect(mockOpen).toHaveBeenCalledTimes(1)
    expect(mockOpen).toHaveBeenCalledWith(
      expect.stringContaining('twitter.com'),
      '_blank',
    )
  })

  it('Facebook bosilganda window.open chaqiriladi', async () => {
    const user = userEvent.setup()
    render(<CommentSection />)

    await user.click(screen.getByText(/f Facebook/))
    expect(mockOpen).toHaveBeenCalledTimes(1)
    expect(mockOpen).toHaveBeenCalledWith(
      expect.stringContaining('facebook.com'),
      '_blank',
    )
  })

  it('Twitter URL da "url=" parametri bor', async () => {
    const user = userEvent.setup()
    render(<CommentSection />)

    await user.click(screen.getByText(/X Twitter/))
    expect(mockOpen.mock.calls[0][0]).toContain('url=')
  })

  it('Twitter bosilgandan keyin ✓ belgisi paydo bo\'ladi', async () => {
    const user = userEvent.setup()
    render(<CommentSection />)

    await user.click(screen.getByText(/X Twitter/))
    expect(screen.getByText(/X Twitter ✓/)).toBeInTheDocument()
  })

  it('Facebook bosilgandan keyin ✓ belgisi paydo bo\'ladi', async () => {
    const user = userEvent.setup()
    render(<CommentSection />)

    await user.click(screen.getByText(/f Facebook/))
    expect(screen.getByText(/f Facebook ✓/)).toBeInTheDocument()
  })
})
