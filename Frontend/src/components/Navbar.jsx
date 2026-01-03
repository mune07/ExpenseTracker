import '../styles/Navbar.css';
import { getCurrentUser } from '../services/auth';

function Navbar({ onAddClick, onLogout }) {
  const user = getCurrentUser();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <h1>💰 Expense Tracker</h1>
          {user && <span className="user-greeting">Hello, {user.name}!</span>}
        </div>
        <div className="navbar-actions">
          <button className="add-btn" onClick={onAddClick}>
            + Add Expense
          </button>
          <button className="logout-btn" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;