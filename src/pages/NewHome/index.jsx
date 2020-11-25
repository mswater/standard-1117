import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import "./index.css";
import NewHeader from "../../components/NewHome/NewHeader/NewHeader.jsx";
import IndustryDetails from "../../components/NewHome/IndustryDetails/IndustryDetails.jsx";
import IndexConTitle from "../../components/NewHome/IndexConTitle/IndexConTitle.jsx";
import SubjectTopics from "../../components/NewHome/SubjectTopics/SubjectTopics.jsx";
import Conference from "../../components/NewHome/Conference/Conference.jsx";
import SubjectNews from "../../components/NewHome/SubjectNews/SubjectNews.jsx";

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
        <NewHeader />
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
          <div className="conference-information fl">
            <IndexConTitle title={titleList.conference}/>
            <Conference />
          </div>
          <div className="subject-news fr">
            <IndexConTitle title={titleList.news}/>
            <SubjectNews />
          </div>
        </div>
        <footer>
          <div className="footer-con">
            <div className="clear">
              <ul className="fl">
                <li>
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
                <li>
                  <a>个人主页</a>
                </li>
              </ul>
              <div className="relation-link fr">
                <select defaultValue="default">
                  <option value="default">友情链接</option>
                  <option value="1">中科院</option>
                  <option value="2">中科院</option>
                </select>
              </div>
            </div>
            <p className="company-info">主办单位：中国农业科学院农业信息研究所&emsp;&emsp;&emsp;技术支持：同方知网（北京）技术有限公司</p>
          </div>
        </footer>
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
)(withRouter(Home));


