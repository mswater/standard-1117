import React from "react";
import { Input, Icon, Spin } from "antd";
import "./index.css";
import { fuzzyQuery,siblings } from "../../../lib/tools/utils";
import noData from "../../../images/nodata.png";

const { Search } = Input;


class MeetingContentQuery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clickIndex:0
    };
  }

  componentWillMount() {
    const {
      home: {
        conferenceTab
      },
      fetchMeetingLanguageList,
      fetchMeetingQuery,
    } = this.props;
    const meetingFrom = localStorage.getItem("meetingFrom");
    if(meetingFrom === "index"){
      fetchMeetingLanguageList(true);
      if(conferenceTab === "home"){
        fetchMeetingQuery("国内");
      }else if(conferenceTab === "aboard"){
        fetchMeetingQuery("国外");
      }
    }else{
      fetchMeetingLanguageList(false);
      fetchMeetingQuery();
    }
  }

  componentDidMount() {
    const {
      meeting:{
        meetingData,
        fetchMeetingListLoading,
        meetingProListFlag,
        meetingLanguageListFlag,
      }
    } = this.props;
    const searchWeb = meetingData.webList;
    const searchPro = meetingData.proList;
    const searchLanguage = meetingData.languageList;
    /* eslint-disable no-nested-ternary */
    const queryList = meetingProListFlag ?
      searchPro : meetingLanguageListFlag ?
        searchLanguage : searchWeb;
    this.addEvent();
    if (!fetchMeetingListLoading && (queryList && queryList.length > 0)) {
      this.addItemEvent();
    }
  }

  componentDidUpdate () {
    const {
      meeting:{
        meetingData,
        fetchMeetingListLoading,
        meetingProListFlag,
        meetingLanguageListFlag,
      }
    } = this.props;
    const meetingWeb = meetingData.webList;
    const meetingPro = meetingData.proList;
    const meetingLanguage = meetingData.languageList;
    /* eslint-disable no-nested-ternary */
    const queryList = meetingProListFlag ?
      meetingPro : meetingLanguageListFlag ?
        meetingLanguage : meetingWeb;
    if (!fetchMeetingListLoading && (queryList && queryList.length > 0)) {
      const { classType, itemType } = this;
      const classArr = classType.children;
      const itemArr = itemType.children;
      this.addEvent();
      this.addItemEvent();
      if (itemArr.length > 2) {
        for (let i = 0; i < itemArr.length; i += 1) {
          if (i === 0) {
            itemArr[i].style.color = "#0572B8";
            itemArr[i].style.border = "1px solid #0572B8";
          }
          if (i !== 0) {
            itemArr[i].style.color = "#515256";
            itemArr[i].style.border = "1px solid #fff";
          }
        }
      }
      const meetingFrom = localStorage.getItem("meetingFrom");
      // 如果是从首页会议模块进入会议列表页，那么语种分类高亮
      if (meetingFrom === "index" && meetingLanguageListFlag) {
        for (let i = 0; i < classArr.length; i += 1) {
          if (i === 1) {
            classArr[i].style.backgroundColor = "#F6BD4E";
            classArr[i].children[1].style.color = "#0572B8";
            classArr[i].children[1].style.backgroundColor = "#ffffff";
          }
          if (i !== 1) {
            classArr[i].style.backgroundColor = "#D1D1D1";
            classArr[i].children[1].style.color = "#ffffff";
            classArr[i].children[1].style.backgroundColor = "transparent";
          }
        }
        for (let i = 0; i < itemArr.length; i += 1) {
          if (i === 1) {
            itemArr[i].style.color = "#0572B8";
            itemArr[i].style.border = "1px solid #0572B8";
          }
          if (i !== 1) {
            itemArr[i].style.color = "#515256";
            itemArr[i].style.border = "1px solid #fff";
          }
        }
      }
    }
  }

  // 模糊检索
  meetingQuery = (value) => {
    const {
      fetchMeetingResetFuzzyQuery,
      fetchMeetingList,
      fetchMeetingSearchValue,
      meeting: {
        meetingData,
        meetingProListFlag,
        meetingThemeSearch,
        meetingDateQuery
      }
    } = this.props;
    const orderType = localStorage.getItem("meetingOrderType");
    const orderFlag = localStorage.getItem("meetingOrderFlag");

    const params = {
      starTime: meetingDateQuery[0],
      endTime: meetingDateQuery[1],
      searchKey: meetingThemeSearch,
      webList: [],
      proList: [],
      languageList: [],
      timeOrder: "",
      browseOrder: "",
      relevantOrder:"",
      pageNum: 1,
      pageSize: 10
    };
    if(orderType === 2){
      params.browseOrder = !orderFlag ? "desc" : "asc";
    }
    if(orderType === 3){
      params.relevantOrder = "desc";
    }
    if(orderType === 1){
      params.timeOrder = !orderFlag ? "desc" : "asc";
    }
    fetchMeetingSearchValue(value);
    if (!value || value.length === 0 || value === "全部") {
      fetchMeetingList(params);
    }
    const isWebList = meetingProListFlag ?
      meetingData.meetingProList : meetingData.meetingWebList;
    const fuzzyArr = fuzzyQuery(isWebList, value);
    const paramsWeb = {
      ...meetingData,
      webList: fuzzyArr
    };
    const paramsPro = {
      ...meetingData,
      proList: fuzzyArr
    };
    fetchMeetingResetFuzzyQuery(meetingProListFlag ? paramsPro : paramsWeb);
  };

  searchChange = (e) => {
    const {
      fetchMeetingSearchValue ,
    } = this.props;
    fetchMeetingSearchValue(e.target.value);
  };

  proListFunc = (cur) => {
    // 重置该字段
    localStorage.setItem("meetingFrom", "menu");
    this.setState({
      clickIndex:0
    });
    const {
      fetchMeetingList,
      fetchMeetingProList,
      fetchMeetingLanguageList,
      fetchMeetingWebList,
      fetchMeetingResetButton,
      fetchMeetingSearchValue,
      fetchMeetingQuery,
      meeting:{
        meetingDateQuery,
        meetingThemeSearch,
      }
    } = this.props;
    const params = {
      starTime: meetingDateQuery[0],
      endTime: meetingDateQuery[1],
      searchKey: meetingThemeSearch,
      webList:[],
      proList: [],
      languageList: [],
      timeOrder: "",
      browseOrder: "",
      relevantOrder:"",
      pageNum: 1,
      pageSize: 10
    };
    const orderType = localStorage.getItem("meetingOrderType");
    if(orderType === "2"){
      params.browseOrder = "desc";
    }
    if(orderType === "3"){
      params.relevantOrder = "desc";
    }
    if(orderType === "1"){
      params.timeOrder = "desc";
    }
    let proFlag = false;
    let languageFlag = false;
    let webFlag = false;
    if(cur === "地区分布"){  // 原来的语种分类，旧的语种分类去掉
      proFlag = false;
      languageFlag = true;
      webFlag = false;
    }else if(cur === "来源网站"){
      webFlag = true;
      proFlag = false;
      languageFlag = false;
    }
    fetchMeetingProList(proFlag);
    fetchMeetingLanguageList(languageFlag);
    fetchMeetingWebList(webFlag);
    fetchMeetingSearchValue();
    fetchMeetingQuery();
    fetchMeetingResetButton(false);
    fetchMeetingList(params);
  };


  sourceArr = () => {
    return ["来源网站", "地区分布"];
  };

  searchItem =(item,clickIdx) =>{
    // 重置该字段
    localStorage.setItem("meetingFrom", "menu");
    this.setState({
      clickIndex: clickIdx === 0 ? clickIdx : 1
    });
    const {
      fetchMeetingList,
      fetchMeetingQuery,
      fetchMeetingResetButton,
      meeting:{
        meetingDateQuery,
        meetingProListFlag,
        meetingThemeSearch,
        meetingLanguageListFlag,
        meetingWebListFlag,
      }
    } = this.props;
    const orderType = localStorage.getItem("meetingOrderType");
    const orderFlag = localStorage.getItem("meetingOrderFlag");
    const params = {
      starTime: meetingDateQuery[0],
      endTime: meetingDateQuery[1],
      searchKey: meetingThemeSearch,
      webList: meetingWebListFlag ? (item === "全部" ? null : [item]) : [],
      proList: meetingProListFlag ? (item === "全部" ? null : [item]) : [],
      languageList: meetingLanguageListFlag ? (item === "全部" ? null : [item]) : [],
      timeOrder: "",
      browseOrder: "",
      relevantOrder:"",
      pageNum: 1,
      pageSize: 10
    };
    if(orderType === 2){
      params.browseOrder = !orderFlag ? "desc" : "asc";
    }
    if(orderType === 3){
      params.relevantOrder = "desc";
    }
    if(orderType === 1){
      params.timeOrder = !orderFlag ? "desc" : "asc";
    }
    fetchMeetingQuery(item);
    fetchMeetingResetButton(false);
    fetchMeetingList(params);
  };


  checkType() {
    /* eslint-disable no-param-reassign */
    siblings(this).forEach((item, index, arr) => {
      arr[index].style.backgroundColor = "#D1D1D1";
      arr[index].children[1].style.color = "#ffffff";
      arr[index].children[1].style.backgroundColor = "transparent";
    });
    this.style.backgroundColor = "#F6BD4E";
    this.children[1].style.color = "#0572B8";
    this.children[1].style.backgroundColor = "#ffffff";
  }

  addEvent() {
    const { classType } = this;
    const arr = classType.children;
    const ways = [];
    for (let i = 0; i < arr.length; i += 1) {
      ways.push(arr[i]);
    }
    Array.prototype.forEach.call(ways, (item) => {
      item.addEventListener("click", this.checkType);
    });
  }

  checkItemType() {
    /* eslint-disable no-param-reassign */
    siblings(this).forEach((item, index, arr) => {
      arr[index].style.color = "#515256";
      arr[index].style.border = "1px solid #fff";
    });
    this.style.color = "#0572B8";
    this.style.border = "1px solid #0572B8";
  }

  addItemEvent() {
    const { itemType } = this;
    const arr = itemType.children;
    const ways = [];
    for (let i = 0; i < arr.length; i += 1) {
      ways.push(arr[i]);
    }
    Array.prototype.forEach.call(ways, (item) => {
      item.addEventListener("click", this.checkItemType);
    });
  }

  render() {
    const {
      meeting: {
        meetingData,
        meetingProListFlag,
        fetchMeetingListLoading,
        meetingSearchValue,
        meetingLanguageListFlag,
      }
    } = this.props;
    const {clickIndex} = this.state;
    const webList = ["全部"].concat(meetingData.webList);
    const proList = ["全部"].concat(meetingData.proList);
    const languageList = ["全部"].concat(meetingData.languageList);
    const meetingWeb = webList
      && webList.map((cur, index) => {
        return (
          <div
            key={index.toString()}
            title={cur}
            onClick={() => this.searchItem(cur,index)}
            className={`fl ${index === clickIndex ? "current" : ""}`}
          >
            {cur}
          </div>
        );
      });
    const meetingPro = proList
      && proList.map((cur, index) => {
        return (
          <div
            key={index.toString()}
            title={cur}
            onClick={() => this.searchItem(cur,index)}
            className={`fl ${index === clickIndex ? "current" : ""}`}
          >
            {cur}
          </div>
        );
      });
    const meetingLanguage = languageList
      && languageList.map((cur, index) => {
        return (
          <div
            key={index.toString()}
            title={cur}
            onClick={() => this.searchItem(cur,index)}
            className={`fl ${index === clickIndex ? "current" : ""}`}
          >
            {cur}
          </div>
        );
      });
    const item = this.sourceArr() && this.sourceArr().map((cur, index) => {
      return (
        <button
          type="button"
          key={index.toString()}
          onClick={() => this.proListFunc(cur)}
        >
          <span>{cur}</span><Icon type="up" />
        </button>
      );
    });
    /* eslint-disable no-nested-ternary */
    const queryList = meetingProListFlag ?
      meetingPro : meetingLanguageListFlag ?
        meetingLanguage : meetingWeb;
    return (
      <div className="meeting-content-query">
        <div className="meeting-content-query-class clear">
          <div className="fl">分组浏览 ：</div>
          <div className="meeting-content-query-box" ref={(ref) => {this.classType = ref;}}>
            {item}
          </div>
        </div>
        <div className="meeting-content-query-select">
          <div className="query-top clear">
            {
              meetingLanguageListFlag ? "" : (
                <Search
                  value={meetingSearchValue}
                  placeholder="请输入检索内容..."
                  enterButton="检索"
                  size="default"
                  allowClear
                  style={{width: "260px"}}
                  onChange={this.searchChange}
                  onSearch={this.meetingQuery}
                />
              )
            }
            {fetchMeetingListLoading ? <div className="content-list-loading"><Spin /></div>
              : (!queryList.length || (queryList && queryList.length <= 1) ?
                <div className="no-data"><img src={noData} alt=""/></div> : (
                  <div
                    className="meeting-query-center"
                    ref={(ref) => {
                      this.itemType = ref;
                    }}
                  >
                    {queryList.length !== 1 && queryList}
                  </div>
                ))}
          </div>
        </div>
      </div>
    );
  }
}

export default MeetingContentQuery;

