import '../styles/Dashboard.css';

function Dashboard({ stats, expenses }) {
  const totalExpenses = stats.totalExpense || 0;
  const expenseCount = expenses.length;
  const avgExpense = expenseCount > 0 ? (totalExpenses / expenseCount).toFixed(2) : 0;
  
  const currentMonth = new Date().toLocaleString('default', { month: 'long' });
  
  const getHighestCategory = () => {
    if (stats.categoryStats.length === 0) return 'N/A';
    const highest = stats.categoryStats.reduce((prev, current) => 
      (prev.total > current.total) ? prev : current
    );
    return highest._id;
  };

  return (
    <div className="dashboard">
      <div className="stats-grid">
        <div className="stat-card stat-card-primary">
          <div className="stat-icon">💵</div>
          <div className="stat-info">
            <h3>Total Expenses</h3>
            <p className="stat-value">₹{totalExpenses.toFixed(2)}</p>
            <span className="stat-label">{currentMonth}</span>
          </div>
        </div>

        <div className="stat-card stat-card-success">
          <div className="stat-icon">📊</div>
          <div className="stat-info">
            <h3>Total Transactions</h3>
            <p className="stat-value">{expenseCount}</p>
            <span className="stat-label">All time</span>
          </div>
        </div>

        <div className="stat-card stat-card-warning">
          <div className="stat-icon">💰</div>
          <div className="stat-info">
            <h3>Average Expense</h3>
            <p className="stat-value">₹{avgExpense}</p>
            <span className="stat-label">Per transaction</span>
          </div>
        </div>

        <div className="stat-card stat-card-info">
          <div className="stat-icon">🏆</div>
          <div className="stat-info">
            <h3>Top Category</h3>
            <p className="stat-value">{getHighestCategory()}</p>
            <span className="stat-label">Highest spending</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;