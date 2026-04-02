import React, { createContext, useContext, useState, useMemo } from "react";
import { transactions as initialTransactions } from "../data/mockData";

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [role, setRole] = useState("viewer"); // "viewer" | "admin"
  const [transactions, setTransactions] = useState(initialTransactions);
  const [darkMode, setDarkMode] = useState(false);
  const [filterType, setFilterType] = useState("all"); // all | income | expense
  const [filterCategory, setFilterCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState("date");
  const [sortDir, setSortDir] = useState("desc");
  const [activeTab, setActiveTab] = useState("dashboard"); // dashboard | transactions | insights

  const filteredTransactions = useMemo(() => {
    let txns = [...transactions];
    if (filterType !== "all") txns = txns.filter(t => t.type === filterType);
    if (filterCategory !== "all") txns = txns.filter(t => t.category === filterCategory);
    if (searchQuery) txns = txns.filter(t => t.description.toLowerCase().includes(searchQuery.toLowerCase()) || t.category.toLowerCase().includes(searchQuery.toLowerCase()));
    txns.sort((a, b) => {
      let aVal = a[sortField], bVal = b[sortField];
      if (sortField === "amount") { aVal = Math.abs(a.amount); bVal = Math.abs(b.amount); }
      if (sortField === "date") { aVal = new Date(a.date); bVal = new Date(b.date); }
      return sortDir === "asc" ? (aVal > bVal ? 1 : -1) : (aVal < bVal ? 1 : -1);
    });
    return txns;
  }, [transactions, filterType, filterCategory, searchQuery, sortField, sortDir]);

  const summary = useMemo(() => {
    const income = transactions.filter(t => t.type === "income").reduce((s, t) => s + t.amount, 0);
    const expenses = transactions.filter(t => t.type === "expense").reduce((s, t) => s + Math.abs(t.amount), 0);
    return { income, expenses, balance: income - expenses };
  }, [transactions]);

  const addTransaction = (txn) => {
    setTransactions(prev => [{ ...txn, id: Date.now() }, ...prev]);
  };

  const editTransaction = (id, updated) => {
    setTransactions(prev => prev.map(t => t.id === id ? { ...t, ...updated } : t));
  };

  const deleteTransaction = (id) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const categories = useMemo(() => {
    return [...new Set(transactions.map(t => t.category))];
  }, [transactions]);

  return (
    <AppContext.Provider value={{
      role, setRole,
      transactions, filteredTransactions,
      darkMode, setDarkMode,
      filterType, setFilterType,
      filterCategory, setFilterCategory,
      searchQuery, setSearchQuery,
      sortField, setSortField,
      sortDir, setSortDir,
      activeTab, setActiveTab,
      summary, categories,
      addTransaction, editTransaction, deleteTransaction
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
