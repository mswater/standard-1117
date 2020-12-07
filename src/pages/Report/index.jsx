import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Input, Pagination, Spin } from "antd";
import "./index.css";
import Header from "../../components/Common/Header/header.jsx";
import Nav from "../../components/Common/Nav/nav.jsx";
import Footer from "../../components/Common/Footer/footer.jsx";
import {fetchReportList} from "../../store/action/ReportAction.js";

const { Search } = Input;


function itemRender(current, type, originalElement){
  if (type === "prev") {
    return <a>&lt;上一页</a>;
  } if (type === "next") {
    return <a>下一页&gt;</a>;
  }
  return originalElement;
}

class Report extends React.Component{

  constructor(props){
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const {
      fetchReportList,
    } = this.props;
    // 获取学科快讯数据
    fetchReportList();
  }


  searchContent = (value) => {
    // 搜索学科快讯数据
    const params = {
      "searchCont" : value,
    };
    const {
      fetchReportList,
    } = this.props;
    fetchReportList(params);
  };

  downloadReport = (downloadUrl) => {
    window.open(downloadUrl,"_blank");
  }


  render(){
    const {
      report: {
        reportData:{
          page:{
            resultList,
            pageNow,
            rowCount,
          },
        },
        fetchReportListLoading,
      }
    } = this.props;

    const reportItems = resultList && resultList.map((item,index) => {
      return (
        <li key={item.id} className="clear">
          <span className="w10">{index+1}</span>
          <span className="w30">{item.title}</span>
          <span className="w30">{item.creattime}</span>
          <span className="w10">{item.typeName}</span>
          <span className="w10">{item.createUser}</span>
          <span
            className="download w10"
            onClick={() => this.downloadReport(item.url)}
          />
        </li>
      );
    });
    return (
      <div>
        <Header />
        <Nav />
        <div className="report-con">
          <div className="report-top clear">
            <div className="report-search fl">
              <Search
                placeholder="请输入检索词..."
                allowClear
                enterButton="检索"
                onSearch={this.searchContent}
              />
            </div>
            <a
              className="new-report fr"
              rel="noopener noreferrer"
            >
              新建简报
            </a>
          </div>
          <div className="report-list">
            <div className="report-list-header">
              <span className="w10">序号</span>
              <span className="w30">名称</span>
              <span className="w30">发表时间</span>
              <span className="w10">类型</span>
              <span className="w10">报告人</span>
              <span className="w10">导出</span>
            </div>
            <ul>
              {
                fetchReportListLoading ? <div className="spin"><Spin/></div> :
                  reportItems
              }
            </ul>
          </div>
          <div className="hot-content-check-pagination">
            <Pagination
              total={rowCount}
              onChange={this.paginationFunc}
              itemRender={itemRender}
              className="pagination"
              pageSize={10}
              current={pageNow}
            />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    ...state
  };
};

export default connect(
  mapStateToProps,
  {
    fetchReportList,
  },
)(withRouter(Report));

