import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Header from "../../components/Common/Header/header.jsx";
import Nav from "../../components/Common/Nav/nav.jsx";
import SubFooter from "../../components/Common/SubFooter/subFooter.jsx";
import BackTop from "../../components/Common/BackTop/BackTop.jsx";

import "./index.css";
import AnalysisContent from "../../components/Analysis/AnalysisContent/analysisContent.jsx";

import {
  fetchAnalyseList,
  fetchAnalyseContentList,
  fetchAnalyseDataCompar,
  fetchAnalyseTendencyCompar,
  fetchAnalyseMenuAndType,
  fetchAnalyseResetButton,
  fetchAnalyseTypeName,
  fetchAnalyseMenuKey,
  fetchAnalyseDate
} from "../../store/action/AnalyseAction.js";


class Analysis extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    this.node.scrollIntoView();
    const {
      fetchAnalyseList,
      fetchAnalyseContentList,
      fetchAnalyseDataCompar,
      fetchAnalyseTendencyCompar,
      analyse:{
        analyseMenuKey,
        analyseTypeName,
        analyseMenuAndTypeData: {
          id,
        },
        analyseDate
      },
    } = this.props;
    const params = {
      pid:id,
      cid: !analyseMenuKey ? 4 :analyseMenuKey,
      type:analyseTypeName || "资讯",
      pageNum: 1,
      pageSize: 10,
    };
    const obj = {
      pid: id,
      type: analyseDate,
    };
    const item = {
      pid: id,
      artilceType: analyseTypeName || "资讯",
      type: analyseDate,
    };
    fetchAnalyseList();
    fetchAnalyseContentList(params);
    // 行业分析 数据对比表格
    fetchAnalyseDataCompar(obj);
    // 行业分析 对比图表
    fetchAnalyseTendencyCompar(item);
  }

  componentWillUnmount() {
    const {
      fetchAnalyseTypeName,
      fetchAnalyseMenuKey,
      fetchAnalyseMenuAndType,
      fetchAnalyseDate
    } = this.props;
    const params = {
      child:[],
      typs:[],
      name: "机构分析",
      id: 1
    };
    fetchAnalyseDate();
    fetchAnalyseTypeName("资讯");
    fetchAnalyseMenuKey();
    fetchAnalyseMenuAndType(params);
  }


  render() {
    return (
      <div className="analysis" ref={node => this.node = node}>
        <Header />
        <Nav />
        <AnalysisContent {...this.props}/>
        <SubFooter />
        <BackTop />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    analyse:state.analyse,
  };
};

export default connect(
  mapStateToProps,
  {
    fetchAnalyseList,
    fetchAnalyseContentList,
    fetchAnalyseDataCompar,
    fetchAnalyseTendencyCompar,
    fetchAnalyseMenuAndType,
    fetchAnalyseResetButton,
    fetchAnalyseTypeName,
    fetchAnalyseMenuKey,
    fetchAnalyseDate
  }
)(withRouter(Analysis));

