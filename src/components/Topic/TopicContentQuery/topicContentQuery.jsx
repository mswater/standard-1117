import React from "react";
import { Input, Icon, Spin } from "antd";
import "./index.css";
import { siblings,fuzzyQuery } from "../../../lib/tools/utils";
import noData from "../../../images/nodata.png";

const { Search } = Input;
let weiboArr = ["原创微博", "转发微博"];

class TopicContentQuery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    const {
      subject:{
        subjectContentListData,
        fetchSubjectContentListLoading,
        subjectProListFlag,
        subjectWeiboTypeFlag,
      }
    } = this.props;
    this.addEvent();
    const searchWeb = subjectContentListData.webList;
    const searchPro = subjectContentListData.proList;
    /* eslint-disable no-nested-ternary */
    const queryList = subjectProListFlag ?
      searchPro : (subjectWeiboTypeFlag ? weiboArr : searchWeb);
    this.addEvent();
    if (!fetchSubjectContentListLoading && (queryList && queryList.length > 0)) {
      this.addItemEvent();
    }
  }

  componentDidUpdate () {
    const {
      subject:{
        subjectContentListData,
        subjectResetButtonFlag,
        fetchSubjectContentListLoading,
        subjectProListFlag,
        subjectWeiboTypeFlag,
      }
    } = this.props;
    const searchWeb = subjectContentListData.webList;
    const searchPro = subjectContentListData.proList;
    /* eslint-disable no-nested-ternary */
    const queryList = subjectProListFlag ?
      searchPro : (subjectWeiboTypeFlag ? weiboArr : searchWeb);
    const renderContactNumber = localStorage.getItem("topicContact");
    if (renderContactNumber === "4") return;
    if (!fetchSubjectContentListLoading && (queryList && queryList.length > 0)) {
      const { itemType, classType } = this;
      const classArr = classType.children;
      const itemArr = itemType.children;
      this.addEvent();
      this.addItemEvent();
      if (subjectResetButtonFlag) {
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


  searchQuery = (value) => {
    const {
      fetchSubjectResetFuzzyQuery,
      fetchSubjectContentList,
      fetchSubjectSearchValue,
      subject:{
        subjectContentListData,
        subjectProListFlag,
        subjectThemeSearch,
      }
    } = this.props;
    const menuId = localStorage.getItem("id");
    const topicContact = localStorage.getItem("topicContact");
    const orderType = localStorage.getItem("topicOrderType");
    const orderFlag = localStorage.getItem("topicOrderFlag");
    const params = {
      searchKey:subjectThemeSearch,
      hId: Number(menuId),
      sourceType: Number(topicContact),
      webList:[],
      proList:subjectProListFlag ? ["全部"] : [],
      order:orderFlag ? "desc" : "asc",
      orderType:!orderType ? 1 : Number(orderType),
      pageNum:1,
      pageSize:10
    };
    fetchSubjectSearchValue(value);
    if (!value || value.length === 0 || value === "全部") {
      fetchSubjectContentList(params);
    }
    const isWebList = subjectProListFlag ?
      subjectContentListData.subjectProList :
      subjectContentListData.subjectWebList;
    const fuzzyArr = fuzzyQuery(isWebList, value);
    const paramsWeb = {
      ...subjectContentListData,
      webList: fuzzyArr
    };
    const paramsPro = {
      ...subjectContentListData,
      proList: fuzzyArr
    };
    fetchSubjectResetFuzzyQuery(subjectProListFlag ? paramsPro : paramsWeb);
  };

  searchChange = (e) => {
    const {
      fetchSubjectSearchValue,
    } = this.props;
    fetchSubjectSearchValue(e.target.value);
  };

  proListFunc = (flag,type) => {
    const {
      fetchSubjectContentList,
      fetchSubjectProList,
      fetchSubjectResetButton,
      fetchSubjectResetWeibo,
      fetchSubjectSearchValue,
      subject:{
        subjectThemeSearch
      },
      handlerIndex
    } = this.props;
    const menuId = localStorage.getItem("id");
    const topicContact = localStorage.getItem("topicContact");
    const orderType = localStorage.getItem("topicOrderType");
    const params = {
      searchKey:subjectThemeSearch,
      hId: Number(menuId),
      sourceType:topicContact,
      webList:[],
      proList:flag ? ["全部"] : [],
      order:"desc",
      orderType:!orderType ? 1 : Number(orderType),
      pageNum:1,
      pageSize:10
    };
    fetchSubjectSearchValue();
    fetchSubjectResetWeibo(type);
    fetchSubjectProList(flag);
    fetchSubjectResetButton(false);
    fetchSubjectContentList(params);
    handlerIndex(0);
  };

  // 点击全部
  resetListFunc = () =>{
    const {
      fetchSubjectContentList,
      fetchSubjectSearchQuery,
      subject:{
        subjectProListFlag,
        subjectThemeSearch,
      }
    } = this.props;
    const menuId = localStorage.getItem("id");
    const topicContact = localStorage.getItem("topicContact");
    const orderType = localStorage.getItem("topicOrderType");
    const orderFlag = localStorage.getItem("topicOrderFlag");
    const params = {
      searchKey:subjectThemeSearch,
      hId: Number(menuId),
      sourceType: Number(topicContact),
      webList:[],
      proList:subjectProListFlag ? ["全部"] : [],
      order:orderFlag ? "desc" : "asc",
      orderType:!orderType ? 1 : Number(orderType),
      pageNum:1,
      pageSize:10
    };
    // 调用接口
    fetchSubjectContentList(params);
    fetchSubjectSearchQuery();
    weiboArr =  ["原创微博", "转发微博"];
  };

  sourceArr = () => {
    const renderContactNumber = localStorage.getItem("topicContact");
    if (parseInt(renderContactNumber, 0) === 1) {
      return ["来源网站", "地区分布"];
    }
    if (parseInt(renderContactNumber, 0) === 2) {
      return ["来源用户", "微博类型", "地区分布"];
    }
    if (parseInt(renderContactNumber, 0) === 3) {
      return ["来源公众号", "地区分布"];
    }
    if (parseInt(renderContactNumber, 0) === 4) {
      return [];
    }
    if (parseInt(renderContactNumber, 0) === 5) {
      return ["来源网站"];
    }
    return ["来源网站", "地区分布"];
  };


  searchItem =(item,clickIdx) =>{
    if(item === "全部"){
      this.resetListFunc();
    }
    const {
      fetchSubjectContentList,
      fetchSubjectSearchQuery,
      fetchSubjectResetButton,
      subject:{
        subjectProListFlag,
        subjectWeiboTypeFlag,
        subjectThemeSearch,
      },
      handlerIndex
    } = this.props;
    const menuId = localStorage.getItem("id");
    const topicContact = localStorage.getItem("topicContact");
    const orderType = localStorage.getItem("topicOrderType");
    const orderFlag = localStorage.getItem("topicOrderFlag");
    const params = {
      searchKey:subjectThemeSearch,
      hId:Number(menuId),
      sourceType: Number(topicContact),
      webList:subjectWeiboTypeFlag ? [] : [item],
      proList:subjectWeiboTypeFlag ? [] : (subjectProListFlag ? [item] : []),
      order:!orderFlag ? "desc" : "asc",
      orderType:!orderType ? 1 : Number(orderType),
      isOrigin:(item === "转发微博") ? 1 :(item === "原创微博" ? 0 : null),
      pageNum:1,
      pageSize:10
    };
    fetchSubjectSearchQuery(item);
    fetchSubjectResetButton(false);
    fetchSubjectContentList(params);
    handlerIndex(clickIdx === 0 ? clickIdx : 1);
    if(item === "转发微博"){
      weiboArr = ["转发微博"];
    }
    if(item === "原创微博"){
      weiboArr = ["原创微博"];
    }
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
    if(arr && arr.length > 0){
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
    const renderContactNumber = localStorage.getItem("topicContact");
    const {
      subject:{
        subjectContentListData,
        subjectProListFlag,
        subjectWeiboTypeFlag,
        fetchSubjectContentListLoading,
        subjectSearchValue
      },
      clickIndex
    } = this.props;
    const webList = ["全部"].concat(subjectContentListData.webList);
    const proList = ["全部"].concat(subjectContentListData.proList);
    const weiboArrList = ["全部"].concat(weiboArr);
    const searchWeb = webList
      && webList.map((cur, index) => {
        return (
          <div
            className={`fl ${index === clickIndex ? "current" : ""}`}
            key={index.toString()}
            onClick={() => this.searchItem(cur,index)}
          >
            {cur}
          </div>
        );
      });
    const searchPro = proList
      && proList.map((cur, index) => {
        return (
          <div
            className={`fl ${index === clickIndex ? "current" : ""}`}
            key={index.toString()}
            onClick={() => this.searchItem(cur,index)}
          >
            {cur}
          </div>
        );
      });
    const searchWeibo = weiboArrList && weiboArrList.map((cur, index) => {
      return (
        <div
          className={`fl ${index === clickIndex ? "current" : ""}`}
          key={index.toString()}
          onClick={() => this.searchItem(cur,index)}
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
    const queryList = subjectProListFlag ?
      searchPro : (subjectWeiboTypeFlag ? searchWeibo : searchWeb);
    return (
      <div className="topic-content-query">
        {(renderContactNumber !== "4") && (
          <div className="topic-content-query-class clear">
            <div className="fl">分组浏览 ：</div>
            <div className="topic-content-query-box" ref={(ref) => {this.classType = ref;}}>
              {item}
            </div>
          </div>
        )}
        {(renderContactNumber !== "4") && (
          <div className="topic-content-query-select">
            <div className="query-top clear">
              {(!subjectWeiboTypeFlag) && (
                <Search
                  value={subjectSearchValue}
                  placeholder="请输入检索内容..."
                  enterButton="检索"
                  size="default"
                  allowClear
                  style={{width: "260px"}}
                  onChange={this.searchChange}
                  onSearch={this.searchQuery}
                />
              )}
              {fetchSubjectContentListLoading ? <div className="content-list-loading"><Spin /></div>
                : (!queryList || (queryList && queryList.length === 0) ?
                  <div className="no-data"><img src={noData} alt=""/></div> : (
                    <div
                      className="hot-query-center clear"
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

export default TopicContentQuery;
