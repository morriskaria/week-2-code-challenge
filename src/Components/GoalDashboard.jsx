import { Outlet, useNavigate } from "react-router-dom";



function GoalDashboard({ goalsComponents, }) {
  const navigate = useNavigate();

  function GoalDetails(){
  return<>
  <h1>{goalsComponents}</h1>
  </>
}


  return (
    <div className="dashboard">
      <h1>Your Goals</h1>
      <button 
        onClick={() => navigate('/add-goal')} 
        className="add-goal-btn">Back</button>
      
      <Outlet />
      {goalsComponents}
    </div>
  );
}

export default GoalDashboard;