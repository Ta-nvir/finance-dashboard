import React from "react";
import { AppProvider, useApp } from "./context/AppContext";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import Transactions from "./components/Transactions";
import Insights from "./components/Insights";
import "./index.css";

const AppInner = () => {
  const { activeTab, darkMode } = useApp();
  return (
    <div className={`app-root ${darkMode ? "dark" : ""}`}>
      <Sidebar />
      <div className="main-area">
        <Header />
        <main className="content-area">
          {activeTab === "dashboard" && <Dashboard />}
          {activeTab === "transactions" && <Transactions />}
          {activeTab === "insights" && <Insights />}
        </main>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppInner />
    </AppProvider>
  );
}
