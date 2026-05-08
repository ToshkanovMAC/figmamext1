"use client";
import Link from "next/link";
import Navbar from "./components/Navbar";
import WeatherWidget from "./components/WeatherWidget";
import ExchangeRates from "./components/ExchangeRates";
import FideRating from "./components/FideRating";
import { articles } from "./data";

export default function Home() {
  const heroArticle = articles[0];
  const trendingList = articles.slice(2, 5); 
  const featuredTrending = articles[5]; 
  const recent = articles.slice(4, 7);
  const gridNews = articles.slice(5, 8); 

  return (
    <>
      <Navbar />

      <section style={{ background: "#fff", padding: "40px 0", overflow: "hidden" }}>
        <div className="container" style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 32 }}>
          
          <div style={{ position: "relative", minHeight: 700, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ 
              position: "absolute", 
              top: "50%", 
              left: "40%", 
              transform: "translate(-50%, -50%)",
              width: "650px", 
              height: "650px", 
              background: "#f0f2f5", 
              borderRadius: "50%", 
              zIndex: 0,
              opacity: 0.6
            }} />

            <div style={{ 
              position: "absolute", 
              top: "50%", 
              left: "5%", 
              transform: "translateY(-50%)",
              zIndex: 1,
              pointerEvents: "none"
            }}>
              <h1 style={{ 
                fontFamily: "var(--font-heading)", 
                fontSize: "140px", 
                fontWeight: 900, 
                textTransform: "uppercase", 
                lineHeight: 0.8, 
                color: "#2c3e50",
                opacity: 0.15,
                margin: 0
              }}>
                TOP<br/>SCORER<br/>THE FINAL<br/>MATCH
              </h1>
            </div>

            <div style={{ 
              position: "relative", 
              zIndex: 10, 
              width: "100%", 
              height: "100%", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center" 
            }}>
              <img src="/images/hero-athlete.png" alt="Hero Athlete" style={{ 
                width: "auto", 
                height: "100%", 
                maxHeight: "750px",
                objectFit: "contain",
                zIndex: 10,
                filter: "drop-shadow(30px 30px 50px rgba(0,0,0,0.15))"
              }} />
              
              <div style={{ 
                position: "absolute", 
                top: "15%", 
                left: "0", 
                zIndex: 20,
                pointerEvents: "none"
              }}>
                <h1 style={{ 
                  fontFamily: "var(--font-heading)", 
                  fontSize: "90px", 
                  fontWeight: 900, 
                  textTransform: "uppercase", 
                  lineHeight: 0.85, 
                  color: "#2c3e50",
                  textShadow: "0 0 30px rgba(255,255,255,0.8)"
                }}>
                  TOP<br/>SCORER TO<br/>THE FINAL<br/>MATCH
                </h1>
              </div>

              <div style={{ 
                position: "absolute", 
                bottom: "20%", 
                right: "0%", 
                zIndex: 20,
                maxWidth: "400px",
                textAlign: "left",
                background: "rgba(255,255,255,0.95)",
                padding: "24px",
                borderRadius: "2px",
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                border: "1px solid #eee"
              }}>
                <p style={{ color: "#7f8c8d", fontSize: 15, lineHeight: 1.6, margin: 0 }}>
                  The EuroLeague Finals Top Scorer is the individual award for the player that gained the highest points in the EuroLeague Finals. This season saw record-breaking performances from elite athletes around the globe.
                </p>
              </div>
            </div>

            <div style={{ position: "absolute", bottom: "5%", left: "50%", transform: "translateX(-50%)", zIndex: 30 }}>
              <Link href={`/news/${heroArticle.slug}`} className="btn-primary" style={{ 
                background: "#111", 
                color: "#fff", 
                padding: "20px 70px", 
                fontSize: 16, 
                fontWeight: 800,
                borderRadius: "4px",
                textTransform: "uppercase",
                letterSpacing: "2px",
                boxShadow: "0 15px 30px rgba(0,0,0,0.3)"
              }}>
                Continue Reading
              </Link>
            </div>
          </div>

          <aside style={{ display: "flex", flexDirection: "column", gap: 20, paddingTop: 40 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#95a5a6", background: "#f0f2f5", padding: "6px 16px", alignSelf: "flex-start", borderRadius: "4px" }}>Today</div>
            {articles.slice(1, 3).map(a => (
              <Link key={a.id} href={`/news/${a.slug}`} style={{ background: "#fff", border: "1px solid #eee", display: "flex", flexDirection: "column", borderRadius: "8px", overflow: "hidden" }}>
                <div style={{ height: 180, background: "#eee", overflow: "hidden" }}>
                  <img src={a.image} alt={a.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div style={{ padding: 16 }}>
                  <p style={{ fontSize: 10, color: "#95a5a6", marginBottom: 6 }}>{a.author} — {a.date}</p>
                  <h3 style={{ fontSize: 15, fontWeight: 700, lineHeight: 1.3 }}>{a.title}</h3>
                </div>
              </Link>
            ))}
          </aside>
        </div>
      </section>

      <section id="category" style={{ padding: "80px 0", background: "#fff" }}>
        <div className="container">
          <div className="section-title">Category</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
            {["FOOTBALL", "BASKETBALL", "CAR SPORT", "TABLE TENNIS"].map(c => (
              <div key={c} style={{ position: "relative", height: 200, background: "#000", overflow: "hidden", display: "flex", alignItems: "end", padding: 20, borderRadius: 4 }}>
                <img src={`/images/${c.toLowerCase().replace(" ", "")}-cat.jpg`} alt={c} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.6 }} />
                <h3 style={{ position: "relative", zIndex: 10, color: "#fff", fontWeight: 800, fontSize: 24, textTransform: "uppercase" }}>{c}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="trending" style={{ padding: "80px 0", background: "#fff" }}>
        <div className="container">
          <div style={{ 
            background: "#eff2f6", 
            borderRadius: "12px", 
            overflow: "hidden", 
            display: "grid", 
            gridTemplateColumns: "1fr 1fr",
            minHeight: "550px"
          }}>
            <div style={{ padding: "40px" }}>
              <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 32, fontWeight: 700, marginBottom: 30, color: "#1a1a1a" }}>Trending News</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                {trendingList.map((a, i) => (
                  <Link key={a.id} href={`/news/${a.slug}`} style={{ display: "flex", gap: 20, paddingBottom: 24, borderBottom: i === 2 ? "none" : "1px solid #d1d8e0" }}>
                    <div style={{ width: 180, height: 110, borderRadius: "8px", overflow: "hidden", flexShrink: 0 }}>
                      <img src={a.image} alt={a.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                    <div>
                      <p style={{ fontSize: 11, color: "#7f8c8d", marginBottom: 6 }}>{a.author} — {a.date}</p>
                      <h3 style={{ fontSize: 18, fontWeight: 800, lineHeight: 1.2, marginBottom: 8, color: "#1a1a1a" }}>{a.title}</h3>
                      <p style={{ fontSize: 12, color: "#5d6d7e", lineHeight: 1.5 }}>{a.excerpt.slice(0, 80)}...</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div style={{ position: "relative", overflow: "hidden" }}>
              <img src={featuredTrending.image} alt={featuredTrending.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(0deg, rgba(0,0,0,0.8) 0%, transparent 60%)" }} />
              
              <div style={{ position: "absolute", top: 40, left: 40 }}>
                <span style={{ border: "1px solid #fff", color: "#fff", padding: "6px 16px", borderRadius: "4px", fontSize: 14, fontWeight: 600, textTransform: "uppercase" }}>{featuredTrending.category}</span>
              </div>

              <div style={{ position: "absolute", bottom: 40, left: 40, right: 40 }}>
                <p style={{ color: "#fff", fontSize: 14, marginBottom: 12, opacity: 0.9 }}>{featuredTrending.author} — {featuredTrending.date}</p>
                <h2 style={{ color: "#fff", fontSize: 36, fontWeight: 900, textTransform: "uppercase", lineHeight: 1.1 }}>
                  {featuredTrending.title}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section style={{ padding: "80px 0", background: "#fff" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, alignItems: "start" }}>
            <WeatherWidget />
            <ExchangeRates />
            <FideRating />
          </div>
        </div>
      </section>

      <section style={{ padding: "80px 0" }}>
        <div className="container">
          <div style={{ position: "relative", height: 400, background: "#111", overflow: "hidden", display: "flex", alignItems: "center", borderRadius: 8 }}>
            <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
              <img src="/images/football-cat.jpg" alt="Featured" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.4 }} />
            </div>
            <div style={{ position: "relative", zIndex: 10, padding: 60, color: "#fff", width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", background: "linear-gradient(90deg, rgba(0,0,0,0.9) 0%, transparent 100%)" }}>
              <div style={{ maxWidth: "60%" }}>
                <span className="cat-badge" style={{ marginBottom: 16, display: "inline-block" }}>FOOTBALL</span>
                <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 44, fontWeight: 900, textTransform: "uppercase", lineHeight: 1, marginBottom: 20 }}>
                  Lionel Messi Leaving Ligue 1 Team Paris Saint-Germain, Club Confirms
                </h2>
                <p style={{ opacity: 0.8, fontSize: 16, lineHeight: 1.6 }}>
                  The Rankings of the Top Scorer for this individual move that passed the biggest goal of the European League Finals.
                </p>
              </div>
              <Link href="/news/messi-leaving-psg" className="btn-primary" style={{ padding: "16px 48px", fontSize: 14 }}>Read More</Link>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: "80px 0", background: "#fff" }}>
        <div className="container" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60 }}>
          <div>
            <div className="section-title">Recent News</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {recent.map(a => (
                <Link key={a.id} href={`/news/${a.slug}`} style={{ display: "flex", gap: 20, paddingBottom: 20, borderBottom: "1px solid #f0f0f0" }}>
                  <div style={{ width: 140, height: 100, background: "#eee", flexShrink: 0, borderRadius: 4, overflow: "hidden" }}>
                    <img src={a.image} alt={a.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div>
                    <span className="cat-badge" style={{ fontSize: 9, marginBottom: 6, display: "inline-block" }}>{a.category}</span>
                    <h3 style={{ fontSize: 16, fontWeight: 800, lineHeight: 1.3 }}>{a.title}</h3>
                    <p style={{ fontSize: 11, color: "var(--text-light)", marginTop: 8 }}>{a.date}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="section-title">Clubs Ranking</div>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #eee", textAlign: "left", color: "var(--text-light)", fontSize: 12 }}>
                  <th style={{ padding: "12px 0" }}>CLUB</th>
                  <th style={{ padding: "12px 0" }}>W</th>
                  <th style={{ padding: "12px 0" }}>D</th>
                  <th style={{ padding: "12px 0" }}>L</th>
                  <th style={{ padding: "12px 0" }}>PTS</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Man City", w: 28, d: 5, l: 3, p: 89 },
                  { name: "Arsenal", w: 26, d: 6, l: 6, p: 84 },
                  { name: "Man United", w: 23, d: 6, l: 9, p: 75 },
                  { name: "Newcastle", w: 19, d: 14, l: 5, p: 71 },
                  { name: "Liverpool", w: 19, d: 10, l: 9, p: 67 },
                ].map((c, i) => (
                  <tr key={c.name} style={{ borderBottom: "1px solid #f9f9f9" }}>
                    <td style={{ padding: "16px 0", fontWeight: 700 }}>{i + 1}. {c.name}</td>
                    <td style={{ padding: "16px 0" }}>{c.w}</td>
                    <td style={{ padding: "16px 0" }}>{c.d}</td>
                    <td style={{ padding: "16px 0" }}>{c.l}</td>
                    <td style={{ padding: "16px 0", fontWeight: 800, color: "var(--text-dark)" }}>{c.p}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section style={{ padding: "80px 0", background: "var(--bg)" }}>
        <div className="container">
          <div className="section-title">Sports Article</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }}>
            {gridNews.map(a => (
              <Link key={a.id} href={`/news/${a.slug}`} style={{ background: "#fff", border: "1px solid var(--border)", overflow: "hidden", display: "flex", flexDirection: "column", borderRadius: 8 }}>
                <div style={{ height: 220, background: "#eee" }}>
                  <img src={a.image} alt={a.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div style={{ padding: 24, flex: 1, display: "flex", flexDirection: "column" }}>
                  <span className="cat-badge" style={{ marginBottom: 10, display: "inline-block" }}>{a.category}</span>
                  <h3 style={{ fontSize: 18, fontWeight: 900, lineHeight: 1.2, marginBottom: 12 }}>{a.title}</h3>
                  <p style={{ fontSize: 13, color: "var(--text-mid)", lineHeight: 1.6, flex: 1 }}>{a.excerpt.slice(0, 100)}...</p>
                  <div style={{ marginTop: 20, fontSize: 11, fontWeight: 700, color: "var(--primary)", textTransform: "uppercase", letterSpacing: 1 }}>Read Story →</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <footer style={{ background: "#0d0d0d", color: "#aaa", padding: "48px 0" }}>
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ fontFamily: "var(--font-heading)", fontSize: 24, fontWeight: 700, color: "#fff" }}>
            <span style={{ color: "var(--primary)" }}>Sport</span> News
          </Link>
          <p style={{ fontSize: 14 }}>© 2026 Sport News. All rights reserved.</p>
          <div style={{ display: "flex", gap: 12 }}>
            {["f", "in", "✕"].map(i => (
              <span key={i} style={{ width: 40, height: 40, border: "1px solid #333", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, cursor: "pointer", transition: "all 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--primary)")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "#333")}>{i}</span>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}
