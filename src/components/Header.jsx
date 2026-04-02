import React, { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import { Moon, Sun, Shield, Eye } from "lucide-react";

export default function Header() {
  const { role, setRole, darkMode, setDarkMode, activeTab } = useApp();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const titles = { dashboard: "Overview", transactions: "Transactions", insights: "Insights" };

  return (
    <header style={{
      height: 64,
      background: "var(--surface)",
      borderBottom: "1px solid var(--border)",
      display: "flex", alignItems: "center",
      padding: isMobile ? "0 16px 0 60px" : "0 32px",
      justifyContent: "space-between",
      position: "sticky", top: 0, zIndex: 50,
      transition: "background 0.3s"
    }}>
      <div>
        <h1 style={{ fontSize: isMobile ? 16 : 18, fontWeight: 700, letterSpacing: "-0.3px" }}>{titles[activeTab]}</h1>
        {!isMobile && (
          <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
            {new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
          </div>
        )}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: isMobile ? 8 : 12 }}>
        {/* Role Switcher */}
        <div style={{
          display: "flex", alignItems: "center", gap: 4,
          background: "var(--surface2)", borderRadius: 10, padding: 4,
          border: "1px solid var(--border)"
        }}>
          {["viewer", "admin"].map(r => (
            <button key={r} onClick={() => setRole(r)} style={{
              display: "flex", alignItems: "center", gap: isMobile ? 0 : 6,
              padding: isMobile ? "6px 8px" : "6px 12px",
              borderRadius: 7, border: "none",
              fontFamily: "Sora, sans-serif", fontSize: 13, fontWeight: 500,
              cursor: "pointer",
              background: role === r ? "var(--surface)" : "transparent",
              color: role === r ? "var(--accent)" : "var(--text-muted)",
              boxShadow: role === r ? "var(--shadow-sm)" : "none",
              transition: "all 0.2s"
            }}>
              {r === "viewer" ? <Eye size={14} /> : <Shield size={14} />}
              {!isMobile && r.charAt(0).toUpperCase() + r.slice(1)}
            </button>
          ))}
        </div>

        {/* Dark Mode */}
        <button onClick={() => setDarkMode(!darkMode)} style={{
          width: 38, height: 38, borderRadius: 10, border: "1px solid var(--border)",
          background: "var(--surface2)", display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", color: "var(--text-muted)", transition: "all 0.2s", flexShrink: 0
        }}>
          {darkMode ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        {/* Avatar */}
        <div style={{
          width: 36, height: 36, borderRadius: "50%",
          background: "linear-gradient(135deg, #6C63FF, #a78bfa)",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "white", fontWeight: 700, fontSize: 14, flexShrink: 0
        }}>
          {role === "admin" ? "A" : "V"}
        </div>
      </div>
    </header>
  );
}
