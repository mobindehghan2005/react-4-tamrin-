
import { useEffect, useState } from "react";
import { ExpenseContext } from "./ExpenseState";

const defaults = [
  "Food",
  "Transport",
  "Bills",
  "Entertainment",
  "Shopping",
  "Health",
  "Salary",
  "Other",
];

const load = (key, fallback) => {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
};

export const ExpenseProvider = ({ children, userId }) => {
  const transactionKey = `expense_transactions_${userId}`;
  const categoryKey = `expense_categories_${userId}`;

  const [transactions, setTransactions] = useState(() =>
    load(transactionKey, [])
  );

  const [categories, setCategories] = useState(() =>
    load(categoryKey, defaults)
  );

  useEffect(() => {
    localStorage.setItem(
      transactionKey,
      JSON.stringify(transactions)
    );
  }, [transactionKey, transactions]);

  useEffect(() => {
    localStorage.setItem(
      categoryKey,
      JSON.stringify(categories)
    );
  }, [categoryKey, categories]);

  const addTransaction = (transaction) => {
    setTransactions((prev) => [
      {
        ...transaction,
        id: crypto.randomUUID(),
      },
      ...prev,
    ]);
  };

  const deleteTransaction = (id) => {
    setTransactions((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  const addCategory = (category) => {
    const trimmed = category.trim();

    if (trimmed) {
      setCategories((prev) =>
        prev.includes(trimmed)
          ? prev
          : [...prev, trimmed]
      );
    }
  };

  const income = transactions
    .filter((item) => item.type === "income")
    .reduce((sum, item) => sum + Number(item.amount), 0);

  const expense = transactions
    .filter((item) => item.type === "expense")
    .reduce((sum, item) => sum + Number(item.amount), 0);

  const balance = income - expense;

  return (
    <ExpenseContext.Provider
      value={{
        transactions,
        categories,
        addTransaction,
        deleteTransaction,
        addCategory,
        income,
        expense,
        balance,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};
