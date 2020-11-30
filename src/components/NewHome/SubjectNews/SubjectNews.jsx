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
    window.open(`${url}/managecenter/upload/${title}.pdf?uid=${token}`,"_blank");
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
          rel="noopener noreferrer"
          key={index.toString()}
        >
          <a
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
            <div>
              <ul>{newsItem}</ul>
              <a className="single-more">MORE&gt;&gt;</a>
            </div>
          )
        }
      </div>
    );
  }
}

export default SubjectNews;
