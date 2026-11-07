import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

export const store = configureStore({ reducer: { auth: authReducer } });
store.subscribe(() => {
  const { users, currentUserId } = store.getState().auth;
  localStorage.setItem("expense_users", JSON.stringify(users));
  localStorage.setItem("expense_current_user", JSON.stringify(currentUserId));
});
