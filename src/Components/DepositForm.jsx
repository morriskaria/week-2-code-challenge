function DepositForm(){

  
return<>
 <div className="depositbtn">
        <h2>Make a Deposit</h2>
        <form onSubmit={handleDeposit}>
          <div>
            <label className="goalId">Select Goal:</label>
            <select
              id="goalId"
              name="goalId"
              value={depositData.goalId}
              onChange={handleDepositChange} >

              <option value="">Select a goal</option>
              {goals.map(goal => (
                <option key={goal.id} value={goal.id}>
                  {goal.name} (Current: ${goal.savedAmount})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className ="amount" style={{ display: 'block', marginBottom: '5px' }}>Amount:</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={depositData.amount}
              onChange={handleDepositChange}/>
          </div>
          <button type="submit">
            Make Deposit
          </button>
        </form>
      </div>
</>
}
export default DepositForm