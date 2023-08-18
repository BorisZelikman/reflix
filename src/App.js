import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import Catalog from "./components/Catalog";

function App() {
  const [users, setUsers] = useState([
    { name: "Mona", color: "dodgerblue", budget: 10, rented: [] },
    { name: "Jasmine", color: "indianred", budget: 10, rented: [] },
    { name: "Aura", color: "mediumseagreen", budget: 10, rented: [] },
    { name: "Tina", color: "goldenrod", budget: 10, rented: [] },
  ]);

  return (
    <Router>
      <div className="App">
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<Landing users={users} />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/catalog/:user" element={<Catalog budget />} />
      </Routes>
    </Router>
  );
}

export default App;
