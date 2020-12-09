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
      selectValue: "主题",
      startTime: "",
      endTime: ""
    };
    this.searchTheme = "";
  }

  contactFunc = (type) => {
    /* eslint-disable no-nested-ternary */
    const {
      history,
      fetchLiteratureContentList,
      fetchLiteratureSearchQuery,
      fetchLiteratureDateQuery,
      fetchLiteratureSelectQuery,
      fetchLiteratureDate,
      fetchLiteratureSearchValue,
      fetchLiteratureResetButton,
      fetchLiteratureSearchValueFun
    } = this.props;
    const docId = localStorage.getItem("lId");
    const {selectValue} = this.state;
    const params = {
      searchKey: "",
      hId:!docId ? (docId === "" ? "" : "421") : Number(docId),
      sourceType:type,
      webList:[],
      selectedField:selectValue,
      startDate:"",
      endDate:"",
      order:"desc",
      orderType:1,
      pageNum:1,
      pageSize:10
    };
    history.push("/literature");
    localStorage.setItem("literatureContact", type);
    fetchLiteratureSearchValueFun();
    fetchLiteratureResetButton(true);
    fetchLiteratureContentList(params);
    fetchLiteratureSearchQuery();
    fetchLiteratureDateQuery();
    fetchLiteratureSelectQuery();
    fetchLiteratureDate();
    fetchLiteratureSearchValue();
  };

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
    const { fetchLiteratureSearchValue } = this.props;
    fetchLiteratureSearchValue(e.target.value);
  };

  handleSelectChange = value => {
    this.searchTheme = value;
    this.setState({
      selectValue: value
    });
  };

  literatureSearch = () => {
    const { startTime,endTime,selectValue } = this.state;
    const {
      fetchLiteratureResetButton,
      literature:{
        literatureSearchValue
      }
    } = this.props;
    const {
      fetchLiteratureContentList,
      fetchLiteratureSearchQuery,
      fetchLiteratureSelectQuery,
      fetchLiteratureDateQuery,
      fetchLiteratureThemeSearchFlag,
      literature:{
        literatureWebsite
      }
    } = this.props;
    const docId = localStorage.getItem("lId");
    const literatureContact = localStorage.getItem("literatureContact");
    const params = {
      searchKey: literatureSearchValue,
      hId:!docId ? (docId === "" ? "" : 421) : Number(docId),
      sourceType:literatureContact,
      webList:literatureWebsite,
      selectedField:this.searchTheme ? this.searchTheme : selectValue ,
      startDate: startTime,
      endDate: endTime,
      order:"desc",
      orderType:literatureSearchValue === "" ? 1 :3,
      pageNum:1,
      pageSize:10
    };
    const date = [startTime, endTime];
    fetchLiteratureSearchQuery(literatureSearchValue);
    fetchLiteratureSelectQuery(this.searchTheme);
    fetchLiteratureDateQuery(date);
    fetchLiteratureResetButton(false);
    fetchLiteratureThemeSearchFlag(true);
    fetchLiteratureContentList(params);
  };

  render() {
    const { selectValue } = this.state;
    const { literature: { literatureDate, literatureSearchValue } } = this.props;
    const selectBefore = (
      <Select
        value={`${selectValue}`}
        style={{ width: 90 }}
        onChange={this.handleSelectChange}
      >
        <Option value="标题">标题</Option>
        <Option value="全文">全文</Option>
        <Option value="摘要">摘要</Option>
        <Option value="上传人">上传人</Option>
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
              value={literatureSearchValue}
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
