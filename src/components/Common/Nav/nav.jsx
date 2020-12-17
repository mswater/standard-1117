import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Modal } from "antd";
import { getMenuCode, } from "../../../lib/tools/utils.js";

import "./index.css";

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state={};
  }

  navLinkFunc = (href) => {
    const username = localStorage.getItem("username");
    const { history } = this.props;
    // 记录从首页导航进入会议列表页
    if(href === "/meeting"){
      localStorage.setItem("meetingFrom", "menu");
    }
    if(href === "/literature" && username === "guest"){
      Modal.info({
        title: "您现在没有权限阅读此栏目",
        content: (
          <div>
            <p>如需申请正式账号，请邮箱联系：agrihotspot@caas.cn</p>
          </div>
        ),
        onOk() {
        },
      });
    }else{
      history.push(href);
    }
  };

  render() {
    const headerRouter = getMenuCode();
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
          <li
            className={headerRouter === "literature" ? "current" : ""}
          >
            <a onClick={() => this.navLinkFunc("/literature")}>
              资料共享
            </a>
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
