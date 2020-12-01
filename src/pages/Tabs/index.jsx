import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import "./index.css";
import Header from "../../components/Common/Header/header.jsx";
import Nav from "../../components/Common/Nav/nav.jsx";
import SubFooter from "../../components/Common/SubFooter/subFooter.jsx";
import TabsContent from "../../components/Tab/TabsContent/tabsContent.jsx";
import BackTop from "../../components/Common/BackTop/BackTop.jsx";

import {
  fetchArticleLabelList,
  fetchTabsTypeName,
  fetchArticleCollect,
  fetchArticleCancelCollect
} from "../../store/action/ArticleAction.js";

class Tabs extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
    };
  }




  componentDidMount() {
    this.node.scrollIntoView();
    const tabsTitle = localStorage.getItem("tabsTitle");
    const {
      fetchArticleLabelList,
      article:{
        tabsTypeName,
      },
    } = this.props;
    const params={
      label:tabsTitle,
      type: tabsTypeName,
      pageNum: 1,
      pageSize: 10
    };
    fetchArticleLabelList(params);
  }


  componentWillUnmount() {
    const { fetchTabsTypeName } = this.props;
    fetchTabsTypeName("资讯");
    localStorage.setItem("tabsTitle","");
  }


  render() {
    return (
      <div className="hot-tabs" ref={node => this.node = node}>
        <Header />
        <Nav />
        <TabsContent {...this.props}/>
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
    fetchArticleLabelList,
    fetchTabsTypeName,
    fetchArticleCollect,
    fetchArticleCancelCollect
  }
)(withRouter(Tabs));
