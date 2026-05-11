import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import NewsBody from '../app/news/[slug]/NewsBody'
import { articles, type Article } from '../app/data'

vi.stubGlobal('fetch', vi.fn().mockReturnValue(new Promise(() => {})))

const sampleArticle: Article = articles[0] // featured maqola

describe('NewsBody — render', () => {
  it('maqola sarlavhasi ko\'rsatiladi', () => {
    render(<NewsBody article={sampleArticle} />)
    expect(screen.getByText(sampleArticle.title)).toBeInTheDocument()
  })

  it('muallif ismi ko\'rsatiladi', () => {
    render(<NewsBody article={sampleArticle} />)
    expect(screen.getByText(sampleArticle.author)).toBeInTheDocument()
  })

  it('sana ko\'rsatiladi', () => {
    render(<NewsBody article={sampleArticle} />)
    expect(screen.getAllByText(sampleArticle.date).length).toBeGreaterThan(0)
  })

  it('kategoriya ko\'rsatiladi', () => {
    render(<NewsBody article={sampleArticle} />)
    expect(screen.getAllByText(sampleArticle.category).length).toBeGreaterThan(0)
  })

  it('breadcrumb "Home" havolasi mavjud', () => {
    render(<NewsBody article={sampleArticle} />)
    const homeLinks = screen.getAllByText('Home')
    expect(homeLinks.length).toBeGreaterThan(0)
    expect(homeLinks[0].closest('a')).toHaveAttribute('href', '/')
  })

  it('maqola matni (content HTML) render bo\'ladi', () => {
    render(<NewsBody article={sampleArticle} />)
    expect(document.querySelector('[dangerouslySetInnerHTML]') !== null ||
      document.body.innerHTML.includes('Rankings')).toBe(true)
  })

  it('muallif avatari (birinchi harf) ko\'rsatiladi', () => {
    render(<NewsBody article={sampleArticle} />)
    const initial = sampleArticle.author[0]
    expect(screen.getAllByText(initial).length).toBeGreaterThan(0)
  })

  it('hashtag lar ko\'rsatiladi', () => {
    render(<NewsBody article={sampleArticle} />)
    expect(screen.getByText(`#${sampleArticle.category}`)).toBeInTheDocument()
    expect(screen.getByText('#Sports')).toBeInTheDocument()
    expect(screen.getByText('#2026')).toBeInTheDocument()
  })

  it('"Related News" bo\'limi mavjud', () => {
    render(<NewsBody article={sampleArticle} />)
    expect(screen.getByText('Related News')).toBeInTheDocument()
  })

  it('asosiy maqoladan tashqari 3 ta related maqola ko\'rsatiladi', () => {
    render(<NewsBody article={sampleArticle} />)
    const related = articles
      .filter(a => a.slug !== sampleArticle.slug)
      .slice(0, 3)
    related.forEach(r => {
      expect(screen.getByText(r.title)).toBeInTheDocument()
    })
  })

  it('"Leave a Comment" formi mavjud', () => {
    render(<NewsBody article={sampleArticle} />)
    expect(screen.getByText('Leave a Comment')).toBeInTheDocument()
  })

  it('footer da brend nomi mavjud', () => {
    render(<NewsBody article={sampleArticle} />)
    expect(screen.getAllByText('Sport').length).toBeGreaterThan(0)
  })

  it('footer da copyright matni mavjud', () => {
    render(<NewsBody article={sampleArticle} />)
    expect(screen.getByText(/© 2026 Sport News/)).toBeInTheDocument()
  })
})

describe('NewsBody — turli maqolalar bilan', () => {
  it('Basketball maqolasi ham to\'g\'ri render bo\'ladi', () => {
    const basketballArticle = articles.find(a => a.category === 'Basketball')!
    render(<NewsBody article={basketballArticle} />)
    expect(screen.getByText(basketballArticle.title)).toBeInTheDocument()
    expect(screen.getAllByText('Basketball').length).toBeGreaterThan(0)
  })

  it('Boxing maqolasi ham to\'g\'ri render bo\'ladi', () => {
    const boxingArticle = articles.find(a => a.category === 'Boxing')!
    render(<NewsBody article={boxingArticle} />)
    expect(screen.getByText(boxingArticle.title)).toBeInTheDocument()
  })

  it('har qanday maqola uchun breadcrumb kategoriya ko\'rsatiladi', () => {
    articles.slice(0, 4).forEach(article => {
      const { unmount } = render(<NewsBody article={article} />)
      expect(screen.getAllByText(article.category).length).toBeGreaterThan(0)
      unmount()
    })
  })
})
