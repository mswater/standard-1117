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

  componentWillMount() {
    const {match:{params}}=this.props;
    if(params && params.subjectId){
      localStorage.setItem("subjectContent", params.subjectId);
      localStorage.setItem("subjectReadingId", params.subjectId);
    }
  }

  componentDidMount() {
    this.node.scrollIntoView();
    localStorage.setItem("subjectOrderFlag", "false");
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
    localStorage.setItem("subjectOrderFlag", "false");
    fetchSubjectSearchQuery();
    fetchSubjectThemeSearch({
      subjectStartDate:"",
      subjectEndDate:"",
      searchKey:""
    });
  }


  render() {
    return (
      <div className="hot" ref={node => this.node = node}>
        <Header/>
        <Nav />
        <SubjectContent {...this.props}/>
        <Footer {...this.props}/>
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

