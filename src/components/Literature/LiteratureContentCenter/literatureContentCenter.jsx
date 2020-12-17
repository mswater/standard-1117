import React from "react";
import  moment from "moment";
import "moment/locale/zh-cn";
import { Input, Select,DatePicker,Button } from "antd";

import "./index.css";

const { RangePicker } = DatePicker;
const { Option } = Select;
const dateFormat = "YYYY/MM/DD";

class LiteratureContentCenter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectValue: "标题",
      startTime: "",
      endTime: ""
    };
    this.searchTheme = "1";
  }

  onChange = (date, dateString) => {
    const { fetchLiteratureDate } = this.props;
    this.setState({
      startTime: dateString[0],
      endTime: dateString[1]
    }, () => {
      fetchLiteratureDate([dateString[0], dateString[1]]);
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

  handleChange = e => {
    const { fetchLiteratureSearchQuery } = this.props;
    fetchLiteratureSearchQuery(e.target.value);
  };

  handleSelectChange = value => {
    const {fetchLiteratureSelectQuery} = this.props;
    this.searchTheme = value;
    this.setState({
      selectValue: value
    });
    fetchLiteratureSelectQuery(value);
  };

  literatureSearch = () => {
    const { startTime,endTime, } = this.state;
    const sId = localStorage.getItem("sId");
    const orderType = localStorage.getItem("literatureOrderType");
    const orderFlag = localStorage.getItem("literatureOrderFlag");
    const {
      fetchLiteratureResetButton,
      literature:{
        literatureSearchQuery,
        literatureSelectQuery,
      }
    } = this.props;
    const {
      fetchLiteratureContentList,
      fetchLiteratureSearchQuery,
      fetchLiteratureSelectQuery,
      fetchLiteratureDateQuery,
      fetchLiteratureThemeSearchFlag,
    } = this.props;
    const params = {
      searchWord: literatureSearchQuery,
      searchType: literatureSelectQuery,
      startTime,
      endTime,
      timeOrder: orderFlag !== "" ? orderFlag : "desc",
      orderType:!orderType ? 1 : Number(orderType),
      pageNum:1,
      pageSize:10,
      sid: sId,
    };
    const date = [startTime, endTime];
    fetchLiteratureSearchQuery(literatureSearchQuery);
    fetchLiteratureSelectQuery(this.searchTheme);
    fetchLiteratureDateQuery(date);
    fetchLiteratureResetButton(false);
    fetchLiteratureThemeSearchFlag(true);
    fetchLiteratureContentList(params);
  };

  render() {
    const { selectValue } = this.state;
    const { literature: { literatureDate, literatureSearchQuery } } = this.props;
    const selectBefore = (
      <Select
        value={`${selectValue}`}
        style={{ width: 90 }}
        onChange={this.handleSelectChange}
      >
        <Option value="1">标题</Option>
        <Option value="2">全文</Option>
        <Option value="3">摘要</Option>
        <Option value="4">上传人</Option>
      </Select>
    );
    return (
      <div>
        <div className="literature-search-btn">
          <div
            style={{ marginBottom: 16 }}
            className="search-by-topic"
          >
            <Input
              addonBefore={selectBefore}
              value={literatureSearchQuery}
              allowClear
              onChange={this.handleChange}
            />
          </div>
          <span>上传时间：</span>
          <div
            style={{ marginBottom: 16,position: "relative" }}
            className="search-by-date"
            ref={ref => {this.calendarBox = ref;}}
          >
            <RangePicker
              allowClear
              value={this.dateValue(literatureDate)}
              placeholder={["开始日期", "结束日期"]}
              onChange={this.onChange}
              className="search-by-date-picker"
              getCalendarContainer={() => this.calendarBox}
            />
            <Button type="primary" onClick={() => {return this.literatureSearch();}}>主题内检索</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default LiteratureContentCenter;
