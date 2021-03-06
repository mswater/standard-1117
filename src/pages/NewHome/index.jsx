import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import "./index.css";
import NewHeader from "../../components/Common/Header/NewHeader.jsx";
import Nav from "../../components/Common/Nav/nav.jsx";
import IndustryDetails from "../../components/NewHome/IndustryDetails/IndustryDetails.jsx";
import IndexConTitle from "../../components/NewHome/IndexConTitle/IndexConTitle.jsx";
import SubjectTopics from "../../components/NewHome/SubjectTopics/SubjectTopics.jsx";
import Conference from "../../components/NewHome/Conference/Conference.jsx";
import SubjectNews from "../../components/NewHome/SubjectNews/SubjectNews.jsx";
import Footer from "../../components/Common/Footer/footer.jsx";

import {
  fetchHotTopic,
  fetchBriefReport,
  fetchMeeting,
  fetchAboardMeeting,
  changeConferenceTab,
} from "../../store/action/HomeAction.js";

class Home extends React.Component{

  constructor(props){
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.node.scrollIntoView();
    const {
      fetchHotTopic,
      fetchBriefReport,
      fetchMeeting,
      fetchAboardMeeting,
    } = this.props;
    // 热点监测
    fetchHotTopic(1);
    // 简报
    fetchBriefReport();
    // 国内会议
    fetchMeeting(1);
    // 国外会议
    fetchAboardMeeting(2);
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
      <div ref={node => this.node = node}>
        <NewHeader />
        <Nav {...this.props}/>
        <div className="index-con-with-bg">
          <div className="industry-trends">
            <IndexConTitle title={titleList.industry}/>
            <IndustryDetails {...this.props} />
          </div>
          <div className="subject-topics">
            <IndexConTitle title={titleList.subject}/>
            <SubjectTopics {...this.props}/>
          </div>
        </div>
        <div className="index-con-last clear">
          <div className="conference-information fl">
            <IndexConTitle title={titleList.conference}/>
            <Conference {...this.props}/>
          </div>
          <div className="subject-news fr">
            <IndexConTitle title={titleList.news}/>
            <SubjectNews {...this.props} />
          </div>
        </div>
        <Footer {...this.props}/>
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
    fetchHotTopic,
    fetchBriefReport,
    fetchMeeting,
    fetchAboardMeeting,
    changeConferenceTab,
  },
)(withRouter(Home));


