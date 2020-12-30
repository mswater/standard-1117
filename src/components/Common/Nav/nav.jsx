import React from "react";
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
        <div className="index-nav-con">
          <div
            className={headerRouter === "" ? "current" : ""}
            onClick={() => this.navLinkFunc("/")}
          >
            <span>首页</span>
          </div>
          <div
            className={(headerRouter === "hot") ? "current" : ""}
            onClick={() => this.navLinkFunc("/hot")}
          >
            <span>行业动态</span>
          </div>
          <div
            className={headerRouter === "meeting" ? "current" : ""}
            onClick={() => this.navLinkFunc("/meeting")}
          >
            <span>会议信息</span>
          </div>
          <div
            className={headerRouter === "subject" ? "current" : ""}
            onClick={() => this.navLinkFunc("/subject")}
          >
            <span>学科专题</span>
          </div>
          <div
            className={headerRouter === "report" ? "current" : ""}
            onClick={() => this.navLinkFunc("/report")}
          >
            <span>学科快讯</span>
          </div>
          <div
            className={headerRouter === "literature" ? "current" : ""}
            onClick={() => this.navLinkFunc("/literature")}
          >
            <span>资料共享</span>
          </div>
          <div
            className={headerRouter === "aboutus" ? "current" : ""}
            onClick={() => this.navLinkFunc("/aboutus")}
          >
            <span>关于我们</span>
          </div>
        </div>
      </nav>
    );
  }
}

export default Nav;
