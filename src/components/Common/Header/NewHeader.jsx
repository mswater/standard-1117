import React from "react";
import "./index.css";
import { Input } from "antd";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { fetchHeaderSearch } from "../../../store/action/HomeAction.js";
import { fetchSearch,fetchSearchThemeSearchFlag } from "../../../store/action/SearchAction.js";
import { fetchGetExit } from "../../../store/action/LoginAction.js";
import logo from "../../../images/nky-logo.png";
import UserInfo from "./UserInfo.jsx";

const { Search } = Input;

class NewHeader extends React.Component{
  constructor(props) {
    super(props);
    this.state = {};
  }

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



  render(){
    const { headerSearchContent } = this.props;
    return (
      <header className="index-header">
        <div className="index-header-bg">
          <div className="index-header-con clear">
            <div className="top-l logo">
              <img alt="logo" src={logo}/>
            </div>
            <UserInfo />
            <div className="index-search-top">
              <Search
                placeholder="请输入检索词..."
                value={headerSearchContent}
                onChange={this.searchChange}
                onSearch={this.searchContent}
              />
            </div>
          </div>
        </div>
      </header>
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
)(withRouter(NewHeader));
