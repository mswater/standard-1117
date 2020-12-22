import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import "./index.css";
import Header from "../../components/Common/Header/header.jsx";
import Nav from "../../components/Common/Nav/nav.jsx";
import Footer from "../../components/Common/Footer/footer.jsx";
import MeetingContent from "../../components/Meeting/MeetingContent/meetingContent.jsx";
import BackTop from "../../components/Common/BackTop/BackTop.jsx";

import {
  fetchMeetingList,
  fetchMeetingProList,
  fetchMeetingResetButton,
  fetchMeetingQuery,
  fetchMeetingDateQuery,
  fetchMeetingDate,
  fetchMeetingThemeSearch,
  fetchMeetingResetFuzzyQuery,
  fetchMeetingThemeSearchFlag,
  fetchMeetingCollect,
  fetchMeetingSearchValue,
  fetchMeetingLanguageList,
  fetchMeetingWebList,
} from "../../store/action/MeetingAction.js";
import {
  fetchArticleCollect,
  fetchArticleCancelCollect,
  fetchArticleDetail
} from "../../store/action/ArticleAction.js";

class Meeting extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  componentDidMount() {
    this.node.scrollIntoView();
    const {
      fetchMeetingList,
      fetchMeetingResetButton,
      home: {
        conferenceTab
      },
      meeting:{
        meetingDateQuery,
        meetingThemeSearch
      }
    } = this.props;
    let languageList;
    const meetingFrom = localStorage.getItem("meetingFrom");
    if(meetingFrom === "index"){
      if(conferenceTab === "home"){
        languageList = ["国内"];
      }else if(conferenceTab === "aboard"){
        languageList = ["国外"];
      }
    }
    const params = {
      searchKey: meetingThemeSearch,
      starTime:meetingDateQuery[0],
      endTime:meetingDateQuery[1],
      webList: [],
      proList: [],
      languageList,
      timeOrder: "desc",
      browseOrder:null,
      pageNum: 1,
      pageSize: 10,
    };
    fetchMeetingResetButton(true);
    fetchMeetingList(params);
  }

  componentWillUnmount () {
    const {
      fetchMeetingDateQuery,
      fetchMeetingQuery
    } = this.props;
    /** 清除存储的状态
     * */
    localStorage.setItem("meetingOrderType","");
    localStorage.setItem("meetingOrderFlag","");
    fetchMeetingDateQuery();
    fetchMeetingQuery();
  }


  render() {
    return (
      <div className="meeting" ref={node => this.node = node}>
        <Header />
        <Nav />
        <MeetingContent {...this.props}/>
        <Footer />
        <BackTop />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    meeting:state.meeting,
    home:state.home,
  };
};

export default connect(
  mapStateToProps,
  {
    fetchMeetingList,
    fetchMeetingProList,
    fetchMeetingResetButton,
    fetchMeetingQuery,
    fetchMeetingDateQuery,
    fetchMeetingDate,
    fetchMeetingThemeSearch,
    fetchArticleCollect,
    fetchArticleCancelCollect,
    fetchMeetingResetFuzzyQuery,
    fetchMeetingThemeSearchFlag,
    fetchMeetingCollect,
    fetchArticleDetail,
    fetchMeetingSearchValue,
    fetchMeetingLanguageList,
    fetchMeetingWebList,
  }
)(withRouter(Meeting));
