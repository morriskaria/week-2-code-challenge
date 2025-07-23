function GoalTitle({ goalsTitle }) {
  return (
    <div className="goal-title-card">
      <h2>{goalsTitle}</h2>
      <button>Delete goal</button>
    </div>
  );
}

export default GoalTitle;
