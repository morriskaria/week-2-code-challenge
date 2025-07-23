import { useState } from "react";

function AddGoal() {
  const [goal, setGoal] = useState({
    name: '',
    targetAmount: '',
    category: 'Other',
    deadline: ''
  });
  
  const [goalsList, setGoalsList] = useState([]);

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
      ...goal,
      id: Date.now(),
      targetAmount: parseFloat(goal.targetAmount),
      savedAmount: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    setGoalsList(prev => [...prev, newGoal]);
    setGoal({
      name: '',
      targetAmount: '',
      category: 'Other',
      deadline: ''
    });
  };

  return (
    <div className="addbtn" style={{ maxWidth: '500px', margin: '0 auto' }}>
      <h2>Add New Goal</h2>
      <form onSubmit={handleSubmit} style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '10px',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '8px'
      }}>
        <label>
          Goal Name
          <input
            type="text"
            name="name"
            value={goal.name}
            onChange={handleChange}
            placeholder="Enter goal name"
            
          />
        </label>

        <label>
          Target Amount
          <input
            type="number"
            name="targetAmount"
            value={goal.targetAmount}
            onChange={handleChange}
            placeholder="Target amount"
            
            
          />
        </label>

        <label>
          Category
          <select
            name="category"
            value={goal.category}
            onChange={handleChange}
           
          >
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
        </label>

        <label>
          Deadline
          <input
            type="date"
            name="deadline"
            value={goal.deadline}
            onChange={handleChange}
            min={new Date().toISOString().split('T')[0]}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </label>

        <button 
          type="submit"
          
        >
          Add Goal
        </button>
      </form>

    </div>
  );
}

export default AddGoal;