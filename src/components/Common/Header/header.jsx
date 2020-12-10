import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Input } from "antd";
import "./index.css";
import logo from "../../../images/nky-logo.png";
import UserInfo from "./UserInfo.jsx";

const { Search } = Input;

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount(){
  }

  render() {
    const { headerSearchContent } = this.props;
    return (
      <header className="index-header normal-header">
        <div className="normal-header-bg">
          <div className="index-header-con normal-header-con clear">
            <div className="top-l logo">
              <img alt="logo" src={logo}/>
            </div>
            <div className="top-search-small">
              <Search
                placeholder="请输入检索词..."
                value={headerSearchContent}
              />
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
  },
)(withRouter(Header));
