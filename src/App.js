import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import Catalog from "./components/Catalog";
import MovieDetail from "./components/MovieDetail";

function App() {
  const [users, setUsers] = useState([
    { name: "Mona", color: "dodgerblue", budget: 10, rented: [] },
    { name: "Jasmine", color: "indianred", budget: 10, rented: [] },
    { name: "Aura", color: "mediumseagreen", budget: 10, rented: [] },
    { name: "Tina", color: "goldenrod", budget: 10, rented: [] },
  ]);

  //const [selectedUser, setSelectedUser] = useState(null);
  const [userIndex, setUserIndex] = useState(null);

  const selectUser = (user) => {
    setUserIndex(users.indexOf(user));
  };

  const changeRent = (movieData, price) => {
    if (userIndex === null) return;
    const usersCopy = [...users];
    const user = usersCopy[userIndex];
    const movieIndex = user.rented.indexOf(movieData);
    if (movieIndex === -1) {
      if (user.budget >= price) {
        user.rented.push(movieData);
        user.budget -= price;
      } else alert("Budget is low");
    } else {
      user.rented.splice(movieIndex, 1);
      user.budget += price;
    }

    setUsers(usersCopy);
    //    setUsers([...users, (users[userIndex] = user)]);
    console.log(users);
  };

  // const changeRent = (id, price) => {
  //   if (userIndex === null) return;
  //   const usersCopy = [...users];
  //   const user = usersCopy[userIndex];
  //   const idIndex = user.rented.indexOf(id);
  //   if (idIndex === -1) {
  //     if (user.budget >= price) {
  //       user.rented.push(id);
  //       user.budget -= price;
  //     } else alert("Budget is low");
  //   } else {
  //     user.rented.splice(idIndex, 1);
  //     user.budget += price;
  //   }

  //   setUsers(usersCopy);
  //   //    setUsers([...users, (users[userIndex] = user)]);
  //   console.log(users);
  // };

  const [details, setDetails] = useState(null);
  const getMovieDetails = (data) => setDetails(data);

  const [imgUrl, setImgUrl] = useState("http://image.tmdb.org/t/p/w185");
  const getImgUrl = (url) => setImgUrl(url);

  return (
    <Router>
      <div className="App">
        <Navbar />
      </div>
      <Routes>
        <Route
          path="/"
          element={<Landing users={users} selectUser={selectUser} />}
        />
        <Route
          path="/catalog"
          element={
            <Catalog
              selectedUser={users[userIndex]}
              changeRent={changeRent}
              getMovieDetails={getMovieDetails}
              getImgUrl={getImgUrl}
            />
          }
        />
        <Route
          path="/movies/:id"
          element={<MovieDetail imgUrl={imgUrl} details={details} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
