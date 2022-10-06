import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style/App.css";

import AuthService from "./services/auth.service";

import Login from "./components/Login";
//import Register from "./components/pages/Register";
import Search from "./components/Search";
//import Profile from "./components/pages/Profile";
//import BoardUser from "./components/pages/BoardUser";
import SidebarMenu from "./components/SidebarMenu";

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
        <SidebarMenu currentUser={this.currentUser} logOut={this.logOut} />

        <div className="main">
          <Routes>
            <Route path="/" element={<Search />} />
            <Route path="/browse" element={<Search />} />
            <Route path="/login" element={<Login />} />
            {/*<Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/history" element={<BoardUser />} />
            <Route path="/collection" element={<BoardUser />} />*/}
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;
