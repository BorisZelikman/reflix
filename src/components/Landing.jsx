import { Link } from "react-router-dom";
function Landing({users, selectUser}) {
    return (
    <div className="landing">
        <h3>WHO'S WATCHING?</h3>
        <div className="center-container">
             {users.map((user)=>
                <Link to={`/catalog`} key={user.name} >
                    <div 
                        className="persone" 
                        style={{backgroundColor:user.color}} 
                        onClick={(event)=>{
                            console.log("Landing: ",{user})
                            selectUser(user)}}>
                    {user.name}</div>
                </Link>     
            )} 
        </div>
    </div>
    );
}

export default Landing;