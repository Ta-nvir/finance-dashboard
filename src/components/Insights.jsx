import React, { useMemo } from "react";
import { useApp } from "../context/AppContext";
import { TrendingUp, TrendingDown, AlertCircle, Star, BarChart2, Zap } from "lucide-react";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from "recharts";
import { monthlyData, getCategorySpending, categoryColors } from "../data/mockData";

const fmt = (n) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

export default function Insights() {
  const { transactions, summary } = useApp();

  const categorySpending = getCategorySpending(transactions);
  const topCategory = categorySpending[0];
  const savingsRate = ((summary.income - summary.expenses) / summary.income * 100).toFixed(1);

  const currentMonth = monthlyData[monthlyData.length - 1];
  const prevMonth = monthlyData[monthlyData.length - 2];
  const expenseDiff = ((currentMonth.expenses - prevMonth.expenses) / prevMonth.expenses * 100).toFixed(1);
  const incomeDiff = ((currentMonth.income - prevMonth.income) / prevMonth.income * 100).toFixed(1);

  const radarData = categorySpending.slice(0, 6).map(c => ({ subject: c.name, value: c.value }));

  const insights = [
    {
      icon: Star, color: "var(--amber)", bg: "var(--amber-light)",
      title: "Top Spending Category",
      desc: topCategory ? `You spent the most on ${topCategory.name} — ${fmt(topCategory.value)} this period.` : "No expense data available."
    },
    {
      icon: expenseDiff > 0 ? TrendingUp : TrendingDown,
      color: expenseDiff > 0 ? "var(--red)" : "var(--green)",
      bg: expenseDiff > 0 ? "var(--red-light)" : "var(--green-light)",
      title: "Monthly Expense Change",
      desc: `Expenses ${expenseDiff > 0 ? "increased" : "decreased"} by ${Math.abs(expenseDiff)}% compared to last month.`
    },
    {
      icon: incomeDiff > 0 ? TrendingUp : TrendingDown,
      color: incomeDiff > 0 ? "var(--green)" : "var(--red)",
      bg: incomeDiff > 0 ? "var(--green-light)" : "var(--red-light)",
      title: "Monthly Income Change",
      desc: `Income ${incomeDiff > 0 ? "rose" : "fell"} by ${Math.abs(incomeDiff)}% compared to last month.`
    },
    {
      icon: Zap, color: "var(--accent)", bg: "var(--accent-light)",
      title: "Savings Rate",
      desc: `You're saving ${savingsRate}% of your income. ${savingsRate >= 20 ? "Excellent financial discipline! 🎉" : savingsRate >= 10 ? "Good, aim for 20%+ savings." : "Consider reducing expenses."}`
    },
    {
      icon: AlertCircle, color: "var(--amber)", bg: "var(--amber-light)",
      title: "Housing Dominance",
      desc: `Housing is your largest fixed expense at ${fmt(22000)}/month. This is ${(22000 / summary.income * 100).toFixed(1)}% of your income.`
    },
    {
      icon: BarChart2, color: "var(--accent)", bg: "var(--accent-light)",
      title: "Best Month",
      desc: `February had the best savings ratio with ₹${(monthlyData.reduce((m, d) => d.balance > m.balance ? d : m)).balance.toLocaleString("en-IN")} saved.`
    }
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* KPI Row */}
      <div className="grid-3">
        {[
          { label: "Savings Rate", value: `${savingsRate}%`, color: Number(savingsRate) >= 20 ? "var(--green)" : "var(--amber)" },
          { label: "Avg Monthly Expense", value: fmt(monthlyData.reduce((s, m) => s + m.expenses, 0) / monthlyData.length), color: "var(--red)" },
          { label: "Avg Monthly Income", value: fmt(monthlyData.reduce((s, m) => s + m.income, 0) / monthlyData.length), color: "var(--green)" },
        ].map(item => (
          <div key={item.label} className="card fade-up" style={{ padding: 24 }}>
            <div style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 8 }}>{item.label}</div>
            <div className="mono" style={{ fontSize: 28, fontWeight: 700, color: item.color }}>{item.value}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid-2">
        {/* Category Radar */}
        <div className="card fade-up" style={{ padding: 24 }}>
          <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>Spending Profile</div>
          <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 16 }}>Category distribution radar</div>
          <ResponsiveContainer width="100%" height={240}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="var(--border)" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: "var(--text-muted)" }} />
              <Radar dataKey="value" stroke="#6C63FF" fill="#6C63FF" fillOpacity={0.25} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Top Categories Bar */}
        <div className="card fade-up" style={{ padding: 24 }}>
          <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>Category Spending</div>
          <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 16 }}>Top expense categories</div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={categorySpending.slice(0, 7)} layout="vertical" margin={{ left: 20 }}>
              <XAxis type="number" hide />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 12, fill: "var(--text-muted)" }} axisLine={false} tickLine={false} width={80} />
              <Tooltip formatter={(v) => fmt(v)} />
              <Bar dataKey="value" radius={[0, 6, 6, 0]} maxBarSize={28}>
                {categorySpending.slice(0, 7).map((entry) => (
                  <Cell key={entry.name} fill={categoryColors[entry.name] || "#6C63FF"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Insight Cards */}
      <div className="grid-2">
        {insights.map(({ icon: Icon, color, bg, title, desc }) => (
          <div key={title} className="card fade-up" style={{ padding: 20, display: "flex", gap: 16, alignItems: "flex-start" }}>
            <div style={{ width: 42, height: 42, borderRadius: 12, background: bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Icon size={20} color={color} />
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 6 }}>{title}</div>
              <div style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.6 }}>{desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
