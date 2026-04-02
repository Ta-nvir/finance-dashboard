import React, { useState, useEffect } from "react";
import { AppProvider, useApp } from "./context/AppContext";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import Transactions from "./components/Transactions";
import Insights from "./components/Insights";
import "./index.css";

const AppInner = () => {
  const { activeTab, darkMode } = useApp();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={`app-root ${darkMode ? "dark" : ""}`}>
      <Sidebar />
      <div className="main-area" style={{ marginLeft: isMobile ? 0 : 240 }}>
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
