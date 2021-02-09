import React from "react";
import { Input, Icon, Spin } from "antd";
import "./index.css";
import { fuzzyQuery, siblings } from "../../../lib/tools/utils";
import noData from "../../../images/nodata.png";

const { Search } = Input;
let weiboArr = ["原创微博", "转发微博"];

class SearchContentQuery extends React.Component {
  componentDidMount() {
    // 重置微博列表
    weiboArr = ["原创微博", "转发微博"];
    const {
      search:{
        searchData,
        fetchSearchLoading,
        searchProListFlag,
        searchWeiboTypeFlag,
        searchLanguageTypeFlag,
      }
    } = this.props;
    const searchWeb = searchData.webList;
    const searchPro = searchData.proList;
    const searchLanguage = searchData.languageList;
    /* eslint-disable no-nested-ternary */
    const queryList = searchProListFlag ?
      searchPro : (searchWeiboTypeFlag ?
        weiboArr : (searchLanguageTypeFlag ?
          searchLanguage : searchWeb));
    this.addEvent();
    if (!fetchSearchLoading && (queryList && queryList.length > 0))  {
      this.addItemEvent();
    }
  }

  componentDidUpdate () {
    const {
      search:{
        searchData,
        searchResetButtonFlag,
        fetchSearchLoading,
        searchProListFlag,
        searchWeiboTypeFlag,
        searchLanguageTypeFlag,
      }
    } = this.props;
    const searchWeb = searchData.webList;
    const searchPro = searchData.proList;
    const searchLanguage = searchData.languageList;
    /* eslint-disable no-nested-ternary */
    const queryList = searchProListFlag ?
      searchPro : (searchWeiboTypeFlag ?
        weiboArr : (searchLanguageTypeFlag ?
          searchLanguage : searchWeb));
    const renderContactNumber = localStorage.getItem("searchContact");
    if (renderContactNumber === "4" ||
      renderContactNumber === "5" ||
      renderContactNumber === "9") {
      return;
    }
    const { classType } = this;
    const classArr = classType.children;
    this.addEvent();
    if (searchResetButtonFlag) {
      for (let i = 0; i < classArr.length; i += 1) {
        if (i === 0) {
          classArr[i].style.backgroundColor = "#F6BD4E";
          classArr[i].children[1].style.color = "#0572B8";
          classArr[i].children[1].style.backgroundColor = "#ffffff";
        }
        if (i !== 0) {
          classArr[i].style.backgroundColor = "#D1D1D1";
          classArr[i].children[1].style.color = "#ffffff";
          classArr[i].children[1].style.backgroundColor = "transparent";
        }
      }
    }
    if (!fetchSearchLoading && (queryList && queryList.length > 0)) {
      const { itemType } = this;
      const itemArr = itemType.children;
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
    }
  }

  // 模糊搜索
  searchQuery = (value) => {
    const {
      fetchSearchResetFuzzyQuery,
      fetchSearch,
      headerSearchContent,
      fetchSearchValue,
      search:{
        searchData,
        searchProListFlag,
        searchDateQuery
      }
    } = this.props;
    const searchContact = localStorage.getItem("searchContact");
    const orderType = Number(localStorage.getItem("searchOrderType"));
    const orderFlag = localStorage.getItem("searchOrderFlag");
    const params = {
      type:!Number(searchContact) ? 1 :Number(searchContact),
      starTime: searchDateQuery[0],
      endTime: searchDateQuery[1],
      searchKey: headerSearchContent,
      webList: [],
      proList: [],
      languageList: [],
      timeOrder: "",
      browseOrder: null,
      relevantOrder: null,
      transpondOrder: null,
      commentOrder: null,
      likeOrder: null,
      mettingOrder: null,
      blogType:null,
      pageNum: 1,
      pageSize: 10
    };
    if(orderType === 1){
      params.timeOrder = orderFlag==="false" ? "desc" : "asc";
    }
    if(orderType === 2){
      params.browseOrder = orderFlag==="false" ? "desc" : "asc";
    }
    if(orderType === 3){
      params.relevantOrder = "desc";
    }
    if(orderType === 4){
      params.transpondOrder = orderFlag==="false" ? "desc" : "asc";
    }
    if(orderType === 5){
      params.commentOrder = orderFlag==="false" ? "desc" : "asc";
    }
    if(orderType === 6){
      params.likeOrder =  orderFlag==="false" ? "desc" : "asc";
    }
    if(orderType === 7){
      params.mettingOrder = orderFlag==="false" ? "desc" : "asc";
    }
    fetchSearchValue(value);
    if (!value || value.length === 0 || value === "全部") {
      fetchSearch(params);
    }
    const isWebList = searchProListFlag ?
      searchData.searchProList : searchData.searchWebList;
    const fuzzyArr = fuzzyQuery(isWebList, value);
    const paramsWeb = {
      ...searchData,
      webList: fuzzyArr
    };
    const paramsPro = {
      ...searchData,
      proList: fuzzyArr
    };
    fetchSearchResetFuzzyQuery(searchProListFlag ? paramsPro : paramsWeb);
  };

