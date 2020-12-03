import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
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

  render(){
    const {
      home : {
        conferenceTab,
      }
    } = this.props;
    const homeConference = () => {
      return (
        <ul>
          <li
            onMouseEnter={this.changeActiveItem}
            className="active clear"
          >
            <div className="l-info fl">
              <h1>第七届中国（山西）国际现代农业博览会现代农业</h1>
              <label>山西省太原市</label>
              <label className="fr">山西省展览馆</label>
            </div>
            <div className="r-info fr">
              <p>2020/12/4---2020/12/5</p>
              <p className="countdown">距开幕24天</p>
            </div>
          </li>
          <li
            onMouseEnter={this.changeActiveItem}
            className="clear"
          >
            <div className="l-info fl">
              <h1>第七届中国（山西）国际现代农业博览会现代农业</h1>
              <label>山西省太原市</label>
              <label className="fr">山西省展览馆</label>
            </div>
            <div className="r-info fr">
              <p>2020/12/4---2020/12/5</p>
              <p className="countdown">距开幕24天</p>
            </div>
          </li>
          <li
            onMouseEnter={this.changeActiveItem}
            className="clear"
          >
            <div className="l-info fl">
              <h1>第七届中国（山西）国际现代农业博览会现代农业</h1>
              <label>山西省太原市</label>
              <label className="fr">山西省展览馆</label>
            </div>
            <div className="r-info fr">
              <p>2020/12/4---2020/12/5</p>
              <p className="countdown">距开幕24天</p>
            </div>
          </li>
        </ul>
      );
    };
    const aboardConference = () => {
      return (
        <ul>
          <li className="active clear">
            <div className="l-info fl">
              <h1>国外新闻第七届中国（山西）国际现代农业博览会现代农业</h1>
              <label>山西省太原市</label>
              <label className="fr">山西省展览馆</label>
            </div>
            <div className="r-info fr">
              <p>2020/12/4---2020/12/5</p>
              <p className="countdown">距开幕24天</p>
            </div>
          </li>
          <li className="clear">
            <div className="l-info fl">
              <h1>第七届中国（山西）国际现代农业博览会现代农业</h1>
              <label>山西省太原市</label>
              <label className="fr">山西省展览馆</label>
            </div>
            <div className="r-info fr">
              <p>2020/12/4---2020/12/5</p>
              <p className="countdown">距开幕24天</p>
            </div>
          </li>
          <li className="clear">
            <div className="l-info fl">
              <h1>第七届中国（山西）国际现代农业博览会现代农业</h1>
              <label>山西省太原市</label>
              <label className="fr">山西省展览馆</label>
            </div>
            <div className="r-info fr">
              <p>2020/12/4---2020/12/5</p>
              <p className="countdown">距开幕24天</p>
            </div>
          </li>
        </ul>
      );
    };
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
          {conferenceTab === "home" ? homeConference() : ""}
          {conferenceTab === "aboard" ? aboardConference() : ""}
        </div>
        <a className="single-more">MORE&gt;&gt;</a>
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

