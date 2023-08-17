import { Link } from "react-router-dom";
import { useState } from "react";
function Landing() {
  
  const {users, setUsers} =useState([
        {name:"Mona", color:"dodgerblue"},
        {name:"Jasmine", color:"indianred"},
        {name:"Aura", color:"mediumseagreen"},
        {name:"Tina", color:"goldenrod"}
    ])
    return (
    <div className="landing">
        <h3>WHO'S WATCHING?</h3>
        <div>
            <Link to="/catalog">
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