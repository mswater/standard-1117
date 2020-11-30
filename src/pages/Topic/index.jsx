import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import "./index.css";
import Header from "../../components/Common/Header/header.jsx";
import Nav from "../../components/Common/Nav/nav.jsx";
import TopicContent from "../../components/Topic/TopicContent/topicContent.jsx";
import SubFooter from "../../components/Common/SubFooter/subFooter.jsx";
import BackTop from "../../components/Common/BackTop/BackTop.jsx";


import {
  fetchSubjectList,
  fetchSubjectContentList,
  fetchSubjectDataTrendMap,
  fetchSubSourcesStatisticsMap,
  fetchSubjectResetButton,
  fetchSubjectProList,
  fetchSubjectResetWeibo,
  fetchSubjectResetFuzzyQuery,
  fetchSubjectRepeat,
  fetchSubjectSearchQuery,
  fetchSubjectThemeSearch,
  fetchSubjectThemeSearchFlag,
  fetchSubjectSearchValue
} from "../../store/action/SubjectAction.js";

import {
  fetchSameList,
  fetchArticleCollect,
  fetchArticleCancelCollect,
  fetchDownload,
  fetchSameCount
} from "../../store/action/ArticleAction.js";

class Topic extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  componentDidMount() {
    this.node.scrollIntoView();
    const {
      fetchSubjectList,
    } = this.props;
    fetchSubjectList();
  }

  componentWillUnmount () {
    const { fetchSubjectThemeSearch,fetchSubjectSearchQuery } = this.props;
    localStorage.setItem("topicContact", 1);
    localStorage.setItem("topicClassType", "");
    localStorage.setItem("topicContent", "");
    localStorage.setItem("id", "");
    localStorage.setItem("deadLine", "");
    localStorage.setItem("topicPage", 1);
    localStorage.setItem("topicOpenKeyId", "");
    localStorage.setItem("topicOrderType", 1);
    localStorage.setItem("topicOrderFlag", "");
    fetchSubjectThemeSearch();
    fetchSubjectSearchQuery();
  }


  render(){
    return (
      <div className="topic" ref={node => this.node = node}>
        <Header />
        <Nav />
        <TopicContent {...this.props}/>
        <SubFooter />
        <BackTop />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    subject:state.subject,
    article:state.article,
  };
};

export default connect(
  mapStateToProps,
  {
    fetchSubjectList,
    fetchSubjectProList,
    fetchSubjectResetButton,
    fetchSubjectContentList,
    fetchSubjectDataTrendMap,
    fetchSubSourcesStatisticsMap,
    fetchSubjectResetWeibo,
    fetchSubjectResetFuzzyQuery,
    fetchSubjectRepeat,
    fetchSameList,
    fetchSubjectSearchQuery,
    fetchArticleCollect,
    fetchArticleCancelCollect,
    fetchSubjectThemeSearch,
    fetchDownload,
    fetchSubjectThemeSearchFlag,
    fetchSameCount,
    fetchSubjectSearchValue
  },
)(withRouter(Topic));
