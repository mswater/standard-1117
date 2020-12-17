import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import "./index.css";
import Header from "../../components/Common/Header/header.jsx";
import Nav from "../../components/Common/Nav/nav.jsx";
import LiteratureContent from "../../components/Literature/LiteratureContent/literatureContent.jsx";
import Footer from "../../components/Common/Footer/footer.jsx";
import BackTop from "../../components/Common/BackTop/BackTop.jsx";

import {
  fetchLiteratureList,
  fetchLiteratureContentList,
  fetchLiteratureSearchQuery,
  fetchLiteratureResetFuzzyQuery,
  fetchLiteratureDateQuery,
  fetchLiteratureSelectQuery,
  fetchLiteratureDate,
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
    const obj = {
      sid:null,
      searchWord: literatureSearchQuery,
      searchType:literatureSelectQuery,
      starTime:literatureDateQuery[0],
      endTime:literatureDateQuery[1],
      timeOrder: "desc",
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
    } = this.props;
    localStorage.setItem("literatureContact", "4");
    localStorage.setItem("sharingMaterialType", "");
    localStorage.setItem("sId",null);
    localStorage.setItem("literatureOrderType", "1");
    localStorage.setItem("literatureOrderFlag", "");
    fetchLiteratureSearchQuery();
    fetchLiteratureDateQuery();
    fetchLiteratureDate();
  }


  render() {
    return (
      <div className="literature" ref={node => this.node = node}>
        <Header />
        <Nav />
        <LiteratureContent {...this.props}/>
        <Footer />
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
