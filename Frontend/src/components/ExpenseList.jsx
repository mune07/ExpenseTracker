import '../styles/ExpenseList.css';

function ExpenseList({ expenses, onEdit, onDelete, loading }) {
  const getCategoryIcon = (category) => {
    const icons = {
      Food: '🍔',
      Transport: '🚗',
      Entertainment: '🎬',
      Shopping: '🛍️',
      Bills: '💡',
      Health: '🏥',
      Education: '📚',
      Other: '📦'
    };
    return icons[category] || '📦';
  };

  const getCategoryColor = (category) => {
    const colors = {
      Food: '#FF6B6B',
      Transport: '#4ECDC4',
      Entertainment: '#FFE66D',
      Shopping: '#FF6B9D',
      Bills: '#C44569',
      Health: '#26de81',
      Education: '#4834DF',
      Other: '#95AFC0'
    };
    return colors[category] || '#95AFC0';
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="expense-list-container">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading expenses...</p>
        </div>
      </div>
    );
  }

  if (expenses.length === 0) {
    return (
      <div className="expense-list-container">
        <div className="no-expenses">
          <div className="empty-icon">📭</div>
          <h3>No Expenses Found</h3>
          <p>Start tracking your expenses by adding your first transaction!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="expense-list-container">
      <h2 className="list-title">📝 Recent Transactions</h2>
      <div className="expense-list">
        {expenses.map((expense) => (
          <div key={expense._id} className="expense-item">
            <div 
              className="expense-category-icon" 
              style={{ background: getCategoryColor(expense.category) }}
            >
              {getCategoryIcon(expense.category)}
            </div>
            
            <div className="expense-details">
              <div className="expense-header">
                <h4 className="expense-title">{expense.title}</h4>
                <span className="expense-amount">₹{expense.amount.toFixed(2)}</span>
              </div>
              
              <div className="expense-meta">
                <span className="expense-category">{expense.category}</span>
                <span className="expense-date">{formatDate(expense.date)}</span>
              </div>
              
              {expense.description && (
                <p className="expense-description">{expense.description}</p>
              )}
            </div>

            <div className="expense-actions">
              <button 
                className="action-btn edit-btn" 
                onClick={() => onEdit(expense)}
                title="Edit"
              >
                ✏️
              </button>
              <button 
                className="action-btn delete-btn" 
                onClick={() => onDelete(expense._id)}
                title="Delete"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExpenseList;