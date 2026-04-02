export const transactions = [
  { id: 1, date: "2024-03-28", description: "Salary", category: "Income", type: "income", amount: 85000 },
  { id: 2, date: "2024-03-27", description: "Netflix Subscription", category: "Entertainment", type: "expense", amount: -649 },
  { id: 3, date: "2024-03-26", description: "Grocery Store", category: "Food", type: "expense", amount: -3200 },
  { id: 4, date: "2024-03-25", description: "Uber Ride", category: "Transport", type: "expense", amount: -420 },
  { id: 5, date: "2024-03-24", description: "Freelance Project", category: "Income", type: "income", amount: 12000 },
  { id: 6, date: "2024-03-23", description: "Electricity Bill", category: "Utilities", type: "expense", amount: -1800 },
  { id: 7, date: "2024-03-22", description: "Dinner - Barbeque Nation", category: "Food", type: "expense", amount: -2100 },
  { id: 8, date: "2024-03-21", description: "Amazon Shopping", category: "Shopping", type: "expense", amount: -4500 },
  { id: 9, date: "2024-03-20", description: "Mutual Fund Return", category: "Income", type: "income", amount: 3200 },
  { id: 10, date: "2024-03-19", description: "Gym Membership", category: "Health", type: "expense", amount: -2000 },
  { id: 11, date: "2024-03-18", description: "Petrol", category: "Transport", type: "expense", amount: -1500 },
  { id: 12, date: "2024-03-17", description: "Book Purchase", category: "Education", type: "expense", amount: -850 },
  { id: 13, date: "2024-03-15", description: "Salary Bonus", category: "Income", type: "income", amount: 10000 },
  { id: 14, date: "2024-03-14", description: "Water Bill", category: "Utilities", type: "expense", amount: -350 },
  { id: 15, date: "2024-03-13", description: "Swiggy Order", category: "Food", type: "expense", amount: -580 },
  { id: 16, date: "2024-03-12", description: "Movie Tickets", category: "Entertainment", type: "expense", amount: -800 },
  { id: 17, date: "2024-03-10", description: "Doctor Visit", category: "Health", type: "expense", amount: -1200 },
  { id: 18, date: "2024-03-08", description: "Rent", category: "Housing", type: "expense", amount: -22000 },
  { id: 19, date: "2024-03-05", description: "Stock Dividend", category: "Income", type: "income", amount: 4500 },
  { id: 20, date: "2024-03-02", description: "Clothes Shopping", category: "Shopping", type: "expense", amount: -3800 },
  { id: 21, date: "2024-02-28", description: "Salary", category: "Income", type: "income", amount: 85000 },
  { id: 22, date: "2024-02-25", description: "Grocery Store", category: "Food", type: "expense", amount: -2900 },
  { id: 23, date: "2024-02-22", description: "Internet Bill", category: "Utilities", type: "expense", amount: -999 },
  { id: 24, date: "2024-02-20", description: "Freelance Project", category: "Income", type: "income", amount: 8000 },
  { id: 25, date: "2024-02-18", description: "Rent", category: "Housing", type: "expense", amount: -22000 },
  { id: 26, date: "2024-02-15", description: "Uber Eats", category: "Food", type: "expense", amount: -450 },
  { id: 27, date: "2024-02-12", description: "Electronics", category: "Shopping", type: "expense", amount: -8500 },
  { id: 28, date: "2024-02-10", description: "Stock Dividend", category: "Income", type: "income", amount: 3000 },
  { id: 29, date: "2024-02-08", description: "Mobile Recharge", category: "Utilities", type: "expense", amount: -299 },
  { id: 30, date: "2024-02-05", description: "Gym Membership", category: "Health", type: "expense", amount: -2000 },
];

export const monthlyData = [
  { month: "Oct", income: 95000, expenses: 48000, balance: 47000 },
  { month: "Nov", income: 92000, expenses: 52000, balance: 40000 },
  { month: "Dec", income: 110000, expenses: 68000, balance: 42000 },
  { month: "Jan", income: 88000, expenses: 45000, balance: 43000 },
  { month: "Feb", income: 96000, expenses: 51000, balance: 45000 },
  { month: "Mar", income: 114700, expenses: 49747, balance: 64953 },
];

export const categoryColors = {
  Income: "#10b981",
  Food: "#f59e0b",
  Transport: "#3b82f6",
  Entertainment: "#8b5cf6",
  Utilities: "#06b6d4",
  Shopping: "#ec4899",
  Health: "#ef4444",
  Housing: "#6366f1",
  Education: "#84cc16",
};

export const getCategorySpending = (txns) => {
  const map = {};
  txns.filter(t => t.type === "expense").forEach(t => {
    map[t.category] = (map[t.category] || 0) + Math.abs(t.amount);
  });
  return Object.entries(map).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);
};
