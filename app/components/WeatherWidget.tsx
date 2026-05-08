"use client";
import { useEffect, useState } from "react";

interface WeatherData {
  temp: number;
  condition: string;
  icon: string;
  forecast: { day: string; icon: string; high: number; low: number }[];
}

export default function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    async function fetchWeather() {
      try {
        const res = await fetch("https://api.open-meteo.com/v1/forecast?latitude=41.2995&longitude=69.2401&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto");
        const data = await res.json();
        
        const conditionMap: Record<number, { text: string; icon: string }> = {
          0: { text: "Clear Sky", icon: "☀️" },
          1: { text: "Mainly Clear", icon: "🌤️" },
          2: { text: "Partly Cloudy", icon: "⛅" },
          3: { text: "Overcast", icon: "☁️" },
          45: { text: "Foggy", icon: "🌫️" },
          51: { text: "Drizzle", icon: "🌧️" },
          61: { text: "Rain", icon: "🌧️" },
          71: { text: "Snow", icon: "❄️" },
          95: { text: "Thunderstorm", icon: "⛈️" },
        };

        const current = data.current_weather;
        const daily = data.daily;
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

        const forecast = daily.time.slice(1, 6).map((time: string, i: number) => {
          const date = new Date(time);
          const code = daily.weathercode[i + 1];
          return {
            day: days[date.getDay()],
            icon: conditionMap[code]?.icon || "☀️",
            high: Math.round(daily.temperature_2m_max[i + 1]),
            low: Math.round(daily.temperature_2m_min[i + 1]),
          };
        });

        setWeather({
          temp: Math.round(current.temperature),
          condition: conditionMap[current.weathercode]?.text || "Clear Sky",
          icon: conditionMap[current.weathercode]?.icon || "☀️",
          forecast,
        });
      } catch (err) {
        console.error("Failed to fetch weather", err);
      }
    }
    fetchWeather();
  }, []);

  if (!weather) return <div style={{ background: "linear-gradient(135deg,#1a1a2e,#16213e)", color: "#fff", padding: 20, height: 180, display: "flex", alignItems: "center", justifyContent: "center" }}>Loading Weather...</div>;

  return (
    <div style={{ background: "linear-gradient(135deg,#1a1a2e,#16213e)", color: "#fff", padding: 20, marginBottom: 24 }}>
      <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", marginBottom: 16, color: "#aaa" }}>
        📍 Weather Today
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
        <span style={{ fontSize: 48, lineHeight: 1 }}>{weather.icon}</span>
        <div>
          <div style={{ fontSize: 40, fontWeight: 800, lineHeight: 1 }}>{weather.temp}°</div>
          <div style={{ fontSize: 13, color: "#ccc" }}>{weather.condition} · Tashkent</div>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {weather.forecast.map(f => (
          <div key={f.day} style={{ textAlign: "center" }}>
            <div style={{ fontSize: 10, color: "#aaa", marginBottom: 4 }}>{f.day}</div>
            <div style={{ fontSize: 18 }}>{f.icon}</div>
            <div style={{ fontSize: 12, fontWeight: 700 }}>{f.high}°</div>
            <div style={{ fontSize: 10, color: "#aaa" }}>{f.low}°</div>
          </div>
        ))}
      </div>
    </div>
  );
}
