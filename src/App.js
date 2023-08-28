import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import Catalog from "./components/Catalog";
import MovieDetail from "./components/MovieDetail";
import Share from "./components/Share";
import ModalRent from "./components/ModalRent";

function App() {
  const [users, setUsers] = useState([
    { name: "Mona", color: "dodgerblue", budget: 10, rented: [] },
    { name: "Jasmine", color: "indianred", budget: 10, rented: [] },
    { name: "Aura", color: "mediumseagreen", budget: 10, rented: [] },
    { name: "Tina", color: "goldenrod", budget: 10, rented: [] },
  ]);

  const [userIndex, setUserIndex] = useState(null);
  const selectUser = (user) => {
    setUserIndex(users.indexOf(user));
  };

  const [rentTitle, setRentTitle] = useState("");
  const [rentGyphyUrl, setRentGyphyUrl] = useState("");

  const getGyphy = (searchStr) => {
    console.log(searchStr);
    const api_key = "lCfAKpgxCTeeIfHELqrnDkDzsjGwjmns";
    const urlGyphy = `http://api.giphy.com/v1/gifs/search?q=${searchStr}&api_key=${api_key}&limit=1`;
    fetch(urlGyphy)
      .then((response) => response.json())
      .then((response) => {
        console.log(response.data[0].images.downsized.url);
        setRentGyphyUrl(response.data[0].images.downsized.url);
      });
  };
  useEffect(() => {
    if (
      users[userIndex] !== undefined &&
      users[userIndex].rented != undefined &&
      users[userIndex].rented.slice(-1)[0] != undefined
    ) {
      const title = users[userIndex].rented.slice(-1)[0].title;
      setRentTitle(title);
      getGyphy(title);
      console.log("setRentGyphyUrl->" + rentGyphyUrl);
    }
    return () => {
      setRentGyphyUrl("");
      setRentTitle("");
    };
  }, [users, userIndex]);

  const [isModalRentOpen, setIsModalRentOpen] = useState(false);
  const openModalRent = () => setIsModalRentOpen(true);
  const closeModalRent = () => setIsModalRentOpen(false);

  const changeRent = (movieData, price) => {
    if (userIndex === null) return;
    const usersCopy = [...users];
    const user = usersCopy[userIndex];
    const movieIndex = user.rented.indexOf(movieData);
    if (movieIndex === -1) {
      if (user.budget >= price) {
        user.rented.push(movieData);
        user.budget -= price;
        openModalRent();
      } else alert("Budget is low");
    } else {
      user.rented.splice(movieIndex, 1);
      user.budget += price;
    }
    setUsers(usersCopy);
  };

  const shareTo = (indexTo, amount) => {
    if (userIndex === null) return;
    const usersCopy = [...users];
    usersCopy[userIndex].budget -= amount;
    usersCopy[indexTo].budget += amount;
    setUsers(usersCopy);
  };

  const [imgUrl, setImgUrl] = useState("http://image.tmdb.org/t/p/w185");
  const getImgUrl = (url) => setImgUrl(url);

  return (
    <Router>
      <div className="App">
        <Navbar />
      </div>
      <ModalRent isOpen={isModalRentOpen} onClose={closeModalRent}>
        <h5>Rented "{rentTitle}" Sucessfully!</h5>
        <img src={rentGyphyUrl} />
      </ModalRent>
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
              getImgUrl={getImgUrl}
            />
          }
        />
        <Route path="/movies/:id" element={<MovieDetail imgUrl={imgUrl} />} />
        <Route
          path="/share"
          element={
            <Share users={users} userIndex={userIndex} shareTo={shareTo} />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
