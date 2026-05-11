"use client";
import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Category", href: "/#category" },
  { label: "Blog/News", href: "/#trending" },
  { label: "Home Time", href: "/#weather" },
  { label: "FIDE Rating", href: "/#fide" },
  { label: "Contact", href: "/#footer" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 100,
      background: "#fff", borderBottom: "1px solid #e0e0e0",
      boxShadow: "0 2px 8px rgba(0,0,0,0.07)"
    }}>
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        <Link href="/" style={{ fontFamily: "var(--font-heading)", fontSize: 22, fontWeight: 700, letterSpacing: 1, color: "var(--text-dark)" }}>
          <span style={{ color: "var(--primary)" }}>Sport</span> News
        </Link>

        <ul style={{ display: "flex", gap: 28, listStyle: "none" }} className="desktop-nav">
          {navLinks.map(l => (
            <li key={l.href}>
              <Link href={l.href} style={{ fontSize: 13, fontWeight: 500, color: "var(--text-mid)", textTransform: "uppercase", letterSpacing: "0.5px", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--primary)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--text-mid)")}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div style={{ fontSize: 20 }}>🏆</div>

        <button onClick={() => setOpen(!open)} style={{ display: "none", background: "none", border: "none", cursor: "pointer", fontSize: 22 }} className="burger">☰</button>
      </div>

      {open && (
        <div style={{ background: "#fff", padding: "166 40px", borderTop: "1px solid #e0e0e0" }}>
          {navLinks.map(l => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
              style={{ display: "block", padding: "10px 0", fontSize: 14, fontWeight: 600, color: "var(--text-dark)", borderBottom: "1px solid #f0f0f0" }}>
              {l.label}
            </Link>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .burger { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
