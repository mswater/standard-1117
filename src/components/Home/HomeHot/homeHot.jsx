import React from "react";
import { Spin } from "antd";
import "./index.css";
import divider from "../../../images/divider-right.png";


class HomeHot extends React.Component {

  componentDidMount() {
  }

  meetingList = () => {
    const { props } = this;
    props.history.push({
      pathname: "/meeting",
    });
  };

  searchList = (hotword) => {
    const {
      history,
      fetchHeaderSearch,
      fetchSearchThemeSearchFlag
    } = this.props;
    fetchHeaderSearch(hotword);
    fetchSearchThemeSearchFlag(true);
    localStorage.setItem("searchOrderType", 3);
    history.push({
      pathname: "/search",
    });
  };

  hotDetails = (detailId) => {
    const url = window.location.origin;
    window.open(`${url}/detail/${detailId}`,"_blank");
  };

  render() {
    const {
      home: {
        infoData,
        chineseData,
        fetchHotInformationLoading,
        fetchHotWordsLoading,
        fetchMeetingLoading,
        meetingHomeData,
      }
    } = this.props;
    const styleItem = ["#26C8D1","#5890DF","#8BB1ED","#E2A558","#81C06D","#EA6874"];
    const firstItem = infoData && infoData.map((cur, index) => {
      return (
        <div
          className="home-hot-info-single"
          key={index.toString()}
          onClick={() => {return this.hotDetails(cur.id);}}
        >
          <p title={cur.fArticleTitle}>{cur.fArticleTitle}</p>
          <span>{cur.fJobName}</span>
          <span>{(cur.fArticleTime || "").split(" ").splice(0,1)}</span>
        </div>
      );
    });
    const secondItem = chineseData && chineseData.map((cur, index) => {
      return (
        <span
          key={index.toString()}
          style={{backgroundColor:styleItem[index]}}
          onClick={() => {return this.searchList(cur.hotword);}}
          title={cur.hotword}
        >
          {cur.hotword}
        </span>
      );
    });
    const meetingItem = meetingHomeData && meetingHomeData.map((cur, index) => {
      if(index === 0){
        return(
          <div className="home-hot-meeting-single-first" key={cur.id}>
            <a
              rel="noopener noreferrer"
              href={cur.fPageUrl}
              target="_blank"
            >
              <div className="headline">
                <span className="headline-left">
                  {cur.fArticleTitle}
                </span>
                <span className="headline-right">{cur.timeLag}</span>
              </div>
              <div className="meeting-date">
                <span>{(cur.onlineTime || "").split(" ").splice(0,1)}</span>
                <span>{cur.fArticleAddress}</span>
              </div>
              <div className="meeting-detail" title={cur.fArticleContent}>
                {cur.fArticleContent}
              </div>
            </a>
          </div>
        );
      }
      return (
        <div className="home-hot-meeting-single" key={index.toString()}>
          {cur.timeLag.search("后") !== -1 ?
            (
              <span className="meeting-single-date">
                {(cur.onlineTime || "").split(" ").splice(0,1)}
              </span>
            ) :
            (
              <span className="meeting-single-date-after">
                {(cur.onlineTime || "").split(" ").splice(0,1)}
              </span>
            )
          }
          {cur.timeLag.search("后") !== -1 ?
            (
              <span className="meeting-single-auth">{cur.fArticleAddress}</span>
            ) :
            (
              <span className="meeting-single-auth-after">
                {cur.fArticleAddress}
              </span>
            )
          }
          <p className="meeting-single-title">
            {cur.timeLag.search("后") !== -1 ?
              (
                <a
                  rel="noopener noreferrer"
                  href={cur.fPageUrl}
                  target="_blank"
                  title={cur.fArticleTitle}
                >
                  {cur.fArticleTitle}
                </a>
              ):(
                <a
                  rel="noopener noreferrer"
                  href={cur.fPageUrl}
                  target="_blank"
                  style={{color:"#a1a1a1"}}
                  title={cur.fArticleTitle}
                >
                  {cur.fArticleTitle}
                </a>
              )}
          </p>
        </div>
      );
    });
    return (
      <div className="home-hot-box">
        <div className="home-hot">
          <div className="home-hot-info">
            <div className="home-hot-title">
              <span className="title-cn">热门资讯</span>
              <span className="title-en">HOT INFORMATION</span>
            </div>
            <div className="divider"><img src={divider} alt=""/></div>
            <div
              className="home-hot-info-content"
            >
              {fetchHotInformationLoading ?  <div className="spin"><Spin /></div> : firstItem}
            </div>
          </div>
          <div className="home-hot-meeting">
            <div className="home-hot-title">
              <span className="title-cn">行业会议</span>
              <span className="title-en">MEETING</span>
              <span
                className="more"
                onClick={() => {return this.meetingList();}}
              >
                MORE+
              </span>
            </div>
            <div className="divider"><img src={divider} alt=""/></div>
            <div className="home-hot-meeting-content">
              {fetchMeetingLoading ?  <div className="spin"><Spin /></div> : meetingItem}
            </div>
          </div>
        </div>
        <div className="hot-word-box">
          <div className="hot-word">
            <div className="hot-word-title">资讯热词</div>
            {fetchHotWordsLoading ?
              <div className="spin"><Spin /></div>
              : <div className="hot-word-content">{secondItem} </div>}
          </div>
        </div>
      </div>
    );
  }
}

export default HomeHot;

