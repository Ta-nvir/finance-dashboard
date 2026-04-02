import React, { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import { LayoutDashboard, ArrowLeftRight, Lightbulb, TrendingUp, Menu, X } from "lucide-react";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "transactions", label: "Transactions", icon: ArrowLeftRight },
  { id: "insights", label: "Insights", icon: Lightbulb },
];

export default function Sidebar() {
  const { activeTab, setActiveTab } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNav = (id) => {
    setActiveTab(id);
    setMobileOpen(false);
  };

  return (
    <>
      {isMobile && (
        <button onClick={() => setMobileOpen(true)} style={{
          position: "fixed", top: 14, left: 16, zIndex: 300,
          background: "var(--surface)", border: "1px solid var(--border)",
          borderRadius: 10, padding: "8px 10px", cursor: "pointer",
          color: "var(--text)", display: "flex", alignItems: "center",
          boxShadow: "var(--shadow)"
        }}>
          <Menu size={20} />
        </button>
      )}

      {mobileOpen && (
        <div onClick={() => setMobileOpen(false)} style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)",
          zIndex: 150, backdropFilter: "blur(2px)"
        }} />
      )}

      <aside style={{
        position: "fixed", left: 0, top: 0, bottom: 0,
        width: 240,
        background: "var(--surface)",
        borderRight: "1px solid var(--border)",
        display: "flex", flexDirection: "column",
        padding: "24px 16px",
        zIndex: 200,
        transform: isMobile && !mobileOpen ? "translateX(-100%)" : "translateX(0)",
        transition: "transform 0.3s ease, background 0.3s, border 0.3s",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "0 8px 28px", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: "linear-gradient(135deg, #6C63FF, #a78bfa)",
              display: "flex", alignItems: "center", justifyContent: "center"
            }}>
              <TrendingUp size={18} color="white" />
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700 }}>FinTrack</div>
              <div style={{ fontSize: 11, color: "var(--text-muted)" }}>Finance Dashboard</div>
            </div>
          </div>
          {isMobile && (
            <button onClick={() => setMobileOpen(false)} style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--text-muted)" }}>
              <X size={20} />
            </button>
          )}
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: "var(--text-muted)", padding: "0 8px", marginBottom: 4, letterSpacing: "0.06em", textTransform: "uppercase" }}>Menu</div>
          {navItems.map(({ id, label, icon: Icon }) => {
            const active = activeTab === id;
            return (
              <button key={id} onClick={() => handleNav(id)} style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "10px 12px", borderRadius: 10, border: "none",
                cursor: "pointer", fontFamily: "Sora, sans-serif",
                fontSize: 14, fontWeight: active ? 600 : 400,
                background: active ? "var(--accent-light)" : "transparent",
                color: active ? "var(--accent)" : "var(--text-muted)",
                transition: "all 0.2s", textAlign: "left"
              }}>
                <Icon size={18} />
                {label}
                {active && <div style={{ marginLeft: "auto", width: 6, height: 6, borderRadius: "50%", background: "var(--accent)" }} />}
              </button>
            );
          })}
        </nav>

        <div style={{ padding: "12px", borderRadius: 12, background: "linear-gradient(135deg, var(--accent-light), transparent)", border: "1px solid var(--border)" }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: "var(--accent)", marginBottom: 4 }}>Pro Tip</div>
          <div style={{ fontSize: 11, color: "var(--text-muted)", lineHeight: 1.5 }}>Switch roles from the header to explore Admin features.</div>
        </div>
      </aside>
    </>
  );
}
