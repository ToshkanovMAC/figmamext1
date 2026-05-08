"use client";
import { useEffect, useState } from "react";

interface Rate {
  code: string;
  flag: string;
  name: string;
  buy: string;
  sell: string;
}

const INITIAL_RATES: Rate[] = [
  { code: "USD", flag: "🇺🇸", name: "US Dollar", buy: "12,650", sell: "12,700" },
  { code: "EUR", flag: "🇪🇺", name: "Euro", buy: "13,820", sell: "13,880" },
  { code: "GBP", flag: "🇬🇧", name: "Pound", buy: "16,100", sell: "16,200" },
  { code: "UZS", flag: "🇺🇿", name: "Uzbekistan Sum", buy: "12,650", sell: "12,700" },
  { code: "CNY", flag: "🇨🇳", name: "Yuan", buy: "1,740", sell: "1,760" },
];

export default function ExchangeRates() {
  const [rates, setRates] = useState<Rate[]>(INITIAL_RATES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRates() {
      try {
        const res = await fetch("https://open.er-api.com/v6/latest/USD");
        const data = await res.json();

        if (data && data.rates) {
          const newRates = INITIAL_RATES.map(r => {
            if (r.code === "USD") return r;
            const marketRate = data.rates[r.code];
            if (marketRate) {
              const buy = r.code === "UZS"
                ? Math.floor(marketRate * 0.995).toLocaleString()
                : (marketRate * 0.995).toFixed(2);
              const sell = r.code === "UZS"
                ? Math.ceil(marketRate * 1.005).toLocaleString()
                : (marketRate * 1.005).toFixed(2);

              return { ...r, buy, sell };
            }
            return r;
          });
          setRates(newRates);
        }
      } catch (err) {
        console.error("Exchange Rate Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchRates();
  }, []);

  return (
    <div style={{ background: "#fff", border: "1px solid var(--border)", padding: "20px", marginBottom: 24 }}>
      <div className="section-title" style={{ fontSize: 16 }}>Exchange Rates</div>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr style={{ background: "#f7f7f7" }}>
            <th style={{ padding: "8px 6px", textAlign: "left", fontWeight: 600, color: "var(--text-light)", fontSize: 11, letterSpacing: 1 }}>CURRENCY</th>
            <th style={{ padding: "8px 6px", textAlign: "right", fontWeight: 600, color: "var(--text-light)", fontSize: 11, letterSpacing: 1 }}>BUY</th>
            <th style={{ padding: "8px 6px", textAlign: "right", fontWeight: 600, color: "var(--text-light)", fontSize: 11, letterSpacing: 1 }}>SELL</th>
          </tr>
        </thead>
        <tbody>
          {rates.map((r, i) => (
            <tr key={r.code} style={{ borderBottom: "1px solid #f0f0f0", background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
              <td style={{ padding: "9px 6px" }}>
                <span style={{ marginRight: 6 }}>{r.flag}</span>
                <span style={{ fontWeight: 600 }}>{r.code}</span>
                <span style={{ color: "var(--text-light)", marginLeft: 6, fontSize: 11 }}>{r.name}</span>
              </td>
              <td style={{ padding: "9px 6px", textAlign: "right", color: "#16a34a", fontWeight: 600 }}>
                {loading ? "..." : r.buy}
              </td>
              <td style={{ padding: "9px 6px", textAlign: "right", color: "var(--primary)", fontWeight: 600 }}>
                {loading ? "..." : r.sell}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p style={{ fontSize: 10, color: "var(--text-light)", marginTop: 8, textAlign: "right" }}>
        Updated: {new Date().toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" })}
      </p>
    </div>
  );
}
