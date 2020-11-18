import React from "react";
import  moment from "moment";
import "moment/locale/zh-cn";
import { Button, Icon, DatePicker } from "antd";

import "./index.css";

const dateFormat = "YYYY/MM/DD";

/* eslint-disable no-nested-ternary */
class SearchContentTop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startTime: "",
      endTime: ""
    };
  }


  onChange = (date, dateString) => {
    const { fetchSearchDate } = this.props;
    this.setState({
      startTime: dateString[0],
      endTime: dateString[1]
    }, () => {
      fetchSearchDate([dateString[0], dateString[1]]);
    });
  };

  dateValue = (date) => {
    if (date[0] && date[1]) {
      return [
        moment(date[0].split("-").join("/"), dateFormat),
        moment(date[1].split("-").join("/"), dateFormat)
      ];
    }
    return [];
  };

  deleteSearch = () => {
    const {
      fetchHeaderSearch,
      fetchSearch,
      search:{
        searchDateQuery,
      }
    } = this.props;
    const searchContact = localStorage.getItem("searchContact");
    const params= {
      type:!searchContact ? 1 : Number(searchContact),
      starTime: searchDateQuery[0],
      endTime:searchDateQuery[1],
      searchKey: "",
      webList: [],
      proList: [],
      timeOrder: "desc",
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
    fetchHeaderSearch();
    fetchSearch(params);
  };

  confirmSearch = () =>{
    const { startTime, endTime } = this.state;
    const {
      fetchSearch,
      headerSearchContent,
      fetchSearchDateQuery,
      search: {
        searchSearchQuery,
        searchProListFlag,
        searchWeiboTypeFlag,
      },
    } = this.props;
    const searchContact = localStorage.getItem("searchContact");
    const params = {
      type:Number(searchContact),
      starTime: startTime,
      endTime,
      searchKey: headerSearchContent,
      webList: searchWeiboTypeFlag ? [] :(searchProListFlag ? [] :
        (searchSearchQuery!==[] ? (searchSearchQuery === "全部" ?
          [] : searchSearchQuery) : [])),
      proList: searchWeiboTypeFlag ? [] :(searchProListFlag ?
        (searchSearchQuery!==[] ? (searchSearchQuery === "全部" ?
          [] : searchSearchQuery) : []) : []),
      timeOrder: "",
      browseOrder: "",
      relevantOrder: null,
      transpondOrder: null,
      commentOrder: null,
      likeOrder: null,
      mettingOrder: null,
      blogType:[],
      pageNum: 1,
      pageSize: 10
    };
    if(!searchSearchQuery){
      params.timeOrder = "desc";
    }else{
      params.relevantOrder = "desc";
    }
    const date = [startTime, endTime];
    fetchSearchDateQuery(date);
    fetchSearch(params);
  };


  render() {
    const { RangePicker } = DatePicker;
    const { headerSearchContent, search: { searchDate } } = this.props;
    return (
      <div className="search-content-top">
        <div className="search-search-btn clear">
          <span>筛选条件:</span>
          <span>检索词</span>
          <div
            style={{ margin: 0 ,color:"#3787C1",width: 560}}
            className="search-by-topic fl"
          >
            <span className="search-box">
              {headerSearchContent}
            </span>
            {(headerSearchContent) && (<Icon type="close-circle" onClick={this.deleteSearch} />)}
          </div>
          <span>发布时间：</span>
          <div
            style={{ marginBottom: 16,position: "relative"}}
            className="search-by-date fr"
            ref={ref => {this.calendarBox = ref;}}
          >
            <RangePicker
              placeholder={["开始日期", "结束日期"]}
              allowClear
              value={this.dateValue(searchDate)}
              onChange={this.onChange}
              className="search-by-date-picker"
              getCalendarContainer={() => this.calendarBox}
            />
            <Button type="primary" onClick={() => {return this.confirmSearch();}}>确定</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchContentTop;
