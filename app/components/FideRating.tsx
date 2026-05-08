"use client";

const FIDE_RATINGS = [
  { rank: 1, name: "Magnus Carlsen",   country: "🇳🇴", rating: 2830, games: 12 },
  { rank: 2, name: "Fabiano Caruana",  country: "🇺🇸", rating: 2805, games: 10 },
  { rank: 3, name: "Hikaru Nakamura",  country: "🇺🇸", rating: 2794, games: 15 },
  { rank: 4, name: "Ding Liren",       country: "🇨🇳", rating: 2762, games: 8  },
  { rank: 5, name: "Ian Nepomniachtchi",country:"🇷🇺", rating: 2758, games: 11 },
  { rank: 6, name: "Anish Giri",       country: "🇳🇱", rating: 2745, games: 9  },
];

export default function FideRating() {
  return (
    <div style={{ background: "#fff", border: "1px solid var(--border)", padding: 20, marginBottom: 24 }} id="fide">
      <div className="section-title" style={{ fontSize: 16 }}>♟ FIDE Rating</div>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr style={{ background: "#f7f7f7" }}>
            <th style={{ padding: "8px 4px", textAlign: "left", fontSize: 11, color: "var(--text-light)", letterSpacing: 1 }}>#</th>
            <th style={{ padding: "8px 4px", textAlign: "left", fontSize: 11, color: "var(--text-light)", letterSpacing: 1 }}>PLAYER</th>
            <th style={{ padding: "8px 4px", textAlign: "right", fontSize: 11, color: "var(--text-light)", letterSpacing: 1 }}>ELO</th>
          </tr>
        </thead>
        <tbody>
          {FIDE_RATINGS.map(p => (
            <tr key={p.rank} style={{ borderBottom: "1px solid #f0f0f0" }}>
              <td style={{ padding: "9px 4px", fontWeight: 700, color: p.rank === 1 ? "var(--primary)" : "var(--text-light)" }}>{p.rank}</td>
              <td style={{ padding: "9px 4px" }}>
                <span style={{ marginRight: 4 }}>{p.country}</span>
                <span style={{ fontWeight: 600, fontSize: 12 }}>{p.name}</span>
              </td>
              <td style={{ padding: "9px 4px", textAlign: "right", fontWeight: 700, color: "#1a1a1a" }}>{p.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
