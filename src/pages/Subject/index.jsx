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
  fetchHotList,
  fetchSugReading,
  fetchHotContentList,
  fetchSiteActivityMap,
  fetchDataTrendMap,
  fetchHotResetButton,
  fetchSourcesStatisticsMap,
  fetchSiteMap,
  fetchHotProList,
  fetchHotResetWeibo,
  fetchHotResetLanguage,
  fetchHotResetFuzzyQuery,
  fetchHotSearchQuery,
  fetchHotThemeSearch,
  fetchHotThemeSearchFlag,
  fetchHotSearchValue
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
      fetchHotList,
    } = this.props;
    fetchHotList();
  }


  componentWillUnmount() {
    const {
      fetchHotSearchQuery,
      fetchHotThemeSearch,
    } = this.props;
    localStorage.setItem("subjectContact", 1);
    localStorage.setItem("subjectClassType", "");
    localStorage.setItem("subjectContent", "");
    localStorage.setItem("subjectReadingId", "");
    localStorage.setItem("subjectDeadLine", "");
    localStorage.setItem("subjectOrderType", 1);
    localStorage.setItem("subjectOrderFlag", "");
    fetchHotSearchQuery();
    fetchHotThemeSearch();
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
    fetchHotList,
    fetchHotProList,
    fetchHotResetButton,
    fetchSugReading,
    fetchHotContentList,
    fetchSiteActivityMap,
    fetchDataTrendMap,
    fetchSourcesStatisticsMap,
    fetchSiteMap,
    fetchHotResetWeibo,
    fetchHotResetLanguage,
    fetchHotResetFuzzyQuery,
    fetchSameList,
    fetchHotSearchQuery,
    fetchArticleCollect,
    fetchArticleCancelCollect,
    fetchHotThemeSearch,
    fetchDownload,
    fetchHotThemeSearchFlag,
    fetchSameCount,
    fetchHotSearchValue
  },
)(withRouter(Subject));

