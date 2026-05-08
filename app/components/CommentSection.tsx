"use client";
import { useState } from "react";

interface Comment {
  id: number;
  author: string;
  text: string;
  date: string;
  avatar: string;
}

const INITIAL_COMMENTS: Comment[] = [
  { id: 1, author: "Alex Turner", text: "Incredible coverage! This is exactly the kind of in-depth reporting sports fans need.", date: "April 24, 2026", avatar: "A" },
  { id: 2, author: "Maria Santos", text: "Great article, really puts things into perspective. Keep up the amazing work!", date: "April 23, 2026", avatar: "M" },
];

export default function CommentSection() {
  const [comments, setComments] = useState<Comment[]>(INITIAL_COMMENTS);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [shared, setShared] = useState<string[]>([]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;
    setComments(prev => [...prev, {
      id: Date.now(), author: name, text, avatar: name[0].toUpperCase(),
      date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
    }]);
    setName(""); setText("");
  }

  function share(network: "twitter" | "facebook") {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent("Check out this article on Sport News!");
    if (network === "twitter") window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, "_blank");
    if (network === "facebook") window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank");
    setShared(prev => prev.includes(network) ? prev : [...prev, network]);
  }

  return (
    <div style={{ marginTop: 48 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 40, padding: "20px 24px", background: "#f8f8f8", border: "1px solid #eee" }}>
        <span style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginRight: 8 }}>Share this article:</span>
        <button onClick={() => share("twitter")}
          style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 20px", background: shared.includes("twitter") ? "#0ea5e9" : "#1da1f2", color: "#fff", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, transition: "opacity 0.2s" }}
          onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
          onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
          X Twitter {shared.includes("twitter") && "✓"}
        </button>
        <button onClick={() => share("facebook")}
          style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 20px", background: shared.includes("facebook") ? "#2563eb" : "#1877f2", color: "#fff", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, transition: "opacity 0.2s" }}
          onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
          onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
          f Facebook {shared.includes("facebook") && "✓"}
        </button>
      </div>

      <div id="comments">
        <h3 style={{ fontFamily: "var(--font-heading)", fontSize: 22, fontWeight: 700, textTransform: "uppercase", marginBottom: 24, borderLeft: "4px solid var(--primary)", paddingLeft: 12 }}>
          Comments ({comments.length})
        </h3>

        {comments.map(c => (
          <div key={c.id} style={{ display: "flex", gap: 16, marginBottom: 24, padding: 20, background: "#fff", border: "1px solid #f0f0f0" }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", background: "var(--primary)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 18, flexShrink: 0 }}>
              {c.avatar}
            </div>
            <div>
              <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 8 }}>
                <span style={{ fontWeight: 700, fontSize: 14 }}>{c.author}</span>
                <span style={{ fontSize: 12, color: "var(--text-light)" }}>{c.date}</span>
              </div>
              <p style={{ fontSize: 14, color: "var(--text-mid)", lineHeight: 1.7 }}>{c.text}</p>
            </div>
          </div>
        ))}

        <div style={{ background: "#fff", border: "1px solid #eee", padding: 28, marginTop: 32 }}>
          <h4 style={{ fontFamily: "var(--font-heading)", fontSize: 18, fontWeight: 700, textTransform: "uppercase", marginBottom: 20 }}>Leave a Comment</h4>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name *"
              style={{ padding: "12px 16px", border: "1px solid #e0e0e0", fontSize: 14, fontFamily: "var(--font-main)", outline: "none", background: "#fafafa" }}
              onFocus={e => (e.target.style.borderColor = "var(--primary)")}
              onBlur={e => (e.target.style.borderColor = "#e0e0e0")} />
            <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Your comment *" rows={5}
              style={{ padding: "12px 16px", border: "1px solid #e0e0e0", fontSize: 14, fontFamily: "var(--font-main)", resize: "vertical", outline: "none", background: "#fafafa" }}
              onFocus={e => (e.target.style.borderColor = "var(--primary)")}
              onBlur={e => (e.target.style.borderColor = "#e0e0e0")} />
            <button type="submit" className="btn-primary" style={{ alignSelf: "flex-start", padding: "12px 32px" }}>Post Comment</button>
          </form>
        </div>
      </div>
    </div>
  );
}
