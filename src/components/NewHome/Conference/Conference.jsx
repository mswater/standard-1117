import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Spin } from "antd";
import { changeConferenceTab,} from "../../../store/action/HomeAction";
import {siblings} from "../../../lib/tools/utils";
import "./index.css";

class Conference extends React.Component{
  constructor(props) {
    super(props);
    this.state = {};
  }

  changeTab = (params) => {
    const {
      changeConferenceTab
    } = this.props;
    changeConferenceTab(params);
  }

  changeActiveItem = (e) => {
    siblings(e.currentTarget).forEach((item) => {
      item.setAttribute("class", "clear");
    });
    e.currentTarget.setAttribute("class", "active clear");
  }

  goMeetingPage = () => {
    // 记录从首页会议模块进入会议列表页
    localStorage.setItem("meetingFrom", "index");
    const { props } = this;
    props.history.push({
      pathname: "/meeting",
    });
  };

  render(){
    const {
      home : {
        conferenceTab,
        fetchMeetingLoading,
        meetingHomeData,
        meetingAboardData,
      }
    } = this.props;
    const homeConference = meetingHomeData && meetingHomeData.map((cur, index) => {
      return (
        <li
          key={index.toString()}
          onMouseEnter={this.changeActiveItem}
          className={index === 0 ? "active" : ""}
        >
          <a
            className="clear"
            href={cur.fPageUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="l-info fl">
              <h1>{cur.fArticleTitle}</h1>
              <label>{cur.fArticleAddress}</label>
            </div>
            <div className="r-info fr">
              <p>{cur.fArticleTime}</p>
              <p className="countdown">{cur.timeLag}</p>
            </div>
          </a>
        </li>
      );
    });
    const aboardConference = meetingAboardData && meetingAboardData.map((cur, index) => {
      return (
        <li
          key={index.toString()}
          onMouseEnter={this.changeActiveItem}
          className={index === 0 ? "active clear" : "clear"}
        >
          <div className="l-info fl">
            <h1>{cur.fArticleTitle}</h1>
            <label>{cur.fArticleAddress}</label>
          </div>
          <div className="r-info fr">
            <p>{cur.fArticleTime}</p>
            <p className="countdown">{cur.timeLag}</p>
          </div>
        </li>
      );
    });
    return (
      <div className="conference-con">
        <div className="conference-tag">
          <label
            className={conferenceTab === "home" ? "current" : ""}
            onClick={() => this.changeTab("home")}
          >
            国内会议
          </label>
          <label
            className={conferenceTab === "aboard" ? "current" : ""}
            onClick={() => this.changeTab("aboard")}
          >
            国外会议
          </label>
        </div>
        <div>
          <ul>
            {fetchMeetingLoading ?  <div className="spin"><Spin /></div> :
              (conferenceTab === "home" && homeConference)}
            {conferenceTab === "aboard" && aboardConference }
          </ul>
        </div>
        <a
          className="single-more"
          onClick={() => {return this.goMeetingPage();}}
        >
          MORE&gt;&gt;
        </a>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state
  };
};

export default connect(
  mapStateToProps,
  {
    changeConferenceTab
  },
)(withRouter(Conference));

