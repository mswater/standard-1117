import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Input } from "antd";
import { fetchHeaderSearch } from "../../../store/action/HomeAction.js";
import {  fetchSearch,fetchSearchThemeSearchFlag } from "../../../store/action/SearchAction.js";
import {  fetchGetExit } from "../../../store/action/LoginAction.js";

import "./index.css";
import logo from "../../../images/logo.png";

const { Search } = Input;

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
    const mesFlag=confirm("确定退出吗?");
    if(mesFlag === true){
      history.push("/login");
      fetchGetExit(history);
    }
  };

  searchContent = (value) => {
    const {
      history,
      fetchHeaderSearch,
      fetchSearch,
      fetchSearchThemeSearchFlag
    } = this.props;
    const searchContact = localStorage.getItem("searchContact");
    const params = {
      type:!Number(searchContact) ? 1 : Number(searchContact),
      starTime: "",
      endTime: "",
      searchKey: value,
      webList: [],
      proList: [],
      timeOrder: "",
      browseOrder: "",
      relevantOrder: "",
      transpondOrder: "",
      commentOrder: "",
      likeOrder: "",
      mettingOrder: "",
      blogType:[],
      pageNum: 1,
      pageSize: 10
    };

    if(value!== ""){
      params.relevantOrder = "desc";
    }else{
      params.timeOrder = "desc";
    }
    fetchSearch(params);
    history.push({
      pathname: "/search",
    });
    fetchSearchThemeSearchFlag(true);
    // 存储搜索的值
    fetchHeaderSearch(value);
  };

  searchChange = (e) => {
    const {
      fetchHeaderSearch,
    } = this.props;
    fetchHeaderSearch(e.target.value);
  };



  render() {
    const token = localStorage.getItem("token");
    const { headerSearchContent } = this.props;
    const realname = localStorage.getItem("realname");
    const roleName = localStorage.getItem("roleName");
    return (
      <div className="header">
        <div className="login">
          <div className="login-container">
            <p>欢迎来到行业信息监测与分析系统！</p>
            <div className="login-right">
              <span>
                <span>欢迎您!</span>
                <span>
                  <a
                    href={`/managecenter/user/editUser/1?uid=${token}`}
                  >
                    {realname}
                  </a>
                </span>
              </span>
              <span>
                <a
                  href="#"
                  onClick={() => {
                    return this.loginLinkFunc();
                  }}
                >
                  退出
                </a>
              </span>
              <span>
                <a
                  rel="noopener noreferrer"
                  href={`/managecenter/center/list?uid=${token}`}
                  target="_blank"
                >
                  {roleName === "管理员" ? "管理中心" : ""}
                </a>
              </span>
            </div>
          </div>
        </div>
        <div className="header-title">
          <div className="header-center">
            <div>
              <img src={logo} alt=""/>
              <h1>行业信息监测与分析系统</h1>
            </div>
            <div className="header-search">
              <Search
                placeholder="检索..."
                value={headerSearchContent}
                onChange={this.searchChange}
                onSearch={this.searchContent}
                style={{ width: 300 }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    headerSearchContent: state.home.headerSearchContent
  };
};

export default connect(
  mapStateToProps,
  {
    fetchHeaderSearch,
    fetchSearch,
    fetchGetExit,
    fetchSearchThemeSearchFlag,
  },
)(withRouter(Header));
