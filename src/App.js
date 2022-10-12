import React, { Component } from "react";
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

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    if (user) {
      this.setState({
        currentUser: user
      });
    }
  }

  logOut() {
    AuthService.logout();
    this.setState({
      currentUser: undefined,
    });
  }

  render() {

    return (
      <div>
        <SidebarMenu currentUser={this.state.currentUser} logOut={this.logOut} />

        <div className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/browse" element={<Search />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/add_book" element={<AddBook />} />
            <Route path="/profile" element={<Profile />} />
            {/*<Route path="/history" element={<History />} />*/}
            <Route path="/collection" element={<MyCollection />} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;
