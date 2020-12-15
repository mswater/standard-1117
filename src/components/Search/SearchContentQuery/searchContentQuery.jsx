import React from "react";
import { Input, Icon, Spin } from "antd";
import "./index.css";
import { fuzzyQuery, siblings } from "../../../lib/tools/utils";
import noData from "../../../images/nodata.png";

const { Search } = Input;
let weiboArr = ["原创微博", "转发微博"];

class SearchContentQuery extends React.Component {
  componentDidMount() {
    const {
      search:{
        searchData,
        fetchSearchLoading,
        searchProListFlag,
        searchWeiboTypeFlag,
      }
    } = this.props;
    const searchWeb = searchData.webList;
    const searchPro = searchData.proList;
    /* eslint-disable no-nested-ternary */
    const queryList = searchProListFlag ?
      searchPro : (searchWeiboTypeFlag ? weiboArr : searchWeb);
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
      }
    } = this.props;
    const searchWeb = searchData.webList;
    const searchPro = searchData.proList;
    /* eslint-disable no-nested-ternary */
    const queryList = searchProListFlag ?
      searchPro : (searchWeiboTypeFlag ? weiboArr : searchWeb);
    const renderContactNumber = localStorage.getItem("searchContact");
    if (renderContactNumber === "4") return;
    if (!fetchSearchLoading && (queryList && queryList.length > 0)) {
      const { classType, itemType } = this;
      const classArr = classType.children;
      const itemArr = itemType.children;
      this.addEvent();
      this.addItemEvent();
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
      params.timeOrder = orderFlag!=="false" ? "desc" : "asc";
    }
    if(orderType === 2){
      params.browseOrder = orderFlag!=="false" ? "desc" : "asc";
    }
    if(orderType === 3){
      params.relevantOrder = "desc";
    }
    if(orderType === 4){
      params.transpondOrder = orderFlag!=="false" ? "desc" : "asc";
    }
    if(orderType === 5){
      params.commentOrder = orderFlag!=="false" ? "desc" : "asc";
    }
    if(orderType === 6){
      params.likeOrder =  orderFlag!=="false" ? "desc" : "asc";
    }
    if(orderType === 7){
      params.mettingOrder = orderFlag!=="false" ? "desc" : "asc";
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

  proListFunc = (flag,type) => {
    const {
      fetchSearch,
      fetchSearchProList,
      fetchSearchResetButton,
      fetchSearchResetWeibo,
      headerSearchContent,
      fetchSearchValue,
      search:{
        searchDateQuery,
      },
      handlerIndex,
    } = this.props;
    const searchContact = localStorage.getItem("searchContact");
    const orderType = Number(localStorage.getItem("searchOrderType"));
    const params = {
      type:Number(searchContact),
      starTime: searchDateQuery[0],
      endTime: searchDateQuery[1],
      searchKey: headerSearchContent,
      webList:[],
      proList: [],
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
      params.timeOrder = "desc";
    }
    if(orderType === 2){
      params.browseOrder = "desc";
    }
    if(orderType === 3){
      params.relevantOrder = "desc";
    }
    if(orderType === 4){
      params.transpondOrder = "desc";
    }
    if(orderType === 5){
      params.commentOrder = "desc";
    }
    if(orderType === 6){
      params.likeOrder =  "desc";
    }
    if(orderType === 7){
      params.mettingOrder = "desc";
    }
    fetchSearchValue();
    fetchSearchResetWeibo(type);
    fetchSearchProList(flag);
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
      webList: searchWeiboTypeFlag ? [] :(searchProListFlag ? [] :
        (item === "全部" ? null : [item])),
      proList: searchWeiboTypeFlag ? [] :(searchProListFlag ?
        (item === "全部" ? null : [item]) : []),
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
      params.timeOrder = orderFlag!=="false" ? "desc" : "asc";
    }
    if(orderType === "2"){
      params.browseOrder = orderFlag!=="false" ? "desc" : "asc";
    }
    if(orderType === "3"){
      params.relevantOrder = "desc";
    }
    if(orderType === "4"){
      params.transpondOrder = orderFlag!=="false" ? "desc" : "asc";
    }
    if(orderType === "5"){
      params.commentOrder = orderFlag!=="false" ? "desc" : "asc";
    }
    if(orderType === "6"){
      params.likeOrder =  orderFlag!=="false" ? "desc" : "asc";
    }
    if(orderType === "7"){
      params.mettingOrder = orderFlag!=="false" ? "desc" : "asc";
    }
    fetchSearchQuery(item);
    fetchSearchResetButton(false);
    fetchSearch(params);
    handlerIndex(clickIdx === 0 ? clickIdx : 1);
    if(item === "转发微博"){
      weiboArr = ["转发微博"];
    }
    if(item === "原创微博"){
      weiboArr = ["原创微博"];
    }
  };

  sourceArr = () => {
    const renderContactNumber = localStorage.getItem("searchContact");
    if (parseInt(renderContactNumber, 0) === 1) {
      return ["来源网站", "地区分布"];
    }
    if (parseInt(renderContactNumber, 0) === 2) {
      return ["来源用户", "微博类型", "地区分布"];
    }
    if (parseInt(renderContactNumber, 0) === 3) {
      return ["来源公众号", "地区分布"];
    }
    if (parseInt(renderContactNumber, 0) === 6) {
      return ["来源网站", "地区分布"];
    }
    if (parseInt(renderContactNumber, 0) === 4) {
      return [];
    }
    if (parseInt(renderContactNumber, 0) === 5) {
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
        fetchSearchLoading,
        searchValue
      },
      clickIndex
    } = this.props;
    const webList = ["全部"].concat(searchData.webList);
    const proList = ["全部"].concat(searchData.proList);
    const weiboArrList = ["全部"].concat(weiboArr);
    const searchWeb = webList
      && webList.map((cur, index) => {
        return (
          <div
            key={index.toString()}
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
          onClick={() => this.proListFunc(cur === "地区分布",cur === "微博类型")}
        >
          <span>{cur}</span><Icon type="up" />
        </button>
      );
    });
    /* eslint-disable no-nested-ternary */
    const queryList = searchProListFlag ?
      searchPro : (searchWeiboTypeFlag ? searchWeibo : searchWeb);
    return (
      <div className="search-content-query">
        {(renderContactNumber !== "4" && renderContactNumber !== "5") && (
          <div className="search-content-query-class clear">
            <div className="fl">分组浏览 ：</div>
            <div className="search-content-query-box" ref={(ref) => {this.classType = ref;}}>
              {item}
            </div>
          </div>
        )}
        {(renderContactNumber !== "4" && renderContactNumber !== "5") && (
          <div className="search-content-query-select">
            <div className="query-top clear">
              {(!searchWeiboTypeFlag) && (
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
              )}
              {fetchSearchLoading ? <div className="content-list-loading"><Spin /></div>
                : (!queryList || (queryList && queryList.length === 0) ?
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
