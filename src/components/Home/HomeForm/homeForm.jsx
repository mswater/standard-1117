import React from "react";
import { Spin } from "antd";
import dividerRight from "../../../images/divider-right.png";

import "./index.css";

class HomeForm extends React.Component{
  constructor(props) {
    super(props);
    this.state={};
  }

  statLinkFunc = () =>{
    const { history } = this.props;
    history.push("/analysis");
  };

  briefLinkFunc = (token) =>{
    window.open(`/managecenter/brief?uid=${token}`,"_self");
  };

  render() {
      const token = localStorage.getItem("token");
      const {
        home:{
          reportData,
          statData,
          fetchBriefReportLoading,
          fetchStatLoading,
        }
      } = this.props;
    /* eslint-disable no-nested-ternary */
    const firstItem = reportData && reportData.map((cur, index) => {
      return (
        <a
          href={`/managecenter/upload/${cur.title}.pdf?uid=${token}`}
          target="_blank"
          rel="noopener noreferrer"
          key={index.toString()}
          className="home-form-link"
        >
          <div className="home-form-right-single">
            <div
              className={`paper ${ (cur.typeName === "月报") ? "month" :
                (cur.typeName === "日报" ? "day":(cur.typeName === "周报" ? "week" : "special")) }`}
            >
              <b>
                {cur.typeName}
              </b>
            </div>
            <i/>
            <span>
              {cur.creattime}
            </span>
            <span>
              {cur.title}
            </span>
          </div>
        </a>
      );
    });

    const tableData = [];
    const typeArray = [];
    typeArray.push("");
    for (let i = 0; i < (statData && statData.length); i+=1) {
      const {type} = statData[i];
      typeArray.push(type);
    }
    tableData.push(typeArray);
    const nameArray = statData[0].childTotalArray;
    for (let i = 0; i < (nameArray && nameArray.length); i+=1) {
      const {cName} = nameArray[i];
      const cNameArray = [];
      cNameArray.push(cName);
      for (let i = 0; i < (statData && statData.length); i+=1) {
        const child = statData[i].childTotalArray;
        for (let i = 0; i < (child && child.length); i+=1) {
          const name = child[i].cName;
          const total = child[i].cTotal;
          if (name === cName) {
            cNameArray.push(total);
          }
        }
      }
      tableData.push(cNameArray);
    }
    const trDom = tableData && tableData.map((item, i)=>{
      return (
        <tr key={i.toString()}>
          {item.map((res, n)=> {
            return (
              <td key={n.toString()}>{res}</td>
            );
          })}
        </tr>
      );
    });
    return (
      <div className="home-form">
        <div className="home-form-center">
          <div className="home-form-left">
            <div className="home-form-title">
              <div>
                <span className="name-cn">对比数据</span>
                <span className="name-en">COMPARISON DATA</span>
              </div>
              <div
                className="home-form-more"
                onClick={()=>{return this.statLinkFunc();}}
              >
                MORE+
              </div>
            </div>
            <div className="home-form-img">
              <img src={dividerRight} alt=""/>
            </div>
            <div className="home-form-left-content">
              {fetchStatLoading ?
                <div className="spin"><Spin/></div> :
                <table>
                  <tbody>
                    {trDom.slice(0,8)}
                  </tbody>
                </table>
              }
            </div>
          </div>
          <div className="home-form-right">
            <div className="home-form-title">
              <div>
                <span className="name-cn">简报</span>
                <span className="name-en">REPORT</span>
              </div>
              <div
                className="home-form-more"
                onClick={()=>{return this.briefLinkFunc(token);}}
              >
                MORE+
              </div>
            </div>
            <div className="home-form-img">
              <img src={dividerRight} alt=""/>
            </div>
            {fetchBriefReportLoading ?
              <div className="spin"><Spin /></div>
              : <div className="home-form-right-content">{firstItem}</div>}
          </div>
        </div>
      </div>
    );
  }
}

export default HomeForm;
