import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function Navbar() {
    return (  
        <div className="navbar">
            <Link to="/">
                <span className="link">Home</span>
            </Link>
            <Link to="/catalog">
                <span className="link">Catalog</span>
            </Link>
            <Link to="/">
                <span className="logo">REFLIX</span>
            </Link>
        </div>
    );
}

export default Navbar;