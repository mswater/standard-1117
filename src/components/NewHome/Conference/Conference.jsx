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
          className={index === 0 ? "active clear" : "clear"}
        >
          <div className="l-info fl">
            <h1>{cur.fArticleTitle}</h1>
            <label>山西省太原市</label>
            <label className="fr">山西省展览馆</label>
          </div>
          <div className="r-info fr">
            <p>2020/12/4---2020/12/5</p>
            <p className="countdown">距开幕24天</p>
          </div>
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
            <h1>国外国外{cur.fArticleTitle}</h1>
            <label>山西省太原市</label>
            <label className="fr">山西省展览馆</label>
          </div>
          <div className="r-info fr">
            <p>2020/12/4---2020/12/5</p>
            <p className="countdown">距开幕24天</p>
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

