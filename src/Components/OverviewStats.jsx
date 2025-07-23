function OverviewStats({ goals }) {
  const totalSaved = goals.reduce((sum, goal) => sum + goal.savedAmount, 0);
  const totalTarget = goals.reduce((sum, goal) => sum + goal.targetAmount, 0);
  const completedGoals = goals.filter(g => g.savedAmount >= g.targetAmount).length;

  return (
    <div style={{
      padding: "15px",
      backgroundColor: "#f5f5f5",
      borderRadius: "8px",
      marginBottom: "20px"
    }}>
     
      <div style={{ display: "flex", gap: "20px" }}>
        <div>
          <strong>Total Goals:</strong> {goals.length}
        </div>
        <div>
          <strong>Total Saved:</strong> ${totalSaved.toFixed(2)}
        </div>
        <div>
          <strong>Completed:</strong> {completedGoals}
        </div>
        <div>
          <strong>Completion Rate:</strong> {((totalSaved / totalTarget) * 100).toFixed(1)}%
        </div>
      </div>
    </div>
  );
}
export default OverviewStats;