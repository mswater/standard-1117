import React from "react";
import { connect } from "react-redux";
import { Form } from "antd";
import { withRouter } from "react-router";

import "./index.css";
import Header from "../../components/Common/Header/header.jsx";
import Nav from "../../components/Common/Nav/nav.jsx";
import HomeHot from "../../components/Home/HomeHot/homeHot.jsx";
import HomeHotMonitor from "../../components/Home/HomeHotMonitor/homeHotMonitor.jsx";
import Footer from "../../components/Common/Footer/footer.jsx";
import HomeCarousel from "../../components/Home/HomeCarousel/homeCarousel.jsx";
import HomeSubject from "../../components/Home/HomeSubject/homeSubject.jsx";
import HomeDoc from "../../components/Home/HomeDoc/homeDoc.jsx";
import HomeForm from "../../components/Home/HomeForm/homeForm.jsx";
import BackTop from "../../components/Common/BackTop/BackTop.jsx";

import {
  fetchHotEnglishWords,
  fetchHotWords,
  fetchHotInformation,
  fetchHotTopic,
  fetchBriefReport,
  fetchActiveAuthor,
  fetchSubject,
  fetchNewestLiterature,
  fetchStat,
  fetchRecommendLiterature,
  fetchHotSubject,
  fetchMeeting,
  fetchHeaderSearch,
} from "../../store/action/HomeAction.js";
import {
  fetchSearchThemeSearchFlag
} from "../../store/action/SearchAction.js";


class Home extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  componentDidMount() {
    this.node.scrollIntoView();
    const {
      fetchHotEnglishWords,
      fetchHotWords,
      fetchHotInformation,
      fetchHotTopic,
      fetchBriefReport,
      fetchActiveAuthor,
      fetchSubject,
      fetchNewestLiterature,
      fetchStat,
      fetchRecommendLiterature,
      fetchHotSubject,
      fetchMeeting
    } = this.props;
    fetchHotEnglishWords();
    // 首页中文热词
    fetchHotWords();
    // 热门资讯
    fetchHotInformation();
    // 热点监测
    fetchHotTopic();
    // 简报
    fetchBriefReport();
    // 活跃作者
    fetchActiveAuthor();
    // 专题监测
    fetchSubject();
    // 最新文献
    fetchNewestLiterature();
    // 对比数据
    fetchStat();
    // 推荐文献
    fetchRecommendLiterature();
    // 首页热门主题图
    fetchHotSubject();
    // 首页会议
    fetchMeeting();
  }

  render() {
    return (
      <div className="home" ref={node => this.node = node}>
        <Header />
        <Nav />
        <HomeCarousel />
        <HomeHot {...this.props}/>
        <HomeHotMonitor {...this.props} />
        <HomeSubject {...this.props}/>
        <HomeDoc {...this.props}/>
        <HomeForm {...this.props}/>
        <Footer />
        <BackTop />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    home: state.home,
  };
};

export default connect(
  mapStateToProps,
  {
    fetchHotEnglishWords,
    fetchHotInformation,
    fetchHotTopic,
    fetchHotWords,
    fetchBriefReport,
    fetchActiveAuthor,
    fetchSubject,
    fetchNewestLiterature,
    fetchStat,
    fetchRecommendLiterature,
    fetchHotSubject,
    fetchMeeting,
    fetchHeaderSearch,
    fetchSearchThemeSearchFlag
  },
)(withRouter(Form.create()(Home)));