  searchChange = (e) => {
    const {
      fetchSearchValue ,
    } = this.props;
    fetchSearchValue(e.target.value);
  };

  proListFunc = (cur) => {
    const {
      fetchSearch,
      fetchSearchProList,
      fetchSearchLanguageList,
      fetchSearchResetButton,
      fetchSearchResetWeibo,
      headerSearchContent,
      fetchSearchValue,
      fetchSearchQuery,
      search:{
        searchDateQuery,
      },
      handlerIndex,
    } = this.props;
    const searchContact = localStorage.getItem("searchContact");
    const orderType = Number(localStorage.getItem("searchOrderType"));
    const orderFlag = localStorage.getItem("searchOrderFlag");
    const params = {
      type:Number(searchContact),
      starTime: searchDateQuery[0],
      endTime: searchDateQuery[1],
      searchKey: headerSearchContent,
      webList:[],
      proList: [],
      languageList: [],
      timeOrder: "",
      browseOrder: null,
      relevantOrder: null,
      transpondOrder: null,
      commentOrder: null,
      likeOrder: null,
      mettingOrder: null,
      blogType:null,
      pageNum: 1,
      pageSize: 10
    };
    if(orderType === 1){
      params.timeOrder = orderFlag==="false" ? "desc" : "asc";
    }
    if(orderType === 2){
      params.browseOrder = orderFlag==="false" ? "desc" : "asc";
    }
    if(orderType === 3){
      params.relevantOrder = "desc";
    }
    if(orderType === 4){
      params.transpondOrder = orderFlag==="false" ? "desc" : "asc";
    }
    if(orderType === 5){
      params.commentOrder = orderFlag==="false" ? "desc" : "asc";
    }
    if(orderType === 6){
      params.likeOrder =  orderFlag==="false" ? "desc" : "asc";
    }
    if(orderType === 7){
      params.mettingOrder = orderFlag==="false" ? "desc" : "asc";
    }
    let weiboFlag = false;
    let proFlag = false;
    let languageFlag = false;
    if(cur === "地区分布" && searchContact !== "6"){
      proFlag = true;
      languageFlag = false;
      weiboFlag = false;
    }else if(cur === "微博类型"){
      weiboFlag = true;
      proFlag = false;
      languageFlag = false;
    }else if(cur === "语种分类" || (cur === "地区分布" && searchContact === "6")){  // 会议的地区分布等同于语种分类
      languageFlag = true;
      proFlag = false;
      weiboFlag = false;
    }
    fetchSearchValue();
    fetchSearchQuery();
    fetchSearchResetWeibo(weiboFlag);
    fetchSearchProList(proFlag);
    fetchSearchLanguageList(languageFlag);
    fetchSearchResetButton(false);
    fetchSearch(params);
    handlerIndex(0);
  };

  searchItem =(item, clickIdx) =>{
    const {
      fetchSearch,
      fetchSearchQuery,
      fetchSearchResetButton,
      headerSearchContent,
      search:{
        searchProListFlag,
        searchWeiboTypeFlag,
        searchLanguageTypeFlag,
        searchDateQuery
      },
      handlerIndex,
    } = this.props;
    const searchContact = localStorage.getItem("searchContact");
    const orderType = localStorage.getItem("searchOrderType");
    const orderFlag = localStorage.getItem("searchOrderFlag");
    const params = {
      type:Number(searchContact),
      starTime: searchDateQuery[0],
      endTime: searchDateQuery[1],
      searchKey: headerSearchContent,
      webList: searchWeiboTypeFlag ? [] : (searchProListFlag ? [] :
        (searchLanguageTypeFlag ? [] : (item === "全部" ? null : [item]))),
      proList:searchProListFlag ? (item === "全部" ? null : [item]) : [],
      languageList: searchLanguageTypeFlag ? (item === "全部" ? null : [item]) : [],
      timeOrder: "desc",
      browseOrder: null,
      relevantOrder: null,
      transpondOrder: null,
      commentOrder: null,
      likeOrder: null,
      mettingOrder: null,
      blogType:(item === "转发微博") ? 0 :(item === "原创微博" ? 1 : null),
      pageNum: 1,
      pageSize: 10
    };
    if(orderType === "1"){
      params.timeOrder = orderFlag==="false" ? "desc" : "asc";
    }
    if(orderType === "2"){
      params.browseOrder = orderFlag==="false" ? "desc" : "asc";
    }
    if(orderType === "3"){
      params.relevantOrder = "desc";
    }
    if(orderType === "4"){
      params.transpondOrder = orderFlag==="false" ? "desc" : "asc";
    }
    if(orderType === "5"){
      params.commentOrder = orderFlag==="false" ? "desc" : "asc";
    }
    if(orderType === "6"){
      params.likeOrder =  orderFlag==="false" ? "desc" : "asc";
    }
    if(orderType === "7"){
      params.mettingOrder = orderFlag==="false" ? "desc" : "asc";
    }
    fetchSearchQuery([item]);
    fetchSearchResetButton(false);
    fetchSearch(params);
    handlerIndex(clickIdx === 0 ? clickIdx : 1);
    if(item === "转发微博"){
      weiboArr = ["转发微博"];
    }
    if(item === "原创微博"){
      weiboArr = ["原创微博"];
    }
    if(searchWeiboTypeFlag && (item === "全部")){
      weiboArr = ["原创微博", "转发微博"];
    }
  };

