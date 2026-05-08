"use client";
import Link from "next/link";
import CommentSection from "../../components/CommentSection";
import ExchangeRates from "../../components/ExchangeRates";
import WeatherWidget from "../../components/WeatherWidget";
import FideRating from "../../components/FideRating";
import { type Article, articles } from "../../data";

export default function NewsBody({ article }: { article: Article }) {
  const related = articles.filter(a => a.slug !== article.slug).slice(0, 3);

  return (
    <>
      <div style={{ background: "#fff", borderBottom: "1px solid #eee", padding: "12px 0" }}>
        <div className="container" style={{ display: "flex", gap: 8, fontSize: 12, color: "var(--text-light)", alignItems: "center" }}>
          <Link href="/" style={{ color: "var(--primary)" }}>Home</Link>
          <span>›</span>
          <span>{article.category}</span>
          <span>›</span>
          <span style={{ color: "var(--text-dark)", fontWeight: 600 }}>{article.title.slice(0, 48)}…</span>
        </div>
      </div>

      <div style={{ width: "100%", height: 420, background: "linear-gradient(135deg,#1a1a2e,#16213e)", overflow: "hidden", position: "relative" }}>
        <img src={article.image} alt={article.title} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.6 }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "60%", background: "linear-gradient(0deg,rgba(0,0,0,0.8) 0%,transparent 100%)" }} />
        <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", textAlign: "center" }}>
          <span className="cat-badge" style={{ marginBottom: 12, display: "inline-block" }}>{article.category}</span>
        </div>
      </div>

      <section style={{ padding: "48px 0", background: "var(--bg)" }}>
        <div className="container" style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 40 }}>
          <article>
            <h1 style={{ fontFamily: "var(--font-heading)", fontSize: 40, fontWeight: 900, textTransform: "uppercase", lineHeight: 1.1, marginBottom: 16, color: "var(--text-dark)" }}>
              {article.title}
            </h1>

            <div style={{ display: "flex", gap: 20, alignItems: "center", marginBottom: 32, paddingBottom: 20, borderBottom: "2px solid var(--primary)" }}>
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: "var(--primary)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 18 }}>
                {article.author[0]}
              </div>
              <div>
                <p style={{ fontWeight: 700, fontSize: 14 }}>{article.author}</p>
                <p style={{ fontSize: 12, color: "var(--text-light)" }}>{article.date}</p>
              </div>
            </div>

            <div style={{ fontSize: 16, lineHeight: 1.9, color: "var(--text-mid)" }}
              dangerouslySetInnerHTML={{ __html: article.content }} />

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 32 }}>
              {[article.category, "Sports", "2026"].map(tag => (
                <span key={tag} style={{ padding: "4px 14px", border: "1px solid #ddd", fontSize: 12, color: "var(--text-mid)", cursor: "pointer", transition: "all 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "var(--primary)"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "var(--primary)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = ""; e.currentTarget.style.color = "var(--text-mid)"; e.currentTarget.style.borderColor = "#ddd"; }}>
                  #{tag}
                </span>
              ))}
            </div>

            <CommentSection />
          </article>

          <aside>
            <WeatherWidget />
            <ExchangeRates />

            <div style={{ background: "#fff", border: "1px solid var(--border)", padding: 20, marginBottom: 24 }}>
              <div className="section-title" style={{ fontSize: 16 }}>Related News</div>
              {related.map(r => (
                <Link key={r.id} href={`/news/${r.slug}`}
                  style={{ display: "flex", gap: 10, paddingBottom: 14, marginBottom: 14, borderBottom: "1px solid #f0f0f0", transition: "opacity 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = "0.75")}
                  onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
                  <div style={{ width: 64, height: 48, background: "#e0e0e0", flexShrink: 0, overflow: "hidden", borderRadius: 2 }}>
                    <img src={r.image} alt={r.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div>
                    <span className="cat-badge" style={{ fontSize: 9, display: "inline-block", marginBottom: 3 }}>{r.category}</span>
                    <p style={{ fontSize: 12, fontWeight: 700, lineHeight: 1.4 }}>{r.title}</p>
                  </div>
                </Link>
              ))}
            </div>

            <FideRating />
          </aside>
        </div>
      </section>
      <footer style={{ background: "#0d0d0d", color: "#aaa", padding: "28px 0" }}>
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ fontFamily: "var(--font-heading)", fontSize: 20, fontWeight: 700, color: "#fff" }}>
            <span style={{ color: "var(--primary)" }}>Sport</span> News
          </Link>
          <p style={{ fontSize: 12 }}>© 2026 Sport News. All rights reserved.</p>
          <div style={{ display: "flex", gap: 8 }}>
            {["f", "in", "✕"].map(i => (
              <span key={i} style={{ width: 32, height: 32, border: "1px solid #333", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, cursor: "pointer" }}>{i}</span>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}
