import React from "react";
import  moment from "moment";
import "moment/locale/zh-cn";
import {Input ,DatePicker,Button } from "antd";
import "./index.css";

const { Search } = Input;
const dateFormat = "YYYY/MM/DD";

class MeetingContentCenter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startTime: "",
      endTime: "",
    };
  }

  componentDidMount() {
  }

  onChange = (date, dateString) => {
    const { fetchMeetingDate } = this.props;
    this.setState({
      startTime: dateString[0],
      endTime: dateString[1]
    }, () => {
      fetchMeetingDate([dateString[0], dateString[1]]);
    });
  };


  dateValue = (date) => {
    if (date[0] && date[1]) {
      // todo 传进来的时间先判断是为真，然后先split在join，是因为有的浏览器时间不支持--格式
      return [
        moment(date[0].split("-").join("/"), dateFormat),
        moment(date[1].split("-").join("/"), dateFormat)
      ];
    }
    return [];
  };

  searchChange = (e) => {
    const {
      fetchMeetingThemeSearch,
    } = this.props;
    fetchMeetingThemeSearch(e.target.value);
  };


  confirmMeeting = (type, value) =>{
    /* eslint-disable no-nested-ternary */
    const { startTime, endTime } = this.state;
    const {
      fetchMeetingList,
      fetchMeetingDateQuery,
      fetchMeetingThemeSearchFlag,
      fetchMeetingResetButton,
      meeting:{
        meetingSearchQuery,
        meetingProListFlag,
        meetingThemeSearch,
        meetingLanguageListFlag,
      }
    } = this.props;
    const params = {
      starTime: startTime,
      endTime,
      searchKey: type === "search" ? value : meetingThemeSearch,
      webList:  meetingProListFlag ? [] : (meetingLanguageListFlag ? [] :
        (meetingSearchQuery === "全部" ? [] : meetingSearchQuery)),
      proList: meetingProListFlag ? (meetingSearchQuery === "全部" ? [] : meetingSearchQuery) : [],
      languageList: meetingLanguageListFlag ? (meetingSearchQuery === "全部" ?
        [] : meetingSearchQuery) : [],
      timeOrder: "",
      browseOrder: "",
      relevantOrder:"",
      pageNum: 1,
      pageSize: 10
    };
    if(!meetingSearchQuery){
      params.timeOrder = "desc";
    }else{
      params.relevantOrder = "desc";
    }
    const date = [startTime, endTime];
    fetchMeetingResetButton(false);
    fetchMeetingThemeSearchFlag(true);
    fetchMeetingDateQuery(date);
    fetchMeetingList(params);
  };


  render() {
    const { RangePicker } = DatePicker;
    const { meeting: { meetingDate } } = this.props;
    return (
      <div className="meeting-search-btn clear">
        <span>会议主题：</span>
        <div style={{ marginBottom: 16 }} className="search-by-topic">
          <Search
            placeholder="请输入您要检索的主题..."
            size="default"
            allowClear
            style={{width: "450px"}}
            onChange={this.searchChange}
            onSearch={(value) => {return this.confirmMeeting("search", value);}}
          />
        </div>
        <span>会议时间：</span>
        <div
          style={{ marginBottom: 16,position: "relative"}}
          className="search-by-date"
          ref={ref => {this.calendarBox = ref;}}
        >
          <RangePicker
            placeholder={["开始日期", "结束日期"]}
            allowClear
            value={this.dateValue(meetingDate)}
            onChange={this.onChange}
            className="search-by-date-picker"
            getCalendarContainer={() => this.calendarBox}
          />
          <Button
            type="primary"
            onClick={() => {return this.confirmMeeting("button");}}
          >
            会议检索
          </Button>
        </div>
      </div>
    );
  }
}

export default MeetingContentCenter;
