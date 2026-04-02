# FinTrack — Finance Dashboard UI

A clean, interactive finance dashboard built with **React**, **Tailwind-inspired CSS**, and **Recharts**.

---

## 🚀 Setup Instructions

### Prerequisites
- Node.js v16+
- npm or yarn

### Install & Run

```bash
# Install dependencies
npm install

# Start development server
npm start
```

App opens at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

---

## 🧩 Features

### 1. Dashboard Overview
- **Summary Cards**: Total Balance, Income, Expenses
- **Balance Trend**: Area chart showing 6-month income vs expenses
- **Spending Breakdown**: Donut/Pie chart by category
- **Monthly Comparison**: Grouped bar chart
- **Recent Transactions**: Live feed of latest activity

### 2. Transactions Section
- Full transaction table with Date, Description, Category, Type, Amount
- **Search** by description or category
- **Filter** by type (income/expense) and category
- **Sort** by any column (asc/desc)
- **Export to CSV**
- Admin-only: **Add / Edit / Delete** transactions

### 3. Role-Based UI (Simulated RBAC)
- **Viewer**: Read-only mode — can browse and filter data
- **Admin**: Full access — add, edit, delete transactions
- Switch roles via the header toggle (no login required, frontend simulation)

### 4. Insights Section
- Savings rate KPI
- Average monthly income & expense
- Spending Profile Radar Chart
- Top categories horizontal bar chart
- 6 auto-generated insight cards: top spending category, monthly comparison, savings advice, etc.

### 5. State Management
- Uses React **Context API** (`AppContext`)
- State includes: transactions, filters, search query, sort config, active role, dark mode
- All filtering and sorting done via `useMemo` for performance

### 6. UI/UX
- **Dark mode** toggle in header
- Responsive layout (sidebar collapses on mobile)
- Custom design system with CSS variables
- Smooth fade-up animations on page load
- Empty state handling in transactions table
- Monospaced font (JetBrains Mono) for all financial values

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Dashboard.jsx     # Overview page with charts & summary
│   ├── Header.jsx        # Top bar with role switcher & dark mode
│   ├── Insights.jsx      # Analytics & insight cards
│   ├── Sidebar.jsx       # Navigation sidebar
│   └── Transactions.jsx  # Transaction table with CRUD
├── context/
│   └── AppContext.jsx    # Global state (Context API)
├── data/
│   └── mockData.js       # Static mock transactions & chart data
├── App.jsx               # Root component
├── index.css             # Design system & global styles
└── index.js              # Entry point
```

---

## 🎨 Design Choices

- **Font**: Sora (UI) + JetBrains Mono (numbers)
- **Color**: Purple accent (#6C63FF), semantic green/red for income/expense
- **Charts**: Recharts (AreaChart, BarChart, PieChart, RadarChart)
- **No external UI library** — all components hand-crafted with CSS variables

---

## 🔧 Tech Stack

| Layer | Tech |
|---|---|
| Framework | React 18 |
| State | Context API + useState/useMemo |
| Charts | Recharts |
| Icons | Lucide React |
| Styling | Custom CSS (CSS Variables, Flexbox, Grid) |
| Data | Static mock data (no backend) |
