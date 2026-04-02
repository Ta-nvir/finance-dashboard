import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { Search, Filter, Plus, Pencil, Trash2, TrendingUp, TrendingDown, ChevronUp, ChevronDown, X, Check } from "lucide-react";

const fmt = (n) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

const CATEGORIES = ["Income", "Food", "Transport", "Entertainment", "Utilities", "Shopping", "Health", "Housing", "Education"];

const emptyForm = { description: "", amount: "", category: "Food", type: "expense", date: new Date().toISOString().split("T")[0] };

export default function Transactions() {
  const {
    role, filteredTransactions, categories,
    filterType, setFilterType,
    filterCategory, setFilterCategory,
    searchQuery, setSearchQuery,
    sortField, setSortField, sortDir, setSortDir,
    addTransaction, editTransaction, deleteTransaction
  } = useApp();

  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const isAdmin = role === "admin";

  const handleSort = (field) => {
    if (sortField === field) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortField(field); setSortDir("desc"); }
  };

  const SortIcon = ({ field }) => {
    if (sortField !== field) return <ChevronUp size={12} style={{ opacity: 0.3 }} />;
    return sortDir === "asc" ? <ChevronUp size={12} /> : <ChevronDown size={12} />;
  };

  const handleSubmit = () => {
    if (!form.description || !form.amount) return;
    const txn = { ...form, amount: form.type === "expense" ? -Math.abs(Number(form.amount)) : Math.abs(Number(form.amount)) };
    if (editId) { editTransaction(editId, txn); setEditId(null); }
    else addTransaction(txn);
    setForm(emptyForm); setShowForm(false);
  };

  const startEdit = (txn) => {
    setForm({ description: txn.description, amount: Math.abs(txn.amount), category: txn.category, type: txn.type, date: txn.date });
    setEditId(txn.id); setShowForm(true);
  };

  const exportCSV = () => {
    const rows = [["Date", "Description", "Category", "Type", "Amount"],
      ...filteredTransactions.map(t => [t.date, t.description, t.category, t.type, t.amount])];
    const blob = new Blob([rows.map(r => r.join(",")).join("\n")], { type: "text/csv" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "transactions.csv"; a.click();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Controls */}
      <div className="card" style={{ padding: 20 }}>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
          {/* Search */}
          <div style={{ position: "relative", flex: "1 1 200px" }}>
            <Search size={15} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
            <input placeholder="Search transactions..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
              style={{ width: "100%", paddingLeft: 36 }} />
          </div>

          {/* Type filter */}
          <select value={filterType} onChange={e => setFilterType(e.target.value)} style={{ flex: "0 0 140px" }}>
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          {/* Category filter */}
          <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)} style={{ flex: "0 0 160px" }}>
            <option value="all">All Categories</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>

          <button className="btn btn-ghost" onClick={exportCSV} style={{ marginLeft: "auto" }}>Export CSV</button>
          {isAdmin && (
            <button className="btn btn-primary" onClick={() => { setShowForm(true); setEditId(null); setForm(emptyForm); }}>
              <Plus size={15} /> Add Transaction
            </button>
          )}
        </div>
      </div>

      {/* Add/Edit Form */}
      {showForm && isAdmin && (
        <div className="card fade-up" style={{ padding: 24 }}>
          <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 16 }}>{editId ? "Edit Transaction" : "New Transaction"}</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 12 }}>
            <input placeholder="Description" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
            <input type="number" placeholder="Amount (₹)" value={form.amount} onChange={e => setForm(f => ({ ...f, amount: e.target.value }))} />
            <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value, category: e.target.value === "income" ? "Income" : f.category }))}>
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
            <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
            <input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
            <button className="btn btn-primary" onClick={handleSubmit}><Check size={14} /> {editId ? "Save" : "Add"}</button>
            <button className="btn btn-ghost" onClick={() => { setShowForm(false); setEditId(null); }}><X size={14} /> Cancel</button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="card" style={{ overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                {[["date", "Date"], ["description", "Description"], ["category", "Category"], ["type", "Type"], ["amount", "Amount"]].map(([field, label]) => (
                  <th key={field} onClick={() => handleSort(field)} style={{
                    padding: "14px 20px", textAlign: "left", fontSize: 12, fontWeight: 600,
                    color: "var(--text-muted)", cursor: "pointer", whiteSpace: "nowrap",
                    userSelect: "none"
                  }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      {label} <SortIcon field={field} />
                    </span>
                  </th>
                ))}
                {isAdmin && <th style={{ padding: "14px 20px", fontSize: 12, fontWeight: 600, color: "var(--text-muted)" }}>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.length === 0 ? (
                <tr><td colSpan={6} style={{ padding: 48, textAlign: "center", color: "var(--text-muted)" }}>No transactions found.</td></tr>
              ) : filteredTransactions.map((txn, i) => (
                <tr key={txn.id} style={{
                  borderBottom: "1px solid var(--border)",
                  background: i % 2 === 0 ? "transparent" : "var(--surface2)",
                  transition: "background 0.15s"
                }}>
                  <td style={{ padding: "14px 20px", fontSize: 13, color: "var(--text-muted)", fontFamily: "JetBrains Mono, monospace" }}>
                    {new Date(txn.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                  </td>
                  <td style={{ padding: "14px 20px", fontSize: 14, fontWeight: 500 }}>{txn.description}</td>
                  <td style={{ padding: "14px 20px" }}>
                    <span style={{
                      padding: "3px 10px", borderRadius: 999, fontSize: 12, fontWeight: 600,
                      background: "var(--accent-light)", color: "var(--accent)"
                    }}>{txn.category}</span>
                  </td>
                  <td style={{ padding: "14px 20px" }}>
                    <span className={`badge badge-${txn.type}`}>{txn.type}</span>
                  </td>
                  <td style={{ padding: "14px 20px" }}>
                    <span className="mono" style={{ fontSize: 14, fontWeight: 600, color: txn.type === "income" ? "var(--green)" : "var(--red)" }}>
                      {txn.type === "income" ? "+" : "-"}{fmt(Math.abs(txn.amount))}
                    </span>
                  </td>
                  {isAdmin && (
                    <td style={{ padding: "14px 20px" }}>
                      <div style={{ display: "flex", gap: 6 }}>
                        <button onClick={() => startEdit(txn)} style={{
                          padding: "6px 10px", borderRadius: 7, border: "1px solid var(--border)",
                          background: "transparent", cursor: "pointer", color: "var(--text-muted)", display: "flex", alignItems: "center"
                        }}><Pencil size={13} /></button>
                        <button onClick={() => deleteTransaction(txn.id)} style={{
                          padding: "6px 10px", borderRadius: 7, border: "none",
                          background: "var(--red-light)", cursor: "pointer", color: "var(--red)", display: "flex", alignItems: "center"
                        }}><Trash2 size={13} /></button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ padding: "12px 20px", borderTop: "1px solid var(--border)", fontSize: 12, color: "var(--text-muted)" }}>
          Showing {filteredTransactions.length} transaction{filteredTransactions.length !== 1 ? "s" : ""}
          {role === "viewer" && <span style={{ marginLeft: 12, color: "var(--amber)" }}>👁 View-only mode</span>}
        </div>
      </div>
    </div>
  );
}
