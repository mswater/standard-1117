import React from "react";
import { Input, Icon, Spin } from "antd";
import "./index.css";
import { siblings, fuzzyQuery } from "../../../lib/tools/utils";
import noData from "../../../images/nodata.png";

const { Search } = Input;
let weiboArr = ["原创微博", "转发微博"];

class HotContentQuery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    const {
      hot:{
        hotContentListData,
        fetchHotContentListLoading,
        hotProListFlag,
        hotWeiboTypeFlag,
      }
    } = this.props;
    const searchWeb = hotContentListData.webList;
    const searchPro = hotContentListData.proList;
    /* eslint-disable no-nested-ternary */
    const queryList = hotProListFlag ? searchPro : (hotWeiboTypeFlag ? weiboArr : searchWeb);
    this.addEvent();
    // 判断是否接口是返回之后，在调用方法
    if (!fetchHotContentListLoading && (queryList && queryList.length > 0)) {
      this.addItemEvent();
    }
  }

  componentDidUpdate () {
    const {
      hot:{
        hotContentListData,
        hotResetButtonFlag,
        hotProListFlag,
        hotWeiboTypeFlag,
        fetchHotContentListLoading
      }
    } = this.props;
    const searchWeb = hotContentListData.webList;
    const searchPro = hotContentListData.proList;
    /* eslint-disable no-nested-ternary */
    const queryList = hotProListFlag ? searchPro : (hotWeiboTypeFlag ? weiboArr : searchWeb);
    const { classType } = this;
    const classArr = classType.children;
    this.addEvent();
    if (hotResetButtonFlag) {
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
    if (!fetchHotContentListLoading && (queryList && queryList.length > 0)) {
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
      fetchHotResetFuzzyQuery,
      fetchHotContentList,
      fetchHotSearchValue,
      hot:{
        hotContentListData,
        hotProListFlag,
        hotThemeSearch
      }
    } = this.props;
    const readingId = localStorage.getItem("readingId");
    const hotContact = localStorage.getItem("hotContact");
    const orderType = localStorage.getItem("orderType");
    const orderFlag = localStorage.getItem("orderFlag");
    const paramsEmpty = {
      searchKey: hotThemeSearch,
      hId: Number(readingId),
      sourceType:Number(hotContact),
      webList:[],
      proList:hotProListFlag ? ["全部"] : [],
      order:orderFlag ? "desc" : "asc",
      orderType:orderType ? 1 : Number(orderType),
      pageNum:1,
      pageSize:10
    };
    fetchHotSearchValue(value);
    if (!value || value === "全部") {
      fetchHotContentList(paramsEmpty);
    }
    const isWebList = hotProListFlag ? hotContentListData.hotProList
      : hotContentListData.hotWebList;
    const fuzzyArr = fuzzyQuery(isWebList, value);
    /**
     * 重新渲染数组，这里要mock和返回的对象一样的数据格式
     * 先用展开原有的对象，在重新赋值想改变的数组
     * 在判断是否是地区分布hotProListFlag：true 是 false 不是
     */
    const paramsWeb = {
      ...hotContentListData,
      webList: fuzzyArr
    };
    const paramsPro = {
      ...hotContentListData,
      proList: fuzzyArr
    };
    fetchHotResetFuzzyQuery(hotProListFlag ? paramsPro : paramsWeb);
  };

  searchChange = (e) => {
    const {
      fetchHotSearchValue,
    } = this.props;
    fetchHotSearchValue(e.target.value);
  };

  // 地区判断
  proListFunc = (tag) => {
    const {
      fetchHotContentList,
      fetchHotProList,
      fetchHotResetButton,
      fetchHotResetWeibo,
      fetchHotResetLanguage,
      fetchHotSearchValue,
      hot:{
        hotThemeSearch,
        hotStartDate,
        hotEndDate,
      },
      handlerIndex
    } = this.props;
    const readingId = localStorage.getItem("readingId");
    const hotContact = localStorage.getItem("hotContact");
    const orderType = localStorage.getItem("orderType");
    const params = {
      searchKey: hotThemeSearch,
      hId: Number(readingId),
      sourceType:Number(hotContact),
      webList:[],
      proList:(tag === "地区分布") ? ["全部"] : [],
      order:"desc",
      orderType:!orderType ? 1 : Number(orderType),
      startDate:hotStartDate,
      endDate:hotEndDate,
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
    fetchHotSearchValue();
    fetchHotResetWeibo(weiboFlag);
    fetchHotProList(otherFlag);
    fetchHotResetLanguage(languageFlag);
    fetchHotResetButton(false);
    fetchHotContentList(params);
    handlerIndex(0);
  };

  // 点击全部
  resetListFunc = () => {
    const {
      fetchHotContentList,
      fetchHotSearchQuery,
      hot:{
        hotProListFlag,
        hotThemeSearch,
        hotStartDate,
        hotEndDate,
      }
    } = this.props;
    const readingId = localStorage.getItem("readingId");
    const hotContact = localStorage.getItem("hotContact");
    const orderType = localStorage.getItem("orderType");
    const orderFlag = localStorage.getItem("orderFlag");
    const params = {
      searchKey: hotThemeSearch,
      hId: Number(readingId),
      sourceType:Number(hotContact),
      webList:[],
      proList:hotProListFlag ? ["全部"] : [],
      order:orderFlag ? "desc" : "asc",
      orderType:!orderType ? 1 : Number(orderType),
      startDate:hotStartDate,
      endDate:hotEndDate,
      pageNum:1,
      pageSize:10
    };
    fetchHotSearchQuery();
    fetchHotContentList(params);
    weiboArr =  ["原创微博", "转发微博"];
  };

  sourceArr = () => {
    // renderContactNumber 判断是什么类型 1资讯 2微博 3微信
    const renderContactNumber = localStorage.getItem("hotContact");
    if (parseInt(renderContactNumber, 0) === 1) {
      return ["来源网站", "语种分类", "地区分布"];
    }
    if (parseInt(renderContactNumber, 0) === 2) {
      return ["来源用户", "微博类型", "地区分布"];
    }
    if (parseInt(renderContactNumber, 0) === 3) {
      return ["来源公众号", "地区分布"];
    }
    return ["来源网站", "语种分类", "地区分布"];
  };

  // 直接点击，安徽等检索
  searchItem =(item,clickIdx) =>{
    if(item === "全部"){
      this.resetListFunc();
    }
    const {
      fetchHotContentList,
      fetchHotResetButton,
      fetchHotSearchQuery,
      hot:{
        hotProListFlag,
        hotWeiboTypeFlag,
        hotThemeSearch,
        hotStartDate,
        hotEndDate,
      },
      handlerIndex
    } = this.props;
    const readingId = localStorage.getItem("readingId");
    const hotContact = localStorage.getItem("hotContact");
    const orderType = localStorage.getItem("orderType");
    const orderFlag = localStorage.getItem("orderFlag");
    const params = {
      searchKey:hotThemeSearch,
      hId: Number(readingId),
      sourceType:Number(hotContact),
      webList:hotWeiboTypeFlag ? [] : (hotProListFlag ? [] : [item]),
      proList:hotWeiboTypeFlag ? [] : (hotProListFlag ?  [item] : []),
      order:!orderFlag ? "desc" : "asc",
      orderType:!orderType ? 1 : Number(orderType),
      isOrigin:(item === "转发微博") ? 1 :(item === "原创微博" ? 0 : null),
      startDate:hotStartDate,
      endDate:hotEndDate,
      pageNum:1,
      pageSize:10
    };
    fetchHotSearchQuery(item);
    fetchHotResetButton(false);
    fetchHotContentList(params);
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
        hotContentListData,
        hotProListFlag,
        hotWeiboTypeFlag,
        hotLanguageTypeFlag,
        fetchHotContentListLoading,
        hotSearchValue
      },
      clickIndex
    } = this.props;
    const webList = ["全部"].concat(hotContentListData.webList);
    const proList = ["全部"].concat(hotContentListData.proList);
    const weiboArrList = ["全部"].concat(weiboArr);
    const languageList = ["全部"].concat(hotContentListData.languageList);
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
    const queryList = hotProListFlag ?
      searchPro : (hotWeiboTypeFlag ?
        searchWeibo : (hotLanguageTypeFlag ?
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
            {(!(hotWeiboTypeFlag || hotLanguageTypeFlag)) && (
              <Search
                value={hotSearchValue}
                placeholder="请输入搜索内容..."
                enterButton="搜索"
                size="default"
                allowClear
                style={{ width: "260px" }}
                onChange={this.searchChange}
                onSearch={this.searchQuery}
              />
            )}
            {fetchHotContentListLoading ? <div className="content-list-loading"><Spin /></div>
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

export default HotContentQuery;
