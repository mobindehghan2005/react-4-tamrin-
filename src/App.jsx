import { useSelector } from "react-redux";
import { selectCurrentUser } from "./store/authSlice";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import Auth from "./components/Auth";
import { ExpenseProvider } from "./context/ExpenseContext";

function App() {
  const user = useSelector(selectCurrentUser);
  if (!user) return <Auth />;

  return (
    <ExpenseProvider key={user.id} userId={user.id}>
      <div className="app">
        <Header />
        <Dashboard />
      </div>
    </ExpenseProvider>
  );
}
export default App;
