import React from "react";
import { Input, Icon, Spin } from "antd";
import "./index.css";
import { siblings, fuzzyQuery } from "../../../lib/tools/utils";
import noData from "../../../images/nodata.png";

const { Search } = Input;
let weiboArr = ["原创微博", "转发微博"];

class SubjectContentQuery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    const {
      hot:{
        subjectContentListData,
        fetchSubjectContentListLoading,
        subjectProListFlag,
        subjectWeiboTypeFlag,
        subjectLanguageTypeFlag,
      }
    } = this.props;
    const searchWeb = subjectContentListData.webList;
    const searchPro = subjectContentListData.proList;
    const searchLanguage = subjectContentListData.languageList;
    /* eslint-disable no-nested-ternary */
    const queryList = subjectProListFlag ?
      searchPro : (subjectWeiboTypeFlag ?
        weiboArr : (subjectLanguageTypeFlag ?
          searchLanguage : searchWeb));
    this.addEvent();
    // 判断是否接口是返回之后，在调用方法
    if (!fetchSubjectContentListLoading && (queryList && queryList.length > 0)) {
      this.addItemEvent();
    }
  }

  componentDidUpdate () {
    const {
      hot:{
        subjectContentListData,
        subjectResetButtonFlag,
        subjectProListFlag,
        subjectWeiboTypeFlag,
        fetchSubjectContentListLoading,
        subjectLanguageTypeFlag,
      }
    } = this.props;
    const searchWeb = subjectContentListData.webList;
    const searchPro = subjectContentListData.proList;
    const searchLanguage = subjectContentListData.languageList;
    /* eslint-disable no-nested-ternary */
    const queryList = subjectProListFlag ?
      searchPro : (subjectWeiboTypeFlag ?
        weiboArr : (subjectLanguageTypeFlag ?
          searchLanguage : searchWeb));
    const { classType } = this;
    const classArr = classType.children;
    this.addEvent();
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
    if (!fetchSubjectContentListLoading && (queryList && queryList.length > 0)) {
      const { itemType } = this;
      const itemArr = itemType.children;
      this.addItemEvent();
      if (itemArr.length > 2) {
        // 遍历搜索列表的
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
      fetchSubjectResetFuzzyQuery,
      fetchSubjectContentList,
      fetchSubjectSearchValue,
      hot:{
        subjectContentListData,
        subjectProListFlag,
        subjectThemeSearch,
        subjectLanguageTypeFlag,
        subjectStartDate,
        subjectEndDate,
      }
    } = this.props;
    const readingId = localStorage.getItem("subjectReadingId");
    const subjectContact = localStorage.getItem("subjectContact");
    const orderType = localStorage.getItem("subjectOrderType");
    const orderFlag = localStorage.getItem("subjectOrderFlag");
    const paramsEmpty = {
      searchKey: subjectThemeSearch,
      hId: Number(readingId),
      sourceType:Number(subjectContact),
      webList:[],
      proList:subjectProListFlag ? ["全部"] : [],
      languageList:subjectLanguageTypeFlag ? ["全部"] : [],
      order:orderFlag ? "desc" : "asc",
      orderType:orderType ? 1 : Number(orderType),
      startDate:subjectStartDate,
      endDate:subjectEndDate,
      pageNum:1,
      pageSize:10
    };
    fetchSubjectSearchValue(value);
    if (!value || value === "全部") {
      fetchSubjectContentList(paramsEmpty);
    }
    const isWebList = subjectProListFlag ? subjectContentListData.subjectProList
      : subjectContentListData.subjectWebList;
    const fuzzyArr = fuzzyQuery(isWebList, value);
    /**
     * 重新渲染数组，这里要mock和返回的对象一样的数据格式
     * 先用展开原有的对象，在重新赋值想改变的数组
     * 在判断是否是地区分布hotProListFlag：true 是 false 不是
     */
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

  // 地区判断
  proListFunc = (tag) => {
    const {
      fetchSubjectContentList,
      fetchSubjectProList,
      fetchSubjectResetButton,
      fetchSubjectResetWeibo,
      fetchSubjectResetLanguage,
      fetchSubjectSearchValue,
      hot:{
        subjectThemeSearch,
        subjectStartDate,
        subjectEndDate,
      },
      handlerIndex
    } = this.props;
    const readingId = localStorage.getItem("subjectReadingId");
    const subjectContact = localStorage.getItem("subjectContact");
    const orderType = localStorage.getItem("subjectOrderType");
    const params = {
      searchKey: subjectThemeSearch,
      hId: Number(readingId),
      sourceType:Number(subjectContact),
      webList:[],
      proList:(tag === "地区分布") ? ["全部"] : [],
      languageList:(tag === "语种分类") ? ["全部"] : [],
      order:"desc",
      orderType:!orderType ? 1 : Number(orderType),
      startDate:subjectStartDate,
      endDate:subjectEndDate,
      pageNum:1,
      pageSize:10
    };
    let languageFlag;
    let weiboFlag;
    let otherFlag;
    switch (tag){
      case "语种分类":
        languageFlag = true;
        weiboFlag = false;
        otherFlag = false;
        break;
      case "微博类型":
        weiboFlag = true;
        languageFlag = false;
        otherFlag = false;
        break;
      case "地区分布":
        otherFlag = true;
        weiboFlag = false;
        languageFlag = false;
        break;
      default:
        otherFlag = false;
        weiboFlag = false;
        languageFlag = false;
    }
    fetchSubjectSearchValue();
    fetchSubjectResetWeibo(weiboFlag);
    fetchSubjectProList(otherFlag);
    fetchSubjectResetLanguage(languageFlag);
    fetchSubjectResetButton(false);
    fetchSubjectContentList(params);
    handlerIndex(0);
  };

  // 点击全部
  resetListFunc = () => {
    const {
      fetchSubjectContentList,
      fetchSubjectSearchQuery,
      hot:{
        subjectProListFlag,
        subjectThemeSearch,
        subjectLanguageTypeFlag,
        subjectStartDate,
        subjectEndDate,
      }
    } = this.props;
    const readingId = localStorage.getItem("subjectReadingId");
    const subjectContact = localStorage.getItem("subjectContact");
    const orderType = localStorage.getItem("subjectOrderType");
    const orderFlag = localStorage.getItem("subjectOrderFlag");
    const params = {
      searchKey: subjectThemeSearch,
      hId: Number(readingId),
      sourceType:Number(subjectContact),
      webList:[],
      proList:subjectProListFlag ? ["全部"] : [],
      languageList:subjectLanguageTypeFlag ? ["全部"] : [],
      order:orderFlag ? "desc" : "asc",
      orderType:!orderType ? 1 : Number(orderType),
      startDate:subjectStartDate,
      endDate:subjectEndDate,
      pageNum:1,
      pageSize:10
    };
    fetchSubjectSearchQuery();
    fetchSubjectContentList(params);
    weiboArr =  ["原创微博", "转发微博"];
  };

  sourceArr = () => {
    // renderContactNumber 判断是什么类型 1资讯 2微博 3微信 4国外文献 5国内文献
    const renderContactNumber = parseInt(localStorage.getItem("subjectContact"), 0);
    if (renderContactNumber === 1) {
      return ["来源网站", "语种分类", "地区分布"];
    }
    if (renderContactNumber === 2) {
      return ["来源用户", "微博类型", "地区分布"];
    }
    if (renderContactNumber === 3) {
      return ["来源公众号", "地区分布"];
    }
    if (renderContactNumber === 4 || renderContactNumber === 5) {
      return ["来源期刊", "发文作者", "发文机构"];
    }
    return ["来源网站", "语种分类", "地区分布"];
  };

  // 直接点击，安徽等检索
  searchItem =(item,clickIdx) =>{
    if(item === "全部"){
      this.resetListFunc();
    }
    const {
      fetchSubjectContentList,
      fetchSubjectResetButton,
      fetchSubjectSearchQuery,
      hot:{
        subjectProListFlag,
        subjectWeiboTypeFlag,
        subjectThemeSearch,
        subjectLanguageTypeFlag,
        subjectStartDate,
        subjectEndDate,
      },
      handlerIndex
    } = this.props;
    const readingId = localStorage.getItem("subjectReadingId");
    const subjectContact = localStorage.getItem("subjectContact");
    const orderType = localStorage.getItem("subjectOrderType");
    const orderFlag = localStorage.getItem("subjectOrderFlag");
    const params = {
      searchKey:subjectThemeSearch,
      hId: Number(readingId),
      sourceType:Number(subjectContact),
      webList:subjectWeiboTypeFlag ? [] : (subjectProListFlag ? [] : [item]),
      proList:subjectWeiboTypeFlag ? [] : (subjectProListFlag ?  [item] : []),
      languageList:subjectLanguageTypeFlag ? [item] : [],
      order:!orderFlag ? "desc" : "asc",
      orderType:!orderType ? 1 : Number(orderType),
      isOrigin:(item === "转发微博") ? 1 :(item === "原创微博" ? 0 : null),
      startDate:subjectStartDate,
      endDate:subjectEndDate,
      pageNum:1,
      pageSize:10
    };
    fetchSubjectSearchQuery(item);
    fetchSubjectResetButton(false);
    fetchSubjectContentList(params);
    handlerIndex(clickIdx === 0 ? clickIdx : 1);
    if (item === "转发微博") {
      weiboArr = ["转发微博"];
    }
    if (item === "原创微博") {
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

  // 切换1资讯 2微博 3微信
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

  // 切换搜索列表的
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
      hot:{
        subjectContentListData,
        subjectProListFlag,
        subjectWeiboTypeFlag,
        subjectLanguageTypeFlag,
        fetchSubjectContentListLoading,
        subjectSearchValue
      },
      clickIndex
    } = this.props;
    const webList = ["全部"].concat(subjectContentListData.webList);
    const proList = ["全部"].concat(subjectContentListData.proList);
    const weiboArrList = ["全部"].concat(weiboArr);
    const languageList = ["全部"].concat(subjectContentListData.languageList);
    const searchWeb = webList && webList.map((cur, index) => {
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
    const searchPro = proList && proList.map((cur, index) => {
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
    const searchLanguage = languageList && languageList.map((cur, index) => {
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
          onClick={() => this.proListFunc(cur)}
        >
          <span>{cur}</span><Icon type="up" />
        </button>
      );
    });
    /* eslint-disable no-nested-ternary */
    const queryList = subjectProListFlag ?
      searchPro : (subjectWeiboTypeFlag ?
        searchWeibo : (subjectLanguageTypeFlag ?
          searchLanguage : searchWeb));
    return (
      <div className="hot-content-query">
        <div className="hot-content-query-class clear">
          <div className="fl">分组浏览 ：</div>
          <div
            className="hot-content-query-box"
            ref={(ref) => {
              this.classType = ref;
            }}
          >
            {item}
          </div>
        </div>
        <div className="hot-content-query-select">
          <div className="query-top clear">
            {(!(subjectWeiboTypeFlag || subjectLanguageTypeFlag)) && (
              <Search
                value={subjectSearchValue}
                placeholder="请输入搜索内容..."
                enterButton="搜索"
                size="default"
                allowClear
                style={{ width: "260px" }}
                onChange={this.searchChange}
                onSearch={this.searchQuery}
              />
            )}
            {fetchSubjectContentListLoading ? <div className="content-list-loading"><Spin /></div>
              : (!queryList || (queryList && queryList.length === 0) ?
                <div className="no-data"><img src={noData} alt=""/></div>
                : (
                  <div
                    className="hot-query-center"
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

export default SubjectContentQuery;
