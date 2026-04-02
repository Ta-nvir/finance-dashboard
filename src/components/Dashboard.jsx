import React from "react";
import { useApp } from "../context/AppContext";
import { TrendingUp, TrendingDown, Wallet, ArrowUpRight } from "lucide-react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { monthlyData, getCategorySpending, categoryColors } from "../data/mockData";

const fmt = (n) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

const SummaryCard = ({ label, value, icon: Icon, color, bg, trend }) => (
  <div className="card fade-up" style={{ padding: 24 }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
      <div>
        <div style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 8 }}>{label}</div>
        <div className="mono" style={{ fontSize: 26, fontWeight: 700, letterSpacing: "-1px", color }}>{fmt(value)}</div>
        {trend && <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 6, display: "flex", alignItems: "center", gap: 4 }}>
          <ArrowUpRight size={12} /> vs last month
        </div>}
      </div>
      <div style={{ width: 44, height: 44, borderRadius: 12, background: bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon size={20} color={color} />
      </div>
    </div>
  </div>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10, padding: "10px 14px" }}>
      <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 6 }}>{label}</div>
      {payload.map(p => (
        <div key={p.name} style={{ fontSize: 13, fontWeight: 600, color: p.color, fontFamily: "JetBrains Mono, monospace" }}>
          {p.name}: {fmt(p.value)}
        </div>
      ))}
    </div>
  );
};

export default function Dashboard() {
  const { summary, transactions } = useApp();
  const categoryData = getCategorySpending(transactions);
  const recentTxns = transactions.slice(0, 5);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Summary Cards */}
      <div className="grid-3" style={{ animationDelay: "0s" }}>
        <SummaryCard label="Total Balance" value={summary.balance} icon={Wallet} color="var(--accent)" bg="var(--accent-light)" trend />
        <SummaryCard label="Total Income" value={summary.income} icon={TrendingUp} color="var(--green)" bg="var(--green-light)" trend />
        <SummaryCard label="Total Expenses" value={summary.expenses} icon={TrendingDown} color="var(--red)" bg="var(--red-light)" trend />
      </div>

      {/* Charts Row */}
      <div className="grid-2">
        {/* Balance Trend */}
        <div className="card fade-up" style={{ padding: 24, animationDelay: "0.1s" }}>
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 15, fontWeight: 600 }}>Balance Trend</div>
            <div style={{ fontSize: 12, color: "var(--text-muted)" }}>Last 6 months overview</div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "var(--text-muted)" }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="income" stroke="#10b981" strokeWidth={2} fill="url(#incomeGrad)" name="Income" />
              <Area type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={2} fill="url(#expGrad)" name="Expenses" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Spending by Category */}
        <div className="card fade-up" style={{ padding: 24, animationDelay: "0.15s" }}>
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 15, fontWeight: 600 }}>Spending Breakdown</div>
            <div style={{ fontSize: 12, color: "var(--text-muted)" }}>By category</div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={categoryData} cx="50%" cy="50%" innerRadius={60} outerRadius={95} paddingAngle={3} dataKey="value">
                {categoryData.map((entry) => (
                  <Cell key={entry.name} fill={categoryColors[entry.name] || "#6C63FF"} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => fmt(v)} />
              <Legend iconType="circle" iconSize={8} formatter={(v) => <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{v}</span>} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Monthly comparison bar */}
      <div className="card fade-up" style={{ padding: 24, animationDelay: "0.2s" }}>
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 15, fontWeight: 600 }}>Monthly Comparison</div>
          <div style={{ fontSize: 12, color: "var(--text-muted)" }}>Income vs Expenses per month</div>
        </div>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={monthlyData} barGap={4}>
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: "var(--text-muted)" }} axisLine={false} tickLine={false} />
            <YAxis hide />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="income" fill="#10b981" radius={[6, 6, 0, 0]} name="Income" maxBarSize={40} />
            <Bar dataKey="expenses" fill="#ef4444" radius={[6, 6, 0, 0]} name="Expenses" maxBarSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Transactions */}
      <div className="card fade-up" style={{ padding: 24, animationDelay: "0.25s" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 600 }}>Recent Transactions</div>
            <div style={{ fontSize: 12, color: "var(--text-muted)" }}>Latest activity</div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {recentTxns.map(txn => (
            <div key={txn.id} style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "12px 14px", borderRadius: 10, background: "var(--surface2)"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: txn.type === "income" ? "var(--green-light)" : "var(--red-light)",
                  display: "flex", alignItems: "center", justifyContent: "center"
                }}>
                  {txn.type === "income" ? <TrendingUp size={16} color="var(--green)" /> : <TrendingDown size={16} color="var(--red)" />}
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>{txn.description}</div>
                  <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{txn.category} · {new Date(txn.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</div>
                </div>
              </div>
              <div className="mono" style={{ fontSize: 15, fontWeight: 600, color: txn.type === "income" ? "var(--green)" : "var(--red)" }}>
                {txn.type === "income" ? "+" : "-"}{fmt(Math.abs(txn.amount))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
