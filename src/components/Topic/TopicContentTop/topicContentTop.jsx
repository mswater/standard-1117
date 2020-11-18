import React from "react";
import { Icon, Input } from "antd";

import "./index.css";
import { siblings } from "../../../lib/tools/utils";

const { Search } = Input;

/* eslint-disable no-nested-ternary */
class TopicContentTop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classType: 1,
    };
  }

  componentDidMount() {
    const topicClassType = localStorage.getItem("topicClassType");
    this.addEvent();
    if (topicClassType === "2") {
      this.addDateEvent();
    }
  }

  componentDidUpdate () {
    const topicClassType = localStorage.getItem("topicClassType");
    this.addEvent();
    if (topicClassType === "2") {
      this.addDateEvent();
    }
  }

  dateLink = (deadline) => {
    const {
      fetchSubjectDataTrendMap,
      fetchSubSourcesStatisticsMap,
    } = this.props;
    const menuId = localStorage.getItem("id");
    const params = {
      kid: Number(menuId),
      deadline
    };
    localStorage.setItem("deadLine", deadline);
    // 调用接口
    fetchSubjectDataTrendMap(params);
    fetchSubSourcesStatisticsMap(params);
  };

  classTypeFunc = (type) => {
    this.setState({
      classType: type,
    }, () => {
      const {
        history,
        fetchSubjectList,
        fetchSubjectContentList,
        fetchSubjectDataTrendMap,
        fetchSubSourcesStatisticsMap,
        subject:{
          subjectThemeSearch
        }
      } = this.props;
      const menuId = localStorage.getItem("id");
      const deadLine = localStorage.getItem("deadLine");
      const topicContact = localStorage.getItem("topicContact");
      const orderType = localStorage.getItem("topicOrderType");
      const orderFlag = localStorage.getItem("topicOrderFlag");
      const params = {
        kid:Number(menuId),
        deadline: !deadLine ? 1 : Number(deadLine)
      };
      const obj = {
        searchKey: subjectThemeSearch,
        hId: params.kid,
        sourceType: !topicContact ? "" : Number(topicContact),
        webList: [],
        proList: [],
        order:!orderFlag ? "desc" : "asc",
        orderType:!orderType ? 1 : Number(orderType),
        pageNum: 1,
        pageSize: 10,
      };
      history.push("/topic");
      fetchSubjectList();
      if (type === 1) {
        fetchSubjectContentList(obj);
      }
      localStorage.setItem("topicClassType", type);
      if(type === 2){
        this.addDateEvent();
        fetchSubjectDataTrendMap(params);
        fetchSubSourcesStatisticsMap(params);
      }
    });
  };


  searchQuery = (value) => {
    const {
      fetchSubjectContentList,
      subject:{
        subjectProListFlag,
        subjectSearchQuery,
        subjectWeiboTypeFlag,
      },
      fetchSubjectThemeSearch,
      fetchSubjectThemeSearchFlag
    } = this.props;
    const menuId = localStorage.getItem("id");
    const topicContact = localStorage.getItem("topicContact");
    const params = {
      searchKey:value,
      hId:Number(menuId),
      sourceType: Number(topicContact),
      webList:subjectWeiboTypeFlag ? [] : (subjectProListFlag ? []
        :(subjectSearchQuery!==[] ? subjectSearchQuery : [])),
      proList:subjectWeiboTypeFlag ? [] : (subjectProListFlag ?
        (subjectSearchQuery!==[] ? subjectSearchQuery : []) : []),
      order:"desc",
      isOrigin:(subjectSearchQuery === "转发微博") ? 1 :(subjectSearchQuery === "原创微博" ? 0 : null),
      orderType:value === "" ? 1 : 3,
      pageNum:1,
      pageSize:10
    };
    fetchSubjectThemeSearchFlag(true);
    fetchSubjectThemeSearch(value);
    fetchSubjectContentList(params);
  };

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
    const topicClassType = localStorage.getItem("topicClassType");
    const { classType } = this.state;
    return (
      <div className="topic-content-top">
        <div className="topic-content-top-class clear">
          <div className="fl" ref={(ref) => {this.classType = ref;}}>
            <button
              type="button"
              style={
                (!topicClassType || topicClassType === "1" && classType === 1) ?
                  {color: "#0572B8"} : {color: "#343539"}
              }
              onClick={() => {return this.classTypeFunc(1);}}
            >
              <Icon type="bars"/><span>信息列表</span>
            </button>
            <button
              type="button"
              style={
                topicClassType === "2" ? {color: "#0572B8"} : {color: "#343539"}
              }
              onClick={() => {return this.classTypeFunc(2);}}
            >
              <Icon type="bar-chart"/><span>来源分析</span>
            </button>
          </div>
          <div className="fr">
            {(!topicClassType && classType === 1 || topicClassType === "1" && classType === 1) ? (
              <Search
                placeholder="请输入您想要搜索的内容..."
                enterButton="主题内搜索"
                size="default"
                allowClear
                style={{width: "390px"}}
                onSearch={this.searchQuery}
              />
            ) : (
              <div className="topic-content-top-date" ref={(ref) => {this.timeType = ref;}}>
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

export default TopicContentTop;
