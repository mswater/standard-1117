import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { fetchGetExit } from "../../../store/action/LoginAction.js";
import "./index.css";
import logo from "../../../images/nky-logo.png";
import UserInfo from "./UserInfo.jsx";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount(){
  }

  render() {
    return (
      <header className="index-header normal-header">
        <div className="normal-header-bg">
          <div className="index-header-con normal-header-con clear">
            <div className="top-l logo">
              <img alt="logo" src={logo}/>
            </div>
            <UserInfo />
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state
  };
};

export default connect(
  mapStateToProps,
  {
    fetchGetExit,
  },
)(withRouter(Header));
