import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '../styles/Charts.css';

function Charts({ categoryStats }) {
  const COLORS = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe', '#43e97b', '#38f9d7'];

  const pieData = categoryStats.map(stat => ({
    name: stat._id,
    value: stat.total
  }));

  const barData = categoryStats.map(stat => ({
    category: stat._id,
    amount: stat.total,
    count: stat.count
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-label">{payload[0].name || payload[0].payload.category}</p>
          <p className="tooltip-value">₹{payload[0].value.toFixed(2)}</p>
          {payload[0].payload.count && (
            <p className="tooltip-count">{payload[0].payload.count} transactions</p>
          )}
        </div>
      );
    }
    return null;
  };

  if (categoryStats.length === 0) {
    return (
      <div className="charts-container">
        <div className="no-data">
          <p>📊 No expense data available. Add some expenses to see charts!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="charts-container">
      <div className="chart-card">
        <h3 className="chart-title">📊 Expense Distribution by Category</h3>
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          <Tooltip content={CustomTooltip} />

          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-card">
        <h3 className="chart-title">📈 Category-wise Spending</h3>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="category" stroke="#666" />
            <YAxis stroke="#666" />
        
            <Tooltip content={CustomTooltip} />

            <Legend />
            <Bar dataKey="amount" fill="#667eea" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Charts;