import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { siblings, getPortfolioCode, getDetailsPortfolioCode } from "../../../lib/tools/utils.js";

import "./index.css";

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state={};
  }

  componentDidMount() {
    this.addEvent();
  }

  navLinkFunc = (href) => {
    const { history } = this.props;
    history.push(href);
  };

  navToPersonal = (token) =>{
    window.open(`/managecenter/homepage?uid=${token}`,"_self");
  };

  navToBrief = (token) =>{
    window.open(`/managecenter/brief?uid=${token}`,"_self");
  };



  checkType() {
    /* eslint-disable no-param-reassign */
    siblings(this).forEach((item, index, arr) => {
      arr[index].style.backgroundColor = "#208CE0";
    });
    this.style.backgroundColor = "#ffc038";
  }

  addEvent() {
    const { box } = this;
    const arr = box.children;
    const ways = [];
    for (let i = 0; i < arr.length - 1; i += 1) {
      ways.push(arr[i]);
    }
    Array.prototype.forEach.call(ways, (item) => {
      item.addEventListener("click", this.checkType);
    });
  }

  render() {
    const headerRouter = getPortfolioCode();
    const detailsRouter = getDetailsPortfolioCode();
    const token = localStorage.getItem("token");
    return (
      <div className="header-bottom">
        <div
          className="header-link"
          ref={(ref) => {this.box = ref;}}
        >
          <div
            onClick={() => {
              return this.navLinkFunc("/");
            }}
            style={
              headerRouter === "" ?
                { backgroundColor: "#ffc038" } : { backgroundColor: "#208CE0" }
            }
          >
            首页
          </div>
          <div
            onClick={() => {
              return this.navLinkFunc("/hot");
            }}
            style={
              (headerRouter === "hot" || detailsRouter === "hot" || headerRouter === "tabs") ?
                { backgroundColor: "#ffc038" } : { backgroundColor: "#208CE0" }
            }
          >
            热点监测
          </div>
          <div
            onClick={() => {
              return this.navLinkFunc("/topic");
            }}
            style={
              (headerRouter === "topic" || detailsRouter === "topic" || headerRouter === "tags")
                ? { backgroundColor: "#ffc038" } : { backgroundColor: "#208CE0" }
            }
          >
            专题监测
          </div>
          <div
            onClick={() => {
              return this.navLinkFunc("/literature");
            }}
            style={
              headerRouter === "literature" ?
                { backgroundColor: "#ffc038" } : { backgroundColor: "#208CE0" }
            }
          >
            文献中心
          </div>
          <div
            onClick={() => {
              return this.navLinkFunc("/analysis");
            }}
            style={
              headerRouter === "analysis" ?
                { backgroundColor: "#ffc038" } : { backgroundColor: "#208CE0" }
            }
          >
            行业分析
          </div>
          <div
            onClick={() => {
              return this.navToBrief(token);
            }}
            style={
              headerRouter === "report" ?
                { backgroundColor: "#ffc038" } : { backgroundColor: "#208CE0" }
            }
          >
            行业简报
          </div>
          <div
            onClick={() => {
              return this.navLinkFunc("/stat");
            }}
            style={
              headerRouter === "stat" ?
                { backgroundColor: "#ffc038" } : { backgroundColor: "#208CE0" }
            }
          >
            来源统计
          </div>
          <div
            onClick={() => {
              return this.navToPersonal(token);
            }}
            style={
              headerRouter === "personal" ?
                { backgroundColor: "#ffc038" } : { backgroundColor: "#208CE0" }
            }
          >
            个人主页
          </div>
        </div>
      </div>
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
