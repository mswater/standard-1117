import React from "react";
import "./index.css";

class SubjectNews extends React.Component{
  constructor(props) {
    super(props);
    this.state = {};
  }

  render(){
    return (
      <div>
        <ul>
          <li>
            <label className="fl">2020年11月学科快讯</label>
            <label className="tx-r fr">2020-11-12</label>
          </li>
          <li>
            <label className="fl">2020年11月学科快讯</label>
            <label className="tx-r fr">2020-11-12</label>
          </li>
          <li>
            <label className="fl">2020年11月学科快讯</label>
            <label className="tx-r fr">2020-11-12</label>
          </li>
          <li>
            <label className="fl">2020年11月学科快讯</label>
            <label className="tx-r fr">2020-11-12</label>
          </li>
          <li>
            <label className="fl">2020年11月学科快讯</label>
            <label className="tx-r fr">2020-11-12</label>
          </li>
        </ul>
        <a className="single-more">MORE&gt;&gt;</a>
      </div>
    );
  }
}

export default SubjectNews;
