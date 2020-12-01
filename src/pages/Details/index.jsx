import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import "./index.css";
import Header from "../../components/Common/Header/header.jsx";
import Nav from "../../components/Common/Nav/nav.jsx";
import SubFooter from "../../components/Common/SubFooter/subFooter.jsx";
import DetailsContent from "../../components/Detail/DetailsContent/detailsContent.jsx";
import BackTop from "../../components/Common/BackTop/BackTop.jsx";

import {
  fetchArticleDetail,
  fetchArticleLabel,
  fetchSimArticle,
  fetchSimLiterature,
} from "../../store/action/ArticleAction.js";



class Details extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  componentDidMount() {
    this.node.scrollIntoView();
    const {match:{params}}=this.props;
    const { props: {
      fetchArticleDetail,
      fetchArticleLabel,
      fetchSimArticle,
      fetchSimLiterature
    } } = this;
    fetchArticleDetail(params.detailId);
    fetchArticleLabel(params.detailId);
    fetchSimArticle(params.detailId);
    fetchSimLiterature(params.detailId);
  }


  render() {
    return (
      <div className="hot" ref={node => this.node = node}>
        <Header />
        <Nav />
        <DetailsContent {...this.props}/>
        <SubFooter />
        <BackTop />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    article:state.article,
  };
};

export default connect(
  mapStateToProps,
  {
    fetchArticleDetail,
    fetchArticleLabel,
    fetchSimArticle,
    fetchSimLiterature,
  }
)(withRouter(Details));
