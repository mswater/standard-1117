import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import "./index.css";
import Header from "../../components/Common/Header/header.jsx";
import Nav from "../../components/Common/Nav/nav.jsx";
import Footer from "../../components/Common/Footer/footer.jsx";
import DetailsContent from "../../components/Detail/DetailsContent/detailsContent.jsx";
import BackTop from "../../components/Common/BackTop/BackTop.jsx";

import {
  fetchArticleDetail,
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
    const articleType = localStorage.getItem("articleType");
    const {
      fetchArticleDetail,
    } = this.props;
    fetchArticleDetail(params.detailId, articleType);
  }


  render() {
    return (
      <div className="hot" ref={node => this.node = node}>
        <Header />
        <Nav />
        <DetailsContent {...this.props}/>
        <Footer />
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
  }
)(withRouter(Details));
