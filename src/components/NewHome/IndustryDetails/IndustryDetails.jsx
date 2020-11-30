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
    const url = window.location.origin;
    window.open(`${url}/detail/${detailId}`,"_blank");
  };

  render() {
    const {
      home: {
        infoData,
        fetchHotInformationLoading,
      }
    } = this.props;
    const industryList = [
      {
        "title": "政策法规",
        "img": industryImg1,
      },
      {
        "title": "新闻资讯",
        "img": industryImg2,
      },
      {
        "title": "项目信息",
        "img": industryImg3,
      },
      {
        "title": "专业报告",
        "img": industryImg4,
      },
    ];
    const industryItems = infoData && infoData.map((cur, index) => {
      return (
        <div
          className="per-item clear"
          key={index.toString()}
          onClick={() => {return this.hotDetails(cur.id);}}
        >
          <label>{cur.fArticleTitle}</label>
          <span>{cur.fArticleTime}</span>
        </div>
      );
    });
    return (
      <ul className="clear">
        {industryList.map((item, index) => {
          const clsName = index % 2 === 0 ? "fl" : "fr";
          return (
            <li
              key={index.toString()}
              className={clsName}
            >
              <div className="sub-title">
                <label>{item.title}</label>
                <a>MORE&gt;&gt;</a>
              </div>
              <div className="industry-detail clear">
                <div className="detail-l">
                  <img src={item.img} alt={item.title}/>
                </div>
                <div className="detail-r">
                  {fetchHotInformationLoading ?
                    <div className="spin"><Spin /></div> :
                    industryItems}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    );
  }
}
export default IndustryDetails;
