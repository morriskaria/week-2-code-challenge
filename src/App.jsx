import { useState, useEffect } from "react";
import GoalTitle from "./Components/GoalTitle";
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import GoalDashboard from "./Components/GoalDashboard";
import GoalsDetails from "./Components/GoalDetails";
import AddGoal from "./Components/AddGoal";
import "./App.css"


function App() {
  const [goals, setGoals] = useState([]);
  const navigate = useNavigate();
  const [depositData, setDepositData] = useState({
    goalId: '',
    amount: ''
  });

  useEffect(() => {
    fetch("http://localhost:3000/goals")
      .then((response) => response.json()) 
      .then((data) => setGoals(data))
  }, []);

  function handleAddGoal(newGoal) {
    fetch("http://localhost:3000/goals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newGoal),
    })
      .then((response) => response.json())
      .then((data) => setGoals([...goals, data]));
  }

  const handleDeleteGoal = (goalId) => {
    fetch(`http://localhost:3000/goals/${goalId}`, {
      method: "DELETE",
    })
      .then(response => {
        if (response.ok) {
          setGoals(goals.filter(goal => goal.id !== goalId));
        }
      })
      .catch(error => console.error("Error deleting goal:", error));
  };

  const handleDeposit = (e) => {
    e.preventDefault();
    
    const updatedAmount = goal.savedAmount + parseFloat(depositData.amount);

    fetch(`http://localhost:3000/goals/${depositData.goalId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ savedAmount: updatedAmount }),
    })
      .then((response) => response.json())
      .then((updatedGoal) => {
        setGoals(goals.map(g => g.id === updatedGoal.id ? updatedGoal : g));
        setDepositData({ goalId: '', amount: '' });
      });
  };

  const handleDepositChange = (e) => {
    const { name, value } = e.target;
    setDepositData(prev => ({
      ...prev, [name]: value
    }));
  };

  const goalsComponents = goals.map((goal) => (
    <div key={goal.id}>
      <GoalTitle 
        goalsTitle={goal.name} 
        id={goal.id} 
        onDelete={handleDeleteGoal}
        goalsTarget={goal.targetAmount}
        savedAmount={goal.savedAmount}  
        deadline={goal.deadline}       
        category={goal.category}      
      />
      <p>Current Amount: {goal.savedAmount}</p> 
      <p>Target Amount: {goal.targetAmount}</p>
      <p>Target Date: {goal.deadline}</p>
      <p>Progress: {(goal.savedAmount / goal.targetAmount * 100).toFixed(2)}%</p>
      <p>Category: {goal.category}</p>     
    </div>
  ));

  return (
    <div className="app-container">
      <header>
        <h1 className="mainheader">Smart Goal Planner</h1>
        <nav>
          <button onClick={() => navigate('/goals')}>View Goals</button>
          <button onClick={() => navigate('/add-goal')}>Add New Goal</button>
        </nav>
      </header>
      
      <div className="depositbtn" style={{ 
        padding: '20px', 
        margin: '20px 0',
        border: '1px solid #ddd',
        borderRadius: '8px'
      }}>
        <h2>Make a Deposit</h2>
        <form onSubmit={handleDeposit}>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="goalId" style={{ display: 'block', marginBottom: '5px' }}>Select Goal:</label>
            <select
              id="goalId"
              name="goalId"
              value={depositData.goalId}
              onChange={handleDepositChange}
              style={{ width: '100%', padding: '8px' }}
              required
            >
              <option value="">Select a goal</option>
              {goals.map(goal => (
                <option key={goal.id} value={goal.id}>
                  {goal.name} (Current: ${goal.savedAmount})
                </option>
              ))}
            </select>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="amount" style={{ display: 'block', marginBottom: '5px' }}>Amount:</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={depositData.amount}
              onChange={handleDepositChange}
              min="0.01"
              step="0.01"
              style={{ width: '100%', padding: '8px' }}
              required
            />
          </div>
          <button 
            type="submit"
            style={{
              padding: '10px 15px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Make Deposit
          </button>
        </form>
      </div>
      
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/goals" replace />} />
          <Route path='/goals' element={<GoalDashboard goalsComponents={goalsComponents} />}>
            <Route path='details/:goalId' element={<GoalsDetails goals={goals} />} />
          </Route>
          <Route path='/add-goal' element={<AddGoal onAddGoal={handleAddGoal} />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;