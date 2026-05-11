import { describe, it, expect } from 'vitest'
import { articles, clubs, type Article } from '../app/data'

describe('articles', () => {
  it('massiv mavjud va bo\'sh emas', () => {
    expect(articles).toBeDefined()
    expect(Array.isArray(articles)).toBe(true)
    expect(articles.length).toBeGreaterThan(0)
  })

  it('har bir maqolada majburiy maydonlar bor', () => {
    const required: (keyof Article)[] = [
      'id', 'slug', 'category', 'title',
      'excerpt', 'content', 'author', 'date', 'image',
    ]
    articles.forEach(a => {
      required.forEach(field => {
        expect(a[field], `"${field}" maydoni yo'q: slug=${a.slug}`)
          .toBeDefined()
        expect((a[field] as string).length).toBeGreaterThan(0)
      })
    })
  })

  it('id lar unique', () => {
    const ids = articles.map(a => a.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('slug lar unique', () => {
    const slugs = articles.map(a => a.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('slug faqat kichik harf, raqam, chiziqcha', () => {
    articles.forEach(a => {
      expect(a.slug).toMatch(/^[a-z0-9-]+$/)
    })
  })

  it('kamida bitta featured maqola bor', () => {
    expect(articles.filter(a => a.featured === true).length).toBeGreaterThan(0)
  })

  it('birinchi maqola featured', () => {
    expect(articles[0].featured).toBe(true)
  })

  it('slug bo\'yicha qidirish ishlaydi', () => {
    const found = articles.find(a => a.slug === 'top-scorer-final-match')
    expect(found).toBeDefined()
    expect(found?.id).toBe('1')
  })

  it('content HTML <p> tegini o\'z ichiga oladi', () => {
    articles.forEach(a => {
      expect(a.content).toContain('<p>')
    })
  })

  it('Football kategoriyasidagi maqolalar bor', () => {
    expect(articles.filter(a => a.category === 'Football').length).toBeGreaterThan(0)
  })

  it('Basketball kategoriyasidagi maqolalar bor', () => {
    expect(articles.filter(a => a.category === 'Basketball').length).toBeGreaterThan(0)
  })

  it('har bir maqolada author maydoni mavjud', () => {
    articles.forEach(a => {
      expect(typeof a.author).toBe('string')
      expect(a.author.length).toBeGreaterThan(0)
    })
  })

  it('date formati string va to\'ldirilgan', () => {
    articles.forEach(a => {
      expect(typeof a.date).toBe('string')
      expect(a.date).toMatch(/\d{4}/)
    })
  })
})
describe('clubs', () => {
  it('massiv mavjud va bo\'sh emas', () => {
    expect(clubs).toBeDefined()
    expect(clubs.length).toBeGreaterThan(0)
  })

  it('har bir klub to\'liq maydonlarga ega', () => {
    clubs.forEach(c => {
      expect(c.rank).toBeDefined()
      expect(c.name).toBeDefined()
      expect(c.flag).toBeDefined()
      expect(typeof c.w).toBe('number')
      expect(typeof c.d).toBe('number')
      expect(typeof c.l).toBe('number')
      expect(typeof c.pts).toBe('number')
    })
  })

  it('klublar rank tartibida joylashgan', () => {
    for (let i = 0; i < clubs.length - 1; i++) {
      expect(clubs[i].rank).toBeLessThan(clubs[i + 1].rank)
    }
  })

  it('birinchi klub eng yuqori ballga ega', () => {
    const maxPts = Math.max(...clubs.map(c => c.pts))
    expect(clubs[0].pts).toBe(maxPts)
  })

  it('Manchester City 1-o\'rinda', () => {
    expect(clubs[0].name).toBe('Manchester City')
    expect(clubs[0].rank).toBe(1)
  })

  it('barcha klublar uchun w + d + l > 0', () => {
    clubs.forEach(c => {
      expect(c.w + c.d + c.l).toBeGreaterThan(0)
    })
  })

  it('pts > w (draw ham ball beradi)', () => {
    clubs.forEach(c => {
      expect(c.pts).toBeGreaterThan(c.w)
    })
  })

  it('barcha pts qiymatlari musbat', () => {
    clubs.forEach(c => {
      expect(c.pts).toBeGreaterThan(0)
    })
  })
})
