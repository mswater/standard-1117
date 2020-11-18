import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import "./index.css";
import Header from "../../components/Common/Header/header.jsx";
import Nav from "../../components/Common/Nav/nav.jsx";
import SubFooter from "../../components/Common/SubFooter/subFooter.jsx";
import topImg from "../../images/topImg.png";
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
  fetchMeetingSearchValue
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
      meeting:{
        meetingDateQuery,
        meetingThemeSearch
      }
    } = this.props;
    const params = {
      searchKey: meetingThemeSearch,
      starTime:meetingDateQuery[0],
      endTime:meetingDateQuery[1],
      webList: [],
      proList: [],
      timeOrder: "desc",
      browseOrder:null,
      pageNum: 1,
      pageSize: 10,
    };
    fetchMeetingList(params);
  }

  componentWillUnmount () {
    const {
      fetchMeetingDateQuery,
      fetchMeetingQuery
    } = this.props;
    /** 清除存储的状态
     * */
    fetchMeetingDateQuery();
    fetchMeetingQuery();
  }


  render() {
    return (
      <div className="meeting" ref={node => this.node = node}>
        <Header />
        <Nav />
        <img src={topImg} className="top-img" alt=""/>
        <MeetingContent {...this.props}/>
        <SubFooter />
        <BackTop />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    meeting:state.meeting
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
    fetchMeetingSearchValue
  }
)(withRouter(Meeting));
