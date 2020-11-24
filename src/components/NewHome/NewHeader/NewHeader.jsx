import React from "react";
import "./index.css";
import logo from "../../../images/nky-logo.png";
import searchIcon from "../../../images/search-icon.png";

class NewHeader extends React.Component{
  constructor(props) {
    super(props);
    this.state = {};
  }

  render(){
    return (
      <header className="index-header">
        <div className="index-header-bg">
          <div className="index-header-con clear">
            <div className="top-l logo">
              <img alt="logo" src={logo}/>
            </div>
            <div className="top-r">
              <div className="user-info">
                <span>欢迎您！管理员</span>
                <button type="button">退出</button>
              </div>
              <div>
                <a className="personal-index">个人首页</a>|
                <a className="backstage">管理中心</a>
              </div>
            </div>
            <div className="index-search-top">
              <input type="text" defaultValue="请输入检索词..." />
              <button type="button"><img src={searchIcon} alt="搜索"/></button>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default NewHeader;
