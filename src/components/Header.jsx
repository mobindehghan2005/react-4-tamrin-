import { useDispatch, useSelector } from "react-redux";
import { logoutUser, selectCurrentUser } from "../store/authSlice";

const Header = () => {
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  return (
    <header className="header">
      <div><h2>Expense Tracker</h2><p>Manage your money smarter</p></div>
      <div className="profile">
        <div className="avatar">{user?.name?.charAt(0).toUpperCase()}</div>
        <div><strong>{user?.name}</strong><span>Personal Account</span></div>
        <button type="button" className="logout-btn" onClick={() => dispatch(logoutUser())}>Logout</button>
      </div>
    </header>
  );
};
export default Header;
