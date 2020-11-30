import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { getPortfolioCode, getDetailsPortfolioCode } from "../../../lib/tools/utils.js";

import "./index.css";

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state={};
  }

  navLinkFunc = (href) => {
    const { history } = this.props;
    history.push(href);
  };

  // navToPersonal = (token) =>{
  //   window.open(`/managecenter/homepage?uid=${token}`,"_self");
  // };

  navToBrief = (token) =>{
    window.open(`/managecenter/brief?uid=${token}`,"_self");
  };

  render() {
    const headerRouter = getPortfolioCode();
    const detailsRouter = getDetailsPortfolioCode();
    const token = localStorage.getItem("token");
    return (
      <nav className="index-nav">
        <ul className="index-nav-con">
          <li
            className={headerRouter === "" ? "current" : ""}
          >
            <a onClick={() => this.navLinkFunc("/")}>
              首页
            </a>
          </li>
          <li
            className={
              (headerRouter === "topic" || detailsRouter === "topic" || headerRouter === "tags") ?
                "current" : ""
            }
          >
            <a onClick={() => this.navLinkFunc("/topic")}>
              行业动态
            </a>
          </li>
          <li>
            <a>会议信息</a>
          </li>
          <li>
            <a>学科专题</a>
          </li>
          <li
            className={headerRouter === "stat" ? "current" : ""}
          >
            <a onClick={() => this.navToBrief(token)}>
              学科快讯
            </a>
          </li>
          <li>
            <a>资料共享</a>
          </li>
          <li>
            <a>关于我们</a>
          </li>
        </ul>
      </nav>
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
  null
)(withRouter(Nav));
