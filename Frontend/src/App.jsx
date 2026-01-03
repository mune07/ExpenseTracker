/* eslint-disable */
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'
import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'
import Charts from './components/Charts'
import Filter from './components/Filter'
import Login from './components/Login'
import Register from './components/Register'
import { getAllExpenses, getExpenseStats, createExpense, updateExpense, deleteExpense } from './services/api'
import { login, register, logout, isAuthenticated } from './services/auth'

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [expenses, setExpenses] = useState([]);
  const [stats, setStats] = useState({ categoryStats: [], totalExpense: 0 });
  const [showForm, setShowForm] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    category: 'All'
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated()) {
      setIsAuth(true);
    }
  }, []);

  useEffect(() => {
    if (isAuth) {
      fetchExpenses();
      fetchStats();
    }
  }, [filters, isAuth]);

  const fetchExpenses = async () => {
    setLoading(true);
    try {
      const data = await getAllExpenses(filters);
      setExpenses(data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
      if (error.response?.status === 401) {
        handleLogout();
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const data = await getExpenseStats(filters);
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
      if (error.response?.status === 401) {
        handleLogout();
      }
    }
  };

  const handleLogin = async (credentials) => {
    await login(credentials);
    setIsAuth(true);
  };

  const handleRegister = async (userData) => {
    await register(userData);
    setIsAuth(true);
  };

  const handleLogout = () => {
    logout();
    setIsAuth(false);
    setExpenses([]);
    setStats({ categoryStats: [], totalExpense: 0 });
    setShowForm(false);
    setEditingExpense(null);
  };

  const handleAddExpense = async (expenseData) => {
    try {
      await createExpense(expenseData);
      fetchExpenses();
      fetchStats();
      setShowForm(false);
    } catch (error) {
      console.error('Error adding expense:', error);
      alert('Failed to add expense');
    }
  };

  const handleUpdateExpense = async (expenseData) => {
    try {
      await updateExpense(editingExpense._id, expenseData);
      fetchExpenses();
      fetchStats();
      setEditingExpense(null);
      setShowForm(false);
    } catch (error) {
      console.error('Error updating expense:', error);
      alert('Failed to update expense');
    }
  };

  const handleDeleteExpense = async (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      try {
        await deleteExpense(id);
        fetchExpenses();
        fetchStats();
      } catch (error) {
        console.error('Error deleting expense:', error);
        alert('Failed to delete expense');
      }
    }
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingExpense(null);
  };

  if (!isAuth) {
    return (
      <>
        {showLogin ? (
          <Login 
            onLogin={handleLogin} 
            onSwitchToRegister={() => setShowLogin(false)} 
          />
        ) : (
          <Register 
            onRegister={handleRegister} 
            onSwitchToLogin={() => setShowLogin(true)} 
          />
        )}
      </>
    );
  }

  return (
    <div className="app">
      <Navbar onAddClick={() => setShowForm(true)} onLogout={handleLogout} />
      
      <div className="container">
        <Filter filters={filters} setFilters={setFilters} />
        
        <Dashboard stats={stats} expenses={expenses} />
        
        <Charts categoryStats={stats.categoryStats} />
        
        <ExpenseList 
          expenses={expenses} 
          onEdit={handleEdit}
          onDelete={handleDeleteExpense}
          loading={loading}
        />
      </div>

      {showForm && (
        <ExpenseForm
          onSubmit={editingExpense ? handleUpdateExpense : handleAddExpense}
          onClose={handleCloseForm}
          initialData={editingExpense}
        />
      )}
    </div>
  )
}

export default App