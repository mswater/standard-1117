import React from "react";
import "./index.css";
import { Spin } from "antd";

class SubjectNews extends React.Component{
  constructor(props) {
    super(props);
    this.state = {};
  }

  newsDetails = (title) => {
    const token = localStorage.getItem("token");
    const url = window.location.origin;
    window.open(`${url}/managecenter/brief/download?fileName=${title}.pdf&uid=${token}`,"_blank");
  };

  goReportPage = () => {
    const { props } = this;
    props.history.push({
      pathname: "/report",
    });
  };

  render(){
    const {
      home:{
        reportData,
        fetchBriefReportLoading,
      }
    } = this.props;
    const newsItem = reportData && reportData.map((cur, index) => {
      return (
        <li
          key={index.toString()}
        >
          <a
            rel="noopener noreferrer"
            className="clear"
            onClick={() => this.newsDetails(cur.title)}
          >
            <label>{cur.title}</label>
            <span className="fr">{cur.creattime.split(" ")[0]}</span>
          </a>
        </li>
      );
    });

    return (
      <div>
        {fetchBriefReportLoading ?
          <div className="spin"><Spin /></div>
          : (
            <div className="subject-news-con">
              <ul>{newsItem}</ul>
              <a
                className="single-more"
                onClick={() => {return this.goReportPage();}}
              >
                MORE&gt;&gt;
              </a>
            </div>
          )
        }
      </div>
    );
  }
}

export default SubjectNews;
