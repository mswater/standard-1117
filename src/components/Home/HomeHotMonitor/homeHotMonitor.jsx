import React from "react";
import { Spin, Icon } from "antd";
import { siblings } from "../../../lib/tools/utils.js";
import dividerLeft from "../../../images/divider-left.png";
import dividerRight from "../../../images/divider-right.png";
import dotWhiteThree from "../../../images/dot-white-three.png";

import "./index.css";

class HomeHotMonitor extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      showLeft: false,
      showRight: true,
      hotDataType: 0
    };
    this.nextFlag = false;
    this.prevFlag = false;
  }

  componentDidMount(){
    const { home: { hotData} } = this.props;
    if(hotData && hotData.length !== 0){
      this.addEvent();
    }
  }

  componentDidUpdate() {
    const { home: { hotData} } = this.props;
    if(hotData && hotData.length !== 0){
      this.addEvent();
    }
  }

  hotDetails = (detailId) => {
    const url = window.location.origin;
    window.open(`${url}/detail/${detailId}`,"_blank");
  };

  hotLinkFunc = (hotData) => {
    const { hotDataType } = this.state;
    const { history } = this.props;
    const hotId = hotData[hotDataType].hid;
    localStorage.setItem("hotContent", hotId);
    localStorage.setItem("readingId", hotId);
    history.push("/hot");
  };

  showNext = () => {
    if (!this.nextFlag){
      this.nextFlag = true;
      setTimeout(() => {
        const { box } = this;
        const left = parseInt(getComputedStyle(box, null).marginLeft, 0);
        const width = parseInt(getComputedStyle(box, null).width, 0);
        this.setState({
          showLeft: true,
        }, () => {
          if (Math.abs(left) + 1000 >= width) {
            this.setState({
              showRight: false
            });
          }
          this.nextFlag = false;
          box.style.marginLeft = `${left-200}px`;
        });
      }, 500);
    }
  };

  showPrev = () => {
    if (!this.prevFlag) {
      this.prevFlag = true;
      setTimeout(() => {
        const { box } = this;
        const left = parseInt(getComputedStyle(box, null).marginLeft, 0);
        this.setState({
          showRight: true,
        }, () => {
          if (left >= -200) {
            this.setState({
              showLeft: false
            });
          }
          this.prevFlag = false;
          box.style.marginLeft = `${left+200}px`;
        });
      }, 500);
    }
  };


  clickType = (type) => {
    this.setState({
      hotDataType: type
    });
  };

  hotDataFunc = (hotData) => {
    if(hotData && hotData.length !== 0){
      const { hotDataType } = this.state;
      const data =  hotData[hotDataType].contentList;
      const leftArr = [];
      const rightArr = [];
      for (let i = 0; i < data.length; i+=1) {
        if (i%2 === 0) {
          rightArr.push(data[i]);
        }
        if (i%2 !== 0) {
          leftArr.push(data[i]);
        }
      }
      return [leftArr, rightArr];
    }
    return hotData;
  };

  checkType() {
    /* eslint-disable no-param-reassign */
    siblings(this).forEach((item, index, arr) => {
      arr[index].children[0].style.backgroundColor = "#81b1d7";
      arr[index].children[0].style.color = "#fff";
      arr[index].children[0].style.borderTop = "3px solid #81b1d7";
    });
    this.children[0].style.backgroundColor = "#fff";
    this.children[0].style.color = "#0578db";
    this.children[0].style.borderTop = "3px solid #0578db";
  }

  addEvent() {
    const { box } = this;
    const arr = box.children|| [];
    const ways = [];
    for (let i = 0; i < arr.length; i+=1) {
      ways.push(arr[i]);
    }
    Array.prototype.forEach.call(ways, (item) => {
      item.addEventListener("click", this.checkType);
    });
  }

  render() {
    const { home: { fetchHotTopicLoading, hotData} } = this.props;
    const { showLeft, showRight } = this.state;
    const leftItem = this.hotDataFunc(hotData)[0]
      && this.hotDataFunc(hotData)[0].map((cur, index) => {
        if(index === 0){
          return(
            <div className="home-hot-monitor-main-left" key={index.toString()}>
              <div className="home-hot-monitor-main-left-title">
                <a onClick={() => {return this.hotDetails(cur.id);}} title={cur.fArticleTitle}>
                  <p>{cur.fArticleTitle}</p>
                </a>
                <p>
                  <span>发布时间：{(cur.fArticleTime || "").split(" ").splice(0,1)}</span>
                  <span>来源：{cur.fJobName}</span>
                </p>
              </div>
            </div>
          );
        }
        return (
          <div key={index.toString()} className="home-hot-monitor-center-item">
            <a onClick={() => {return this.hotDetails(cur.id);}}>
              <img src={dotWhiteThree} alt=""/>
              <p title={cur.fArticleTitle}>{cur.fArticleTitle}</p>
            </a>
          </div>
        );
      });
    const rightItem = this.hotDataFunc(hotData)[1]
      && this.hotDataFunc(hotData)[1].map((cur, index) => {
        if(index === 0){
          return(
            <div className="home-hot-monitor-main-left" key={index.toString()}>
              <div className="home-hot-monitor-main-left-title">
                <a onClick={() => {return this.hotDetails(cur.id);}}>
                  <p>{cur.fArticleTitle}</p>
                </a>
                <p>
                  <span>发布时间：{(cur.fArticleTime || "").split(" ").splice(0,1)}</span>
                  <span>来源：{cur.fJobName}</span>
                </p>
              </div>
            </div>
          );
        }
        return (
          <div key={index.toString()} className="home-hot-monitor-center-item">
            <a onClick={() => {return this.hotDetails(cur.id);}}>
              <img src={dotWhiteThree} alt=""/>
              <p>{cur.fArticleTitle}</p>
            </a>
          </div>
        );
      });

    const btnItem = hotData && hotData.map((cur, index) => {
      return (
        <div
          className="home-hot-monitor-btn"
          key={index.toString()}
          onClick={() => {this.clickType(index);}}
        >
          <button type="button">
            {cur.name}
          </button>
        </div>
      );
    });
    return (
      <div>
        {
          (hotData && hotData.length>0)
          &&
          <div className="home-hot-monitor">
            <div className="home-hot-monitor-center">
              <div className="home-hot-monitor-title">
                <div className="home-hot-monitor-top">
                  <img src={dividerLeft} alt=""/>
                  <span>热点监测</span>
                  <img src={dividerRight} alt=""/>
                </div>
                <span>HOT INFORMATION</span>
              </div>
              <div className="home-hot-monitor-wrap">
                {(showLeft) && (<Icon type="left" onClick={this.showPrev}/>)}
                <div className="home-hot-monitor-out">
                  <div
                    className="home-hot-monitor-type clear"
                    style={{width: `${btnItem.length * 200}px`}}
                    ref={(ref) => {this.box = ref;}}
                  >
                    {btnItem}
                  </div>
                </div>
                {(btnItem.length > 4 ? showRight : false) &&
                (<Icon type="right" onClick={this.showNext}/>)}
              </div>
              {fetchHotTopicLoading ? <div className="spin"><Spin /></div> :
                <div className="home-hot-monitor-main">
                  <div className="home-hot-monitor-box">
                    <div className="home-hot-monitor-main-left">
                      {leftItem}
                    </div>
                    <div className="home-hot-monitor-main-right">
                      {rightItem}
                    </div>
                    <div className="home-hot-monitor-more">
                      <span onClick={() => {
                        return this.hotLinkFunc(hotData);
                      }}
                      >
                        MORE+
                      </span>
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
        }
      </div>
    );
  }
}

export default HomeHotMonitor;
