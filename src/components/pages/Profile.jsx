import React, { Component } from "react";
import AuthService from "../../services/auth.service";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
        currentUser: undefined
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
  
  render() {
    if(this.state.currentUser)
    return (
      <div className="col-md-8 content">
      <div className="card mb-3" style={{ borderRadius: '15px' }}>
        <div className="card-body">
          <div className="row">
            <div className="col-sm-3">
              <h6 className="mb-0">Username</h6>
            </div>
            <div className="col-sm-9 text-secondary">
              {this.state.currentUser.username}
            </div>
          </div>
          <div className="row">
            <div className="col-sm-3">
              <h6 className="mb-0">Email</h6>
            </div>
            <div className="col-sm-9 text-secondary">
              {this.state.currentUser.email}
            </div>
          </div>
          <div className="row">
            <div className="col-sm-3">
              <h6 className="mb-0">Token</h6>
            </div>
            <div className="col-sm-9 text-secondary">
              {this.state.currentUser.token}
            </div>
          </div>
          <div className="row">
            <div className="col-sm-3">
              <h6 className="mb-0">Id</h6>
            </div>
            <div className="col-sm-9 text-secondary">
              {this.state.currentUser.id}
            </div>
          </div>
          <div className="row">
            <div className="col-sm-3">
              <h6 className="mb-0">Role</h6>
            </div>
            <div className="col-sm-9 text-secondary">
              {this.state.currentUser.role}
            </div>
          </div>
          <div className="row">
            <div className="col-sm-3">
              <h6 className="mb-0">Registration date</h6>
            </div>
            <div className="col-sm-9 text-secondary">
              {this.state.currentUser.date}
            </div>
          </div>
        </div>
      </div>
      </div>
  );
  }
}