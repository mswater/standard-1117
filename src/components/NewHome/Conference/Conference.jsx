import React from "react";
import "./index.css";

class Conference extends React.Component{
  constructor(props) {
    super(props);
    this.state = {};
  }

  render(){
    return (
      <div className="conference-con">
        <div className="conference-tag">
          <label className="current">国内会议</label>
          <label>国外会议</label>
        </div>
        <div>
          <ul>
            <li className="active clear">
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
        </div>
        <a className="single-more">MORE&gt;&gt;</a>
      </div>
    );
  }
}

export default Conference;
