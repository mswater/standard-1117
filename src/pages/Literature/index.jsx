import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import "./index.css";
import Header from "../../components/Common/Header/header.jsx";
import Nav from "../../components/Common/Nav/nav.jsx";
import LiteratureContent from "../../components/Literature/LiteratureContent/literatureContent.jsx";
import SubFooter from "../../components/Common/SubFooter/subFooter.jsx";
import BackTop from "../../components/Common/BackTop/BackTop.jsx";

import {
  fetchLiteratureList,
  fetchLiteratureContentList,
  fetchLiteratureSearchQuery,
  fetchLiteratureResetFuzzyQuery,
  fetchLiteratureDateQuery,
  fetchLiteratureSelectQuery,
  fetchLiteratureDate,
  fetchLiteratureSearchValue,
  fetchLiteratureWebsite,
  fetchLiteratureThemeSearchFlag,
  fetchLiteratureResetButton,
  fetchLiteratureCollect,
  fetchLiteratureSearchValueFun
} from "../../store/action/LiteratureAction.js";
import {
  fetchArticleCollect,
  fetchArticleCancelCollect,
  fetchArticleDetail
} from "../../store/action/ArticleAction.js";

class Literature extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    /* eslint-disable no-nested-ternary */
    this.node.scrollIntoView();
    const {
      fetchLiteratureList,
      fetchLiteratureContentList,
      literature:{
        literatureSearchQuery,
        literatureDateQuery,
        literatureSelectQuery
      }
    } = this.props;
    const docId = localStorage.getItem("lId");
    const literatureContact = localStorage.getItem("literatureContact");
    const params = {
      kid: !docId ? (docId === "" ? "" : 421) : Number(docId),
    };
    const obj = {
      searchKey: literatureSearchQuery,
      hId: params.kid,
      sourceType:!literatureContact ? 4 :Number(literatureContact),
      webList:[],
      selectedField:literatureSelectQuery,
      startDate:literatureDateQuery[0],
      endDate:literatureDateQuery[1],
      order:"desc",
      orderType:1,
      pageNum:1,
      pageSize:10
    };
    fetchLiteratureList();
    fetchLiteratureContentList(obj);
  }

  componentWillUnmount () {
    const {
      fetchLiteratureSearchQuery,
      fetchLiteratureDateQuery,
      fetchLiteratureDate,
      fetchLiteratureSearchValue
    } = this.props;
    localStorage.setItem("literatureContact", "4");
    localStorage.setItem("literatureContent", "421");
    localStorage.setItem("lId","421");
    localStorage.setItem("literatureOrderType", "1");
    localStorage.setItem("literatureOrderFlag", "");
    fetchLiteratureSearchQuery();
    fetchLiteratureDateQuery();
    fetchLiteratureDate();
    fetchLiteratureSearchValue();
  }


  render() {
    return (
      <div className="literature" ref={node => this.node = node}>
        <Header />
        <Nav />
        <LiteratureContent {...this.props}/>
        <SubFooter />
        <BackTop />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    literature:state.literature,
  };
};

export default connect(
  mapStateToProps,
  {
    fetchLiteratureList,
    fetchLiteratureContentList,
    fetchLiteratureSearchQuery,
    fetchLiteratureResetFuzzyQuery,
    fetchLiteratureDateQuery,
    fetchLiteratureSelectQuery,
    fetchLiteratureDate,
    fetchLiteratureSearchValue,
    fetchArticleCollect,
    fetchArticleCancelCollect,
    fetchLiteratureWebsite,
    fetchLiteratureThemeSearchFlag,
    fetchLiteratureResetButton,
    fetchLiteratureCollect,
    fetchArticleDetail,
    fetchLiteratureSearchValueFun
  },
)(withRouter(Literature));
