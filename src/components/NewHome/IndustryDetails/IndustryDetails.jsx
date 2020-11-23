import React from "react";
import "./index.css";

class IndustryDetails extends React.Component{
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { className } = this.props;
    return (
      <li className={className}>
        <div className="sub-title">
          <label>政策法规</label>
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
  }
}
export default IndustryDetails;
