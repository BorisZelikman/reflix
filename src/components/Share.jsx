import {useState} from "react"
function Share({users, userIndex, shareTo}) {
    const [amount, setAmount] = useState(2);
    return ( 
    <div className="landing">
      <h4>{users[userIndex].name}, which budget is ${users[userIndex].budget} shares</h4>
      <div>
        <span>$</span>
        <input type="number" max = {users[userIndex].budget} value={amount} onChange={(e)=>setAmount(e.target.value)}></input>
      </div>
      
      <h4>to:</h4>
      {users.map((user, i)=>user !== users[userIndex] && (
        <button style={{backgroundColor:user.color}} className="shareBtn" onClick={()=>shareTo(i,amount)}>{user.name}</button>
      )
       )} 
    </div> );
}

export default Share;