function GoalTitle({ goalsTitle, id, onDelete }) {
   function handleDelete() {
    console.log(`Deleting goal: ${goalsTitle}`);
    onDelete(id);
  }

  return (
    <div className="goal-title-card">
      <h2 style={{
        backgroundColor: '#590d4fff'
        }}>{goalsTitle}</h2>
      <button 
        onClick={handleDelete}
        style={{
          backgroundColor: '#9e0a0aff',}}>
        Delete goal
      </button>
    </div>
  );
}

export default GoalTitle;