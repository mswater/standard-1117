import React from "react";
import { Spin } from "antd";


import "./index.css";
import dotBlueThree from "../../../images/dot-blue-three.png";
import { siblings } from "../../../lib/tools/utils";
import dividerLeft from "../../../images/divider-left.png";
import dividerRight from "../../../images/divider-right.png";



class HomeDoc extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      recommendType: 1, // 推荐文献
      newsType: 1 // 最新文献
    };
  }

  componentDidMount(){
    this.addEvent();
    this.addEventType();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.home.newestLiteratureData && nextProps.home.newestLiteratureData.length > 0) {
      this.clickType(1);
    }
    if (nextProps.home.recommendLiteratureData
      && nextProps.home.recommendLiteratureData.length > 0) {
      this.clickMold(1);
    }
  }

  // 最新文献
  clickType = (type) => {
    const { fetchNewestLiterature} = this.props;
    this.setState({
      newsType: type
    }, () =>{
      fetchNewestLiterature(type);
    });
  };

  // 推荐文献
  clickMold = (type) => {
    const { fetchRecommendLiterature } = this.props;
    this.setState({
      recommendType: type
    }, () => {
      fetchRecommendLiterature(type);
    });
  };

  literatureRecommendFunc = () =>{
    const {
      history
    } = this.props;
    const { recommendType } = this.state;
    /* eslint-disable no-nested-ternary */
    localStorage.setItem("literatureContent", "421");
    const type = recommendType === 1 ? 5 : (recommendType === 2 ? 4 : 5);
    localStorage.setItem("literatureContact", type);
    localStorage.setItem("lId", "421");
    history.push("/literature");
  };

  literatureAllFunc = () =>{
    const {
      history,
    } = this.props;
    const { newsType } = this.state;
    localStorage.setItem("literatureContent", "");
    const type = newsType === 1 ? 5 : (newsType === 2 ? 4 : 5);
    localStorage.setItem("literatureContact", type);
    localStorage.setItem("lId", "");
    history.push("/literature");
  };


  // 英文热词链接到检索页的海外文献
  searchList = (englishword) => {
    const {
      history,
      fetchHeaderSearch,
      fetchSearchThemeSearchFlag
    } = this.props;
    fetchHeaderSearch(englishword);
    localStorage.setItem("searchContact", 5);
    localStorage.setItem("searchOrderType", 3);
    fetchSearchThemeSearchFlag(true);
    history.push({
      pathname: "/search",
    });
  };


  addEvent() {
    const { boxType } = this;
    const arr = boxType.children;
    const ways = [];
    for (let i = 0; i < arr.length; i+=1) {
      ways.push(arr[i]);
    }
    Array.prototype.forEach.call(ways, (item) => {
      item.addEventListener("click", this.checkTypeLiterature);
    });
  }

  addEventType() {
    const { box } = this;
    const arr = box.children;
    const ways = [];
    for (let i = 0; i < arr.length; i+=1) {
      ways.push(arr[i]);
    }
    Array.prototype.forEach.call(ways, (item) => {
      item.addEventListener("click", this.checkTypeLiterature);
    });
  }

  checkTypeLiterature() {
    /* eslint-disable no-param-reassign */
    siblings(this).forEach((item, index, arr) => {
      arr[index].children[0].style.color = "#595959";
    });
    this.children[0].style.color = "#0578db";
  }

  render() {
    const {
      home: {
        englishData,
        fetchHotEnglishWordsLoading,
        recommendLiteratureData: {
          literatureDetailDtos: recommendData
        },
        newestLiteratureData: {
          literatureDetailDtos: newsData
        },
        fetchNewestLiteratureLoading,
        fetchRecommendLiteratureLoading,
      } } = this.props;


    const styleItem = ["#26C8D1","#5890DF","#8BB1ED","#E2A558","#81C06D","#EA6874"];

    // 英文熱詞
    const firstItem = englishData && englishData.map((cur, index) => {
      return (
        <span
          key={index.toString()}
          style={{backgroundColor:styleItem[index]}}
          onClick={() => {return this.searchList(cur);}}
          title={cur}
        >
          {cur}
        </span>
      );
    });

    const newsItem = newsData && newsData.map((item, index) => {
      if (index === 0) {
        return (
          <div className="home-doc-center-item" key={index.toString()}>
            <a href={item.pageUrl} target="_blank" rel="noopener noreferrer">
              <img src={dotBlueThree} alt=""/>
              <p title={item.title}>{item.title}</p>
            </a>
            <p className="home-doc-center-item-first">
              <span>发布时间：{(item.time || "").split(" ").splice(0,1)}</span>
              <span title={item.author}>作者:{item.author} </span>
              <span>来源：{item.source}</span>
            </p>
          </div>
        );
      }
      return (
        <div className="home-doc-center-item" key={index.toString()}>
          <a href={item.pageUrl} target="_blank" rel="noopener noreferrer" >
            <img src={dotBlueThree} alt=""/>
            <p title={item.title}>
              {item.title}
            </p>
            <span>{(item.time || "").split(" ").splice(0,1)}</span>
          </a>
        </div>
      );
    });
    const recommendItem = recommendData && recommendData.map((item, index) => {
      if (index === 0) {
        return (
          <div className="home-doc-center-item" key={index.toString()}>
            <a href={item.pageUrl} target="_blank" rel="noopener noreferrer">
              <img src={dotBlueThree} alt=""/>
              <p title={item.title}>{item.title}</p>
            </a>
            <p className="home-doc-center-item-first">
              <span>发布时间：{(item.time || "").split(" ").splice(0,1)}</span>
              <span title={item.author}>作者:{item.author} </span>
              <span>来源：{item.source}</span>
            </p>
          </div>
        );
      }
      return (
        <div className="home-doc-center-item" key={index.toString()}>
          <a href={item.pageUrl} target="_blank" rel="noopener noreferrer">
            <img src={dotBlueThree} alt=""/>
            <p title={item.title}>
              {item.title}
            </p>
            <span>{(item.time || "").split(" ").splice(0,1)}</span>
          </a>
        </div>
      );
    });
    return (
      <div className="home-doc">
        <div className="home-doc-center">
          <div className="home-doc-title">
            <div className="home-doc-top">
              <img src={dividerLeft} alt=""/>
              <span>文献中心</span>
              <img src={dividerRight} alt=""/>
            </div>
            <span>LITERATURE CENTER</span>
          </div>
        </div>
        <div className="home-doc-content">
          <div className="home-doc-content-middle">
            <div className="hot-word">
              <div className="hot-word-title">英文热词</div>
              {fetchHotEnglishWordsLoading ?
                <div className="spin"><Spin /></div>
                : <div className="hot-word-content">{firstItem}</div>}
            </div>
          </div>
        </div>
        <div className="home-doc-content">
          <div className="home-doc-content-bottom">
            <div className="home-doc-list">
              <div className="bottom-title">
                <div className="bottom-mainheading">推荐文献</div>
                <div className="bottom-subhead" ref={(ref) => {this.box = ref;}}>
                  <button type="button" onClick={() => {this.clickMold(1);}}>
                    <span>海外</span>
                  </button>|
                  <button type="button" onClick={() => {this.clickMold(2);}}>
                    <span>国内</span>
                  </button>
                </div>
              </div>
              <div className="home-doc-center-left">
                {fetchRecommendLiteratureLoading ?
                  <div className="spin"><Spin /></div>:
                  <div>
                    {recommendItem}
                    <div className="home-doc-more">
                      <span
                        onClick={()=>{return this.literatureRecommendFunc();}}
                      >
                        MORE+
                      </span>
                    </div>
                  </div>
                }
              </div>
            </div>
            <div className="home-doc-list">
              <div className="bottom-title">
                <div className="bottom-mainheading">最新文献</div>
                <div className="bottom-subhead" ref={(ref) => {this.boxType = ref;}}>
                  <button type="button" onClick={() => {this.clickType(1);}}>
                    <span>海外</span>
                  </button>|
                  <button type="button" onClick={() => {this.clickType(2);}}>
                    <span>国内</span>
                  </button>
                </div>
              </div>
              <div className="home-doc-center-left">
                {fetchNewestLiteratureLoading ?
                  <div className="spin"><Spin /></div>:
                  <div>
                    {newsItem}
                    <div className="home-doc-more">
                      <span
                        onClick={()=>{return this.literatureAllFunc();}}
                      >
                        MORE+
                      </span>
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default HomeDoc;
