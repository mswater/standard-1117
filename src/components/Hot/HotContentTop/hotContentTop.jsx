import React from "react";
import moment from "moment";
import { Icon, Input, DatePicker} from "antd";

import "./index.css";
import { siblings } from "../../../lib/tools/utils";

const { Search } = Input;
const { RangePicker } = DatePicker;

/* eslint-disable no-nested-ternary */
class HotContentTop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classType: 1,
    };
  }

  componentDidMount() {
    const hotClassType = localStorage.getItem("hotClassType");
    this.addEvent();
    if (hotClassType === "2") {
      this.addDateEvent();
    }
  }

  componentDidUpdate () {
    const hotClassType = localStorage.getItem("hotClassType");
    if (hotClassType === "2") {
      this.addDateEvent();
    }
  }

  dateLink = (deadline) => {
    const {
      fetchSiteActivityMap,
      fetchDataTrendMap,
      fetchSourcesStatisticsMap,
      fetchSiteMap
    } = this.props;
    const readingId = localStorage.getItem("readingId");
    const params = {
      kid: Number(readingId),
      deadline
    };
    localStorage.setItem("deadLine", deadline);
    fetchSiteActivityMap(params);
    fetchDataTrendMap(params);
    fetchSourcesStatisticsMap(params);
    fetchSiteMap(params);
  };

  classTypeFunc = (type) => {
    this.setState({
      classType: type,
    }, () => {
      const {
        history,
        fetchHotContentList,
        fetchSiteActivityMap,
        fetchDataTrendMap,
        fetchSourcesStatisticsMap,
        fetchSiteMap,
        hot: {
          hotThemeSearch,
          hotStartDate,
          hotEndDate,
        }
      } = this.props;
      const readingId = localStorage.getItem("readingId");
      const deadLine = localStorage.getItem("deadLine");
      const hotContact = localStorage.getItem("hotContact");
      const orderType = localStorage.getItem("orderType");
      const orderFlag = localStorage.getItem("orderFlag");
      const params = {
        kid: Number(readingId),
        deadline: !deadLine ? 1 : Number(deadLine)
      };
      const obj = {
        searchKey: hotThemeSearch,
        hId: params.kid,
        sourceType: !hotContact ? "" : Number(hotContact),
        webList: [],
        proList: [],
        languageList: [],
        order:(orderFlag === "false") ? "desc" : "asc",
        orderType:!orderType ? 1 : Number(orderType),
        startDate:hotStartDate,
        endDate:hotEndDate,
        pageNum: 1,
        pageSize: 10,
      };
      history.push("/hot");
      if (type === 1) {
        fetchHotContentList(obj);
      }
      localStorage.setItem("hotClassType", type);
      if (type === 2) {
        this.addDateEvent();
        // 热点监测-站点活跃度统计图
        fetchSiteActivityMap(params);
        // 热点监测-数据量趋势图
        fetchDataTrendMap(params);
        // 热点监测-来源统计图
        fetchSourcesStatisticsMap(params);
        // 热点监测-地域热力图
        fetchSiteMap(params);
      }
    });
  };


  // 主题内检索
  searchQuery = (type, value, dateStrings) => {
    const {
      fetchHotContentList,
      hot:{
        hotProListFlag,
        hotWeiboTypeFlag,
        hotLanguageTypeFlag,
        hotSearchQuery,
        hotThemeSearch,
        hotStartDate,
        hotEndDate,
      },
      fetchHotThemeSearch,
      fetchHotThemeSearchFlag,
    } = this.props;
    const readingId = localStorage.getItem("readingId");
    const hotContact = localStorage.getItem("hotContact");
    let startDate;
    let endDate;
    let searchWord;
    if(type === "date"){
      startDate = dateStrings[0];
      endDate = dateStrings[1];
      searchWord = hotThemeSearch !== "" ? hotThemeSearch : "";
    }else if(type === "word"){
      searchWord = value;
      startDate = hotStartDate !== "" ? hotStartDate : "";
      endDate = hotEndDate !== "" ? hotEndDate : "";
    }
    const params = {
      searchKey:searchWord,
      hId: Number(readingId),
      sourceType:Number(hotContact),
      webList:hotWeiboTypeFlag ? [] : (hotProListFlag ? [] :
        (hotLanguageTypeFlag ? [] :
          ((hotSearchQuery.length > 0) ? hotSearchQuery : ["全部"]))),
      proList:hotWeiboTypeFlag ? [] : (hotProListFlag ?
        ((hotSearchQuery.length > 0) ? hotSearchQuery : ["全部"]) : []),
      languageList: hotLanguageTypeFlag ?
        ((hotSearchQuery.length > 0) ? hotSearchQuery : ["全部"]) : [],
      order:"desc",
      isOrigin:(hotSearchQuery.length > 0 && hotSearchQuery[0] === "转发微博") ? 1 :
        (hotSearchQuery.length > 0 && hotSearchQuery[0] === "原创微博" ? 0 : null),
      orderType:!value ? 1 : 3,
      startDate,
      endDate,
      pageNum:1,
      pageSize:10
    };
    fetchHotThemeSearchFlag(true);
    fetchHotThemeSearch({
      hotStartDate: startDate,
      hotEndDate: endDate,
      searchKey:searchWord
    });
    // 调用接口
    fetchHotContentList(params);
  };

  searchChange = (e) => {
    const {
      fetchHotThemeSearch,
    } = this.props;
    fetchHotThemeSearch({
      searchKey:e.target.value
    });
  };

  disabledDate(current) {
    // Can not select days after today
    return current && current > moment().endOf("day");
  }

  checkType() {
    /* eslint-disable no-param-reassign */
    siblings(this).forEach((item, index, arr) => {
      arr[index].style.color = "#343539";
    });
    this.style.color = "#0572B8";
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

  dateType() {
    /* eslint-disable no-param-reassign */
    siblings(this).forEach((item, index, arr) => {
      arr[index].style.color = "#343539";
    });
    this.style.color = "#0572B8";
  }

  addDateEvent() {
    const { timeType } = this;
    const arr = timeType.children;
    const ways = [];
    for (let i = 0; i < arr.length; i += 1) {
      ways.push(arr[i]);
    }
    Array.prototype.forEach.call(ways, (item) => {
      item.addEventListener("click", this.dateType);
    });
  }

  render() {
    const hotClassType = localStorage.getItem("hotClassType");
    const { classType } = this.state;
    return (
      <div className="hot-content-top">
        <div className="hot-content-top-class clear">
          <div className="fl" ref={(ref) => {this.classType = ref;}}>
            <button
              type="button"
              style={
                (!hotClassType || hotClassType === "1" && classType === 1) ?
                  {color: "#0572B8"} : {color: "#343539"}
              }
              onClick={() => {return this.classTypeFunc(1);}}
            >
              <Icon type="bars"/><span>信息列表</span>
            </button>
            <button
              type="button"
              style={
                hotClassType === "2" ? {color: "#0572B8"} : {color: "#343539"}
              }
              onClick={() => {return this.classTypeFunc(2);}}
            >
              <Icon type="bar-chart"/><span>来源分析</span>
            </button>
          </div>
          <div className="fr">
            {(!hotClassType && classType === 1 || hotClassType === "1" && classType === 1) ? (
              <div>
                <label>发布时间：</label>
                <RangePicker
                  defaultPickerValue={[null,moment()]}
                  disabledDate={this.disabledDate}
                  style={{width: "230px", marginRight: "20px"}}
                  onChange={(value, dateStrings) => this.searchQuery("date", value, dateStrings)}
                />
                <label>检索词：</label>
                <Search
                  placeholder="请输入搜索内容"
                  enterButton="主题内搜索"
                  size="default"
                  allowClear
                  style={{width: "250px"}}
                  onChange={this.searchChange}
                  onSearch={(value) => this.searchQuery("word", value)}
                />
              </div>
            ) : (
              <div className="hot-content-top-date" ref={(ref) => {this.timeType = ref;}}>
                <span onClick={() => {return this.dateLink(1);}}>一周</span>
                <span onClick={() => {return this.dateLink(2);}}>一月</span>
                <span onClick={() => {return this.dateLink(3);}}>三月</span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default HotContentTop;
