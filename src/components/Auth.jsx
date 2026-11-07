import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "../store/authSlice";

const Auth = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.auth.users);
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = (event) => {
    event.preventDefault();
    setError("");
    const normalized = email.trim().toLowerCase();
    if (mode === "signup") {
      if (!name.trim() || password.length < 6) {
        setError("Enter your name and a password of at least 6 characters.");
        return;
      }
      if (users.some((user) => user.email === normalized)) {
        setError("This email is already registered.");
        return;
      }
      dispatch(registerUser({ id: crypto.randomUUID(), name: name.trim(), email: normalized, password }));
      return;
    }
    const user = users.find((item) => item.email === normalized && item.password === password);
    if (!user) { setError("Incorrect email or password."); return; }
    dispatch(loginUser(user.id));
  };

  return (
    <main className="auth-screen">
      <section className="auth-card">
        <div className="auth-logo">💰</div>
        <h1>Expense Tracker</h1>
        <p>Manage your money smarter</p>
        <div className="auth-tabs">
          <button type="button" className={mode === "login" ? "selected" : ""} onClick={() => { setMode("login"); setError(""); }}>Login</button>
          <button type="button" className={mode === "signup" ? "selected" : ""} onClick={() => { setMode("signup"); setError(""); }}>Sign Up</button>
        </div>
        <form onSubmit={submit} className="auth-form">
          {mode === "signup" && <><label>Full Name</label><input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" /></>}
          <label>Email</label>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
          <label>Password</label>
          <input type="password" required minLength={mode === "signup" ? 6 : 1} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
          {error && <p className="auth-error" role="alert">{error}</p>}
          <button className="auth-submit" type="submit">{mode === "login" ? "Login" : "Create Account"}</button>
        </form>
        <small>Demo for coursework only — no backend or secure authentication.</small>
      </section>
    </main>
  );
};
export default Auth;
