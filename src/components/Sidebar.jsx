import React from "react";
import { useApp } from "../context/AppContext";
import { LayoutDashboard, ArrowLeftRight, Lightbulb, TrendingUp } from "lucide-react";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "transactions", label: "Transactions", icon: ArrowLeftRight },
  { id: "insights", label: "Insights", icon: Lightbulb },
];

export default function Sidebar() {
  const { activeTab, setActiveTab, darkMode } = useApp();

  return (
    <aside className="sidebar" style={{
      position: "fixed", left: 0, top: 0, bottom: 0,
      width: "var(--sidebar-w)",
      background: "var(--surface)",
      borderRight: "1px solid var(--border)",
      display: "flex", flexDirection: "column",
      padding: "24px 16px",
      zIndex: 100,
      transition: "background 0.3s, border 0.3s"
    }}>
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "0 8px 28px" }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10,
          background: "linear-gradient(135deg, #6C63FF, #a78bfa)",
          display: "flex", alignItems: "center", justifyContent: "center"
        }}>
          <TrendingUp size={18} color="white" />
        </div>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: "-0.3px" }}>FinTrack</div>
          <div style={{ fontSize: 11, color: "var(--text-muted)" }}>Finance Dashboard</div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1 }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: "var(--text-muted)", padding: "0 8px", marginBottom: 4, letterSpacing: "0.06em", textTransform: "uppercase" }}>Menu</div>
        {navItems.map(({ id, label, icon: Icon }) => {
          const active = activeTab === id;
          return (
            <button key={id} onClick={() => setActiveTab(id)} style={{
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

      {/* Bottom indicator */}
      <div style={{
        padding: "12px", borderRadius: 12,
        background: "linear-gradient(135deg, var(--accent-light), transparent)",
        border: "1px solid var(--border)"
      }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: "var(--accent)", marginBottom: 4 }}>Pro Tip</div>
        <div style={{ fontSize: 11, color: "var(--text-muted)", lineHeight: 1.5 }}>Switch roles from the header to explore Admin features.</div>
      </div>
    </aside>
  );
}
