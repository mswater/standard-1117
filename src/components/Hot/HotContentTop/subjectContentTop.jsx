import React from "react";
import moment from "moment";
import { Icon, Input, DatePicker} from "antd";
import "./index.css";
import { siblings } from "../../../lib/tools/utils";

const { Search } = Input;
const { RangePicker } = DatePicker;

/* eslint-disable no-nested-ternary */
class SubjectContentTop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classType: 1,
    };
  }

  componentDidMount() {
    const subjectClassType = localStorage.getItem("subjectClassType");
    this.addEvent();
    if (subjectClassType === "2") {
      this.addDateEvent();
    }
  }

  componentDidUpdate () {
    const subjectClassType = localStorage.getItem("subjectClassType");
    if (subjectClassType === "2") {
      this.addDateEvent();
    }
  }

  dateLink = (deadline) => {
    const {
      fetchSubjectSiteActivityMap,
      fetchSubjectDataTrendMap,
      fetchSubjectSourcesStatisticsMap,
      fetchSubjectSiteMap
    } = this.props;
    const readingId = localStorage.getItem("subjectReadingId");
    const params = {
      kid: Number(readingId),
      deadline
    };
    localStorage.setItem("subjectDeadLine", deadline);
    fetchSubjectSiteActivityMap(params);
    fetchSubjectDataTrendMap(params);
    fetchSubjectSourcesStatisticsMap(params);
    fetchSubjectSiteMap(params);
  };

  classTypeFunc = (type) => {
    this.setState({
      classType: type,
    }, () => {
      const {
        history,
        fetchSubjectContentList,
        fetchSubjectSiteActivityMap,
        fetchSubjectDataTrendMap,
        fetchSubjectSourcesStatisticsMap,
        fetchSubjectSiteMap,
        hot: {
          subjectThemeSearch
        }
      } = this.props;
      const readingId = localStorage.getItem("subjectReadingId");
      const deadLine = localStorage.getItem("subjectDeadLine");
      const subjectContact = localStorage.getItem("subjectContact");
      const orderType = localStorage.getItem("subjectOrderType");
      const orderFlag = localStorage.getItem("subjectOrderFlag");
      const params = {
        kid: Number(readingId),
        deadline: !deadLine ? 1 : Number(deadLine)
      };
      const obj = {
        searchKey: subjectThemeSearch,
        hId: params.kid,
        sourceType: !subjectContact ? "" : Number(subjectContact),
        webList: [],
        proList: [],
        order:!orderFlag ? "desc" : "asc",
        orderType:!orderType ? 1 : Number(orderType),
        pageNum: 1,
        pageSize: 10,
      };
      history.push("/subject");
      if (type === 1) {
        fetchSubjectContentList(obj);
      }
      localStorage.setItem("subjectClassType", type);
      if (type === 2) {
        this.addDateEvent();
        // 热点监测-站点活跃度统计图
        fetchSubjectSiteActivityMap(params);
        // 热点监测-数据量趋势图
        fetchSubjectDataTrendMap(params);
        // 热点监测-来源统计图
        fetchSubjectSourcesStatisticsMap(params);
        // 热点监测-地域热力图
        fetchSubjectSiteMap(params);
      }
    });
  };


  // 主题内检索
  searchQuery = (type, value, dateStrings) => {
    const {
      fetchSubjectContentList,
      hot:{
        subjectProListFlag,
        subjectWeiboTypeFlag,
        subjectSearchQuery,
      },
      fetchSubjectThemeSearch,
      fetchSubjectThemeSearchFlag
    } = this.props;
    const readingId = localStorage.getItem("subjectReadingId");
    const subjectContact = localStorage.getItem("subjectContact");
    let searchDate;
    let searchWord;
    if(type === "date"){
      searchDate = dateStrings;
    }else if(type === "word"){
      searchWord = value;
    }
    const params = {
      searchDate,
      searchKey:searchWord,
      hId: Number(readingId),
      sourceType:Number(subjectContact),
      webList:subjectWeiboTypeFlag ? [] : (subjectProListFlag ? []
        :(subjectSearchQuery!==[] ? subjectSearchQuery : [])),
      proList:subjectWeiboTypeFlag ? [] : (subjectProListFlag ?
        (subjectSearchQuery!==[] ? subjectSearchQuery : ["全部"]) : []),
      order:"desc",
      isOrigin:(subjectSearchQuery === "转发微博") ? 1 :(subjectSearchQuery === "原创微博" ? 0 : null),
      orderType:!value ? 1 : 3,
      pageNum:1,
      pageSize:10
    };
    fetchSubjectThemeSearchFlag(true);
    fetchSubjectThemeSearch({
      searchDate,
      searchKey:searchWord
    });
    // 调用接口
    fetchSubjectContentList(params);
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
    const subjectClassType = localStorage.getItem("subjectClassType");
    const { classType } = this.state;
    return (
      <div className="hot-content-top">
        <div className="hot-content-top-class clear">
          <div className="fl" ref={(ref) => {this.classType = ref;}}>
            <button
              type="button"
              style={
                (!subjectClassType || subjectClassType === "1" && classType === 1) ?
                  {color: "#0572B8"} : {color: "#343539"}
              }
              onClick={() => {return this.classTypeFunc(1);}}
            >
              <Icon type="bars"/><span>信息列表</span>
            </button>
            <button
              type="button"
              style={
                subjectClassType === "2" ? {color: "#0572B8"} : {color: "#343539"}
              }
              onClick={() => {return this.classTypeFunc(2);}}
            >
              <Icon type="bar-chart"/><span>来源分析</span>
            </button>
          </div>
          <div className="fr">
            {(!subjectClassType && classType === 1 ||
              subjectClassType === "1" && classType === 1) ? (
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

export default SubjectContentTop;
