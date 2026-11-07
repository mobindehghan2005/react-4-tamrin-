
import { createContext, useContext } from "react";

export const ExpenseContext = createContext(null);

export const useExpenses = () => {
  const context = useContext(ExpenseContext);

  if (!context) {
    throw new Error(
      "useExpenses must be used inside ExpenseProvider"
    );
  }

  return context;
};
