import { Link } from "react-router-dom";
import { useState } from "react";
function Landing({users}) {
    return (
    <div className="landing">
        <h3>WHO'S WATCHING?</h3>
        <div className="center-container">
             {users.map((user)=>
                <Link to={`/catalog/${user.name}`}>
                    <div id={user.name} className="persone" style={{BackgroundColor:user.color}}>{user.name}</div>
                </Link>     
            )} 
            <Link to={`/catalog/Mona`}>
                <div id="Mona" className="persone">Mona</div>
            </Link>     
            <div id="Jasmine" className="persone">Jasmine</div>
            <div id="Aura" className="persone">Aura</div>
            <div id="Tina" className="persone">Tina</div>
        </div>
    </div>
    );
}

export default Landing;