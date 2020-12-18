import React from "react";
import "./index.css";
import { Spin } from "antd";

import industryImg1 from "../../../images/industryImg1.jpg";
import industryImg2 from "../../../images/industryImg2.jpg";
import industryImg3 from "../../../images/industryImg3.jpg";
import industryImg4 from "../../../images/industryImg4.jpg";

class IndustryDetails extends React.Component{
  constructor(props) {
    super(props);
    this.state = {};
  }

  hotDetails = (detailId) => {
    localStorage.setItem("articleType", "");
    const url = window.location.origin;
    window.open(`${url}/detail/${detailId}`,"_blank");
  };

  hotLinkFunc = (hotId) => {
    const { history } = this.props;
    localStorage.setItem("hotContent", hotId);
    localStorage.setItem("readingId", hotId);
    history.push("/hot");
  };

  render() {
    const {
      home: {
        fetchHotTopicLoading,
        hotData,
      }
    } = this.props;
    const industryList = [
      {
        "img": industryImg1,
      },
      {
        "img": industryImg2,
      },
      {
        "img": industryImg3,
      },
      {
        "img": industryImg4,
      },
    ];
    const industryItems = hotData && hotData.map((cur, index) => {
      const clsName = index % 2 === 0 ? "fl" : "fr";
      const industryDetailsList = cur.contentList;
      const industryDetails = industryDetailsList
        && industryDetailsList.map((detailsItem, index2) => {
          return (
            <div
              className="per-item clear"
              key={index2.toString()}
              onClick={() => {return this.hotDetails(detailsItem.id);}}
            >
              <label>{detailsItem.fArticleTitle}</label>
              <span>{detailsItem.fArticleTime}</span>
            </div>
          );
        });
      const imgSrc = index < 4 ? industryList[index].img : "";
      return (
        <li
          key={index.toString()}
          className={clsName}
        >
          <div className="sub-title">
            <label>{cur.name}</label>
            <a
              rel="noopener noreferrer"
              onClick={() => {return this.hotLinkFunc(cur.hid);}}
            >
              MORE&gt;&gt;
            </a>
          </div>
          <div className="industry-detail clear">
            <div className="detail-l">
              <img src={imgSrc} alt={cur.name}/>
            </div>
            <div className="detail-r">
              {industryDetails}
            </div>
          </div>
        </li>
      );

    });
    return (
      <ul className="clear">
        {fetchHotTopicLoading ?
          <div className="spin"><Spin /></div> :
          industryItems
        }
      </ul>
    );
  }
}
export default IndustryDetails;
