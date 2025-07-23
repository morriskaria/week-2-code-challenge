function DepositForm(){
return<>
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
</>
}
export default DepositForm