import { useState } from "react";

function AddGoal({ onAddGoal }) {
  const [goal, setGoal] = useState({
    name: '',
    targetAmount: '',
    category: 'Other',
    deadline: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGoal(prev => ({
      ...prev,
      [name]: value
    }));
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newGoal = {
      name: goal.name,
      targetAmount: parseFloat(goal.targetAmount),
      savedAmount: 0,
      category: goal.category,
      deadline: goal.deadline,
      id: Date.now() 
    };

   
    fetch("http://localhost:3000/goals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newGoal)
    })
      .then(response => response.json())
      .then(savedGoal => { onAddGoal(savedGoal);
        setGoal({
          name: '',
          targetAmount: '',
          category: 'Other',
          deadline: ''
        });
      })
      
  };

  return (
    <div className="add-goal-form">
      <h2>Add New Goal</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Goal Name:</label>
          <input
            type="text"
            name="name"
            value={goal.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Target Amount ($):</label>
          <input
            type="number"
            name="targetAmount"
            value={goal.targetAmount}
            onChange={handleChange}
            
          />
        </div>

        <div className="form-group">
          <label>Category:</label>
          <select
            name="category"
            value={goal.category}
            onChange={handleChange}>
            <option value="Travel">Travel</option>
            <option value="Emergency">Emergency</option>
            <option value="Electronics">Electronics</option>
            <option value="Real Estate">Real Estate</option>
            <option value="Vehicle">Vehicle</option>
            <option value="Education">Education</option>
            <option value="Shopping">Shopping</option>
            <option value="Retirement">Retirement</option>
            <option value="Home">Home</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label>Deadline:</label>
          <input
            type="date"
            name="deadline"
            value={goal.deadline}
            onChange={handleChange}
            min={new Date().toISOString().split('T')[0]}
            required
          />
        </div>

        <button type="submit" className="submit-button">
          Add Goal
        </button>
      </form>
    </div>
  );
}

export default AddGoal;