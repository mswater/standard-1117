import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { getPortfolioCode, } from "../../../lib/tools/utils.js";

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

  render() {
    const headerRouter = getPortfolioCode();
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
            className={(headerRouter === "hot") ? "current" : ""}
          >
            <a onClick={() => this.navLinkFunc("/hot")}>
              行业动态
            </a>
          </li>
          <li
            className={headerRouter === "meeting" ? "current" : ""}
          >
            <a onClick={() => this.navLinkFunc("/meeting")}>
              会议信息
            </a>
          </li>
          <li
            className={headerRouter === "subject" ? "current" : ""}
          >
            <a onClick={() => this.navLinkFunc("/subject")}>
              学科专题
            </a>
          </li>
          <li
            className={headerRouter === "report" ? "current" : ""}
          >
            <a onClick={() => this.navLinkFunc("/report")}>
              学科快讯
            </a>
          </li>
          <li>
            <a>资料共享</a>
          </li>
          <li
            className={headerRouter === "aboutus" ? "current" : ""}
          >
            <a onClick={() => this.navLinkFunc("/aboutus")}>
              关于我们
            </a>
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
