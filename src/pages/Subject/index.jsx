import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import "./index.css";
import Header from "../../components/Common/Header/header.jsx";
import Nav from "../../components/Common/Nav/nav.jsx";
import SubjectContent from "../../components/Hot/HotContent/subjectContent.jsx";
import Footer from "../../components/Common/Footer/footer.jsx";
import BackTop from "../../components/Common/BackTop/BackTop.jsx";


import {
  fetchSubjectList,
  fetchSubjectContentList,
  fetchSubjectSiteActivityMap,
  fetchSubjectDataTrendMap,
  fetchSubjectResetButton,
  fetchSubjectSourcesStatisticsMap,
  fetchSubjectSiteMap,
  fetchSubjectProList,
  fetchSubjectResetWeibo,
  fetchSubjectResetLanguage,
  fetchSubjectResetFuzzyQuery,
  fetchSubjectSearchQuery,
  fetchSubjectThemeSearch,
  fetchSubjectThemeSearchFlag,
  fetchSubjectSearchValue,
  changeSubjectBg,
} from "../../store/action/HotAction.js";
import {
  fetchSameList,
  fetchArticleCollect,
  fetchArticleCancelCollect,
  fetchDownload,
  fetchSameCount
} from "../../store/action/ArticleAction.js";



class Subject extends React.Component {
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


  componentWillUnmount() {
    const {
      fetchSubjectSearchQuery,
      fetchSubjectThemeSearch,
    } = this.props;
    localStorage.setItem("subjectContact", 1);
    localStorage.setItem("subjectClassType", "");
    localStorage.setItem("subjectContent", "");
    localStorage.setItem("subjectReadingId", "");
    localStorage.setItem("subjectDeadLine", "");
    localStorage.setItem("subjectOrderType", 1);
    localStorage.setItem("subjectOrderFlag", "");
    fetchSubjectSearchQuery();
    fetchSubjectThemeSearch();
  }


  render() {
    return (
      <div className="hot" ref={node => this.node = node}>
        <Header/>
        <Nav />
        <SubjectContent {...this.props}/>
        <Footer/>
        <BackTop />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    hot: state.hot,
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
    fetchSubjectSiteActivityMap,
    fetchSubjectDataTrendMap,
    fetchSubjectSourcesStatisticsMap,
    fetchSubjectSiteMap,
    fetchSubjectResetWeibo,
    fetchSubjectResetLanguage,
    fetchSubjectResetFuzzyQuery,
    fetchSameList,
    fetchSubjectSearchQuery,
    fetchArticleCollect,
    fetchArticleCancelCollect,
    fetchSubjectThemeSearch,
    fetchDownload,
    fetchSubjectThemeSearchFlag,
    fetchSameCount,
    fetchSubjectSearchValue,
    changeSubjectBg,
  },
)(withRouter(Subject));

