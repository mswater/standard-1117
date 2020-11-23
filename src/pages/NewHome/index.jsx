import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Form,  } from "antd";

import "./index.css";
import logo from "../../images/nky-logo.png";
import IndustryDetails from "../../components/NewHome/IndustryDetails/IndustryDetails.jsx";
import IndexConTitle from "../../components/NewHome/IndexConTitle/IndexConTitle.jsx";
import SubjectTopics from "../../components/NewHome/SubjectTopics/SubjectTopics.jsx";

class Home extends React.Component{

  constructor(props){
    super(props);
    this.state = {};
  }

  render(){
    const titleList = {
      industry: {
        main: "行业动态",
        sub: "INDUSTRY TRENDS"
      },
      subject: {
        main: "学科专题",
        sub: "SUBJECT TOPICS"
      },
      conference: {
        main: "会议信息",
        sub: "CONFERENCE INFORMATION"
      },
      news: {
        main: "学科快讯",
        sub: "SUBJECT NEWS"
      }
    };

    return (
      <div>
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
            </div>
          </div>
        </header>
        <nav className="index-nav">
          <ul className="index-nav-con">
            <li className="current">
              <a>首页</a>
            </li>
            <li>
              <a>行业动态</a>
            </li>
            <li>
              <a>会议信息</a>
            </li>
            <li>
              <a>学科专题</a>
            </li>
            <li>
              <a>学科快讯</a>
            </li>
            <li>
              <a>资料共享</a>
            </li>
            <li>
              <a>关于我们</a>
            </li>
          </ul>
        </nav>
        <div className="index-con-with-bg">
          <div className="industry-trends">
            <IndexConTitle title={titleList.industry}/>
            <ul className="clear">
              <IndustryDetails className="fl" />
              <IndustryDetails className="fr" />
              <IndustryDetails className="fl" />
              <IndustryDetails className="fr" />
            </ul>
          </div>
          <div className="subject-topics">
            <IndexConTitle title={titleList.subject}/>
            <SubjectTopics />
          </div>
        </div>
        <div className="index-con-last clear">
          <div className="conference fl">
            <IndexConTitle title={titleList.conference}/>
          </div>
          <div className="subject-news fr">
            <IndexConTitle title={titleList.news}/>
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    home: state.home,
  };
};

export default connect(
  mapStateToProps,
  {
  },
)(withRouter(Form.create()(Home)));


