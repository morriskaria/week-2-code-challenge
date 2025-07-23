import { Outlet, useNavigate } from "react-router-dom";
import OverviewStats from "./OverviewStats";

function GoalDashboard({ goalsComponents }) {
  const navigate = useNavigate();

  return (
    <div className="dashboard">
      <h1>Your Goals</h1>
      <button 
        onClick={() => navigate('/add-goal')} 
        className="add-goal-btn"
      >
        Home
      </button>
      <div className="goals-list">
        {goalsComponents}
      </div>
      <Outlet />
    </div>
  );
}

export default GoalDashboard;