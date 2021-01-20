import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import "./index.css";
import Header from "../../components/Common/Header/header.jsx";
import Nav from "../../components/Common/Nav/nav.jsx";
import SearchContent from "../../components/Search/SearchContent/searchContent.jsx";
import Footer from "../../components/Common/Footer/footer.jsx";
import BackTop from "../../components/Common/BackTop/BackTop.jsx";
import {
  fetchSearch,
  fetchSearchProList,
  fetchSearchResetWeibo,
  fetchSearchResetFuzzyQuery,
  fetchSearchResetButton,
  fetchSearchRepeat,
  fetchSearchQuery,
  fetchSearchDateQuery,
  fetchSearchDate,
  fetchSearchThemeSearchFlag,
  fetchSearchValue,
  fetchSearchLanguageList,
} from "../../store/action/SearchAction.js";
import { fetchHeaderSearch } from "../../store/action/HomeAction.js";
import {
  fetchSameList,
  fetchArticleCollect,
  fetchArticleCancelCollect,
  fetchDownload,
  fetchArticleDetail,
  fetchSameCount
} from "../../store/action/ArticleAction.js";

import { getPortfolioCode } from "../../lib/tools/utils.js";

class Search extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    this.node.scrollIntoView();
    localStorage.setItem("searchOrderFlag", "false");
    const {
      fetchSearch,
      fetchHeaderSearch,
      headerSearchContent,
      search:{
        searchDateQuery,
      }
    } = this.props;
    const searchContent = getPortfolioCode();
    const searchKey = searchContent === "search" ? headerSearchContent : decodeURI(searchContent);
    const searchContact = localStorage.getItem("searchContact");
    const params= {
      type:!searchContact ? 1 : Number(searchContact),
      starTime: searchDateQuery[0],
      endTime:searchDateQuery[1],
      searchKey,
      webList: [],
      proList: [],
      timeOrder: "",
      browseOrder: null,
      relevantOrder: null,
      transpondOrder: null,
      commentOrder: null,
      likeOrder: null,
      mettingOrder: null,
      blogType:null,
      pageNum: 1,
      pageSize: 10
    };
    if(!headerSearchContent){
      params.timeOrder = "desc";
    }else{
      params.relevantOrder = "desc";
    }
    if (searchContent !== "search") {
      fetchHeaderSearch(searchKey);
    }
    fetchSearch(params);
  }

  componentWillUnmount () {
    const {
      fetchSearchDateQuery,
      fetchSearchQuery,
      headerSearchContent,
      fetchHeaderSearch
    } = this.props;
    localStorage.setItem("searchContact", "1");
    localStorage.setItem("searchClassType", "");
    localStorage.setItem("searchContent", "");
    localStorage.setItem("searchOrderType",!headerSearchContent ? "1" : "3");
    localStorage.setItem("searchOrderFlag", "false");
    fetchSearchDateQuery();
    fetchSearchQuery();
    fetchHeaderSearch();
  }


  render(){
    return (
      <div className="search" ref={node => this.node = node}>
        <Header />
        <Nav {...this.props}/>
        <SearchContent {...this.props}/>
        <Footer {...this.props}/>
        <BackTop />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    search:state.search,
    article:state.article,
    headerSearchContent: state.home.headerSearchContent,
  };
};

export default connect(
  mapStateToProps,
  {
    fetchSearch,
    fetchSearchProList,
    fetchSearchResetWeibo,
    fetchSearchResetFuzzyQuery,
    fetchSearchResetButton,
    fetchSearchRepeat,
    fetchSameList,
    fetchSearchQuery,
    fetchHeaderSearch,
    fetchArticleCollect,
    fetchArticleCancelCollect,
    fetchSearchDateQuery,
    fetchSearchDate,
    fetchDownload,
    fetchSearchThemeSearchFlag,
    fetchArticleDetail,
    fetchSameCount,
    fetchSearchValue,
    fetchSearchLanguageList,
  }
)(withRouter(Search));
