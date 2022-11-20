import React, { useRef, useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style/App.css";

import AuthService from "./services/auth.service";

import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Search from "./components/pages/Search";
import Home from "./components/pages/Home";
import MyCollection from "./components/pages/MyCollection";
import SidebarMenu from "./components/SidebarMenu";
import AddBook from "./components/pages/AddBook";
import Profile from "./components/pages/Profile";
import Exchange from "./components/Exchange";

function App () {
  let modalRef = useRef();
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(undefined);
  }

  const handleExchange = (value) => {
    modalRef.current.openModal(value)
  }

  return (
    <div className="background">
      <SidebarMenu currentUser={currentUser} logOut={logOut} />
      <Exchange ref={modalRef} user={currentUser}/>
      <div className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<Search event={handleExchange}/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add_book" element={<AddBook />} />
          <Route path="/profile" element={<Profile />} />
          {/*<Route path="/history" element={<History />} />*/}
          <Route path="/collection" element={<MyCollection user={currentUser}/>} />
        </Routes>
      </div>
    </div>
  );

}

export default App;
