import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import "./index.css";
import Header from "../../components/Common/Header/header.jsx";
import Nav from "../../components/Common/Nav/nav.jsx";
import HotContent from "../../components/Hot/HotContent/hotContent.jsx";
import SubFooter from "../../components/Common/SubFooter/subFooter.jsx";
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



class Hot extends React.Component {
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
    localStorage.setItem("hotContact", 1);
    localStorage.setItem("hotClassType", "");
    localStorage.setItem("hotContent", "");
    localStorage.setItem("readingId", "");
    localStorage.setItem("deadLine", "");
    localStorage.setItem("orderType", 1);
    localStorage.setItem("orderFlag", "");
    fetchHotSearchQuery();
    fetchHotThemeSearch();
  }


  render() {
    return (
      <div className="hot" ref={node => this.node = node}>
        <Header/>
        <Nav />
        <HotContent {...this.props}/>
        <SubFooter/>
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
)(withRouter(Hot));

