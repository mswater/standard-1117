import React from "react";
import "./index.css";

class IndustryDetails extends React.Component{
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const industryList = [
      {
        "title": "政策法规"
      },
      {
        "title": "新闻资讯"
      },
      {
        "title": "项目信息"
      },
      {
        "title": "专业报告"
      },
    ];
    return (
      <ul className="clear">
        {industryList.map((item, index) => {
          const clsName = index % 2 === 0 ? "fl" : "fr";
          return (
            <li className={clsName}>
              <div className="sub-title">
                <label>{item.title}</label>
                <a>MORE&gt;&gt;</a>
              </div>
              <div className="industry-detail clear">
                <div className="detail-l">
                  <img src="" alt=""/>
                </div>
                <div className="detail-r">
                  <a href="" className="clear">
                    <label>中央第九巡视组巡视农业农村部党组工作会议</label>
                    <span>2020-10-12</span>
                  </a>
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
