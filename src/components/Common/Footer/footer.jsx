import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";

import picLeft from "../../../images/kxwz.png";
import picRight from "../../../images/cert.png";

import "./index.css";

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  navToPersonal = (token) => {
    window.open(`/managecenter/homepage?uid=${token}`, "_self");
  };

  navToBrief = (token) => {
    window.open(`/managecenter/brief?uid=${token}`, "_self");
  };

  render() {
    const token = localStorage.getItem("token");
    return (
      <div className="footer">
        <div className="footer-link">
          <NavLink to="hot">热点监测</NavLink>
          <NavLink to="topic">专题监测</NavLink>
          <NavLink to="literature">文献中心</NavLink>
          <NavLink to="analysis">行业分析</NavLink>
          <a
            onClick={() => {
              return this.navToBrief(token);
            }}
          >
            行业简报
          </a>
          <NavLink to="stat">来源统计</NavLink>
          <a
            onClick={() => {
              return this.navToPersonal(token);
            }}
          >
            个人主页
          </a>
        </div>
        <p className="address">通讯地址：北京市海淀区西小口路66号东升科技园-北领地 A-2楼</p>
        <div className="footer-images">
          <a
            href="https://ss.knet.cn/verifyseal.dll?sn=e131111110100433
          64isll000000&amp;a=1&amp;pa=0.08881110103584755"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={picLeft} alt=""/>
          </a>
          <a
            href="https://credit.cecdc.com/CX20140929005220005306.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={picRight} alt=""/>
          </a>
        </div>
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    ...state
  };
};

export default connect(
  mapStateToProps,
  null
)(withRouter(Footer));
