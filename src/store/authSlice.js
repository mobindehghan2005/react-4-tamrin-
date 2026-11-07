import { createSlice } from "@reduxjs/toolkit";

// A front-end-only exercise: users live in this browser's LocalStorage.
const load = (key, fallback) => {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
  catch { return fallback; }
};
const initialState = {
  users: load("expense_users", []),
  currentUserId: load("expense_current_user", null),
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerUser(state, action) {
      state.users.push(action.payload);
      state.currentUserId = action.payload.id;
    },
    loginUser(state, action) { state.currentUserId = action.payload; },
    logoutUser(state) { state.currentUserId = null; },
  },
});
export const { registerUser, loginUser, logoutUser } = authSlice.actions;
export const selectCurrentUser = (state) =>
  state.auth.users.find((user) => user.id === state.auth.currentUserId) ?? null;
export default authSlice.reducer;