  sourceArr = () => {
    const renderContactNumber = localStorage.getItem("searchContact");
    if (parseInt(renderContactNumber, 0) === 1) {
      return ["来源网站", "语种分类", "地区分布"];
    }
    if (parseInt(renderContactNumber, 0) === 2) {
      return ["来源用户", "微博类型", "地区分布"];
    }
    if (parseInt(renderContactNumber, 0) === 3) {
      return ["来源公众号", "地区分布"];
    }
    if (parseInt(renderContactNumber, 0) === 6) { // 会议
      return ["来源网站", "地区分布"];
    }
    if (parseInt(renderContactNumber, 0) === 4 ||
      parseInt(renderContactNumber, 0) === 5 ||
      parseInt(renderContactNumber, 0) === 9) {
      return [];
    }
    return ["来源网站", "地区分布"];
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
    const arr = classType && classType.children;
    const ways = [];
    if(arr && arr.length>0){
      for (let i = 0; i < arr.length; i += 1) {
        ways.push(arr[i]);
      }
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
    const renderContactNumber = localStorage.getItem("searchContact");
    const {
      search:{
        searchData,
        searchProListFlag,
        searchWeiboTypeFlag,
        searchLanguageTypeFlag,
        fetchSearchLoading,
        searchValue
      },
      clickIndex
    } = this.props;
    const webList = ["全部"].concat(searchData.webList);
    const proList = ["全部"].concat(searchData.proList);
    const languageList = ["全部"].concat(searchData.languageList);
    const weiboArrList = ["全部"].concat(weiboArr);
    const searchWeb = webList && webList.map((cur, index) => {
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
    const searchPro = proList
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
    const searchLanguage = languageList
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
    const searchWeibo = weiboArrList && weiboArrList.map((cur, index) => {
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
    const queryList = searchProListFlag ?
      searchPro : (searchWeiboTypeFlag ?
        searchWeibo : (searchLanguageTypeFlag ?
          searchLanguage : searchWeb));
    return (
      <div className="search-content-query">
        {(renderContactNumber !== "4"
          && renderContactNumber !== "5"
          && renderContactNumber !== "9") && (
          <div className="search-content-query-class clear">
            <div className="fl">分组浏览 ：</div>
            <div className="search-content-query-box" ref={(ref) => {this.classType = ref;}}>
              {item}
            </div>
          </div>
        )}
        {(renderContactNumber !== "4"
          && renderContactNumber !== "5"
          && renderContactNumber !== "9") && (
          <div className="search-content-query-select">
            <div className="query-top clear">
              {
                (searchWeiboTypeFlag || searchLanguageTypeFlag) ? "" : (
                  <Search
                    value={searchValue}
                    placeholder="请输入检索内容..."
                    enterButton="检索"
                    size="default"
                    allowClear
                    style={{width: "260px"}}
                    onChange={this.searchChange}
                    onSearch={this.searchQuery}
                  />
                )
              }
              {fetchSearchLoading ? <div className="content-list-loading"><Spin /></div>
                : (!queryList || (queryList && queryList.length <= 1) ?
                  <div className="no-data"><img src={noData} alt=""/></div> : (
                    <div
                      className="search-query-center"
                      ref={(ref) => {
                        this.itemType = ref;
                      }}
                    >
                      {queryList.length !== 1 && queryList}
                    </div>
                  ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default SearchContentQuery;
