import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { fetchGetExit } from "../../../store/action/LoginAction.js";

import "./index.css";
import logo from "../../../images/nky-logo.png";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount(){
  }

  loginLinkFunc = () => {
    /* eslint-disable no-restricted-globals */
    const { history,fetchGetExit } = this.props;
    const mesFlag = confirm("确定退出吗?");
    if(mesFlag === true){
      history.push("/login");
      fetchGetExit(history);
    }
  };

  render() {
    const token = localStorage.getItem("token");
    const realName = localStorage.getItem("realName");
    const roleName = localStorage.getItem("roleName");
    return (
      <header className="index-header normal-header">
        <div className="normal-header-bg">
          <div className="index-header-con normal-header-con clear">
            <div className="top-l logo">
              <img alt="logo" src={logo}/>
            </div>
            <div className="top-r">
              <div className="user-info">
                <span>欢迎您！
                  <a href={`/managecenter/user/editUser/1?uid=${token}`}>
                    {realName}
                  </a>
                </span>
                <button type="button" onClick={() => {return this.loginLinkFunc();}}>
                  退出
                </button>
              </div>
              <div>
                <a className="personal-index">个人首页</a>|
                <a
                  className="backstage"
                  rel="noopener noreferrer"
                  href={`/managecenter/center/list?uid=${token}`}
                  target="_blank"
                >
                  {roleName === "管理员" ? "管理中心" : ""}
                </a>
              </div>
            </div>
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
