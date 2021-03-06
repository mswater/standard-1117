import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Input, Pagination, Spin } from "antd";
import "./index.css";
import Header from "../../components/Common/Header/header.jsx";
import Nav from "../../components/Common/Nav/nav.jsx";
import Footer from "../../components/Common/Footer/footer.jsx";
import {fetchReportList, setSearchReportValue} from "../../store/action/ReportAction.js";

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
      setSearchReportValue,
    } = this.props;
    setSearchReportValue(value);
    fetchReportList(params);
  };

  downloadReport = (downloadUrl) => {
    const url = window.location.origin;
    window.open(`${url}/managecenter/brief/download?fileName=${downloadUrl}.pdf`,"_blank");
  }

  previewReport = (previewUrl) => {
    const url = window.location.origin;
    window.open(`${url}/managecenter/upload/${previewUrl}.pdf`,"_blank");
  }

  paginationFunc = (page) => {
    const {
      fetchReportList,
      report:{
        searchReportValue,
      }
    } = this.props;
    console.log(searchReportValue, page);
    const params = {
      searchCont: searchReportValue,
      pageNum: page,
      pageSize: 10
    };
    fetchReportList(params);
  }

  goNewReport(){
    const url = window.location.origin;
    const token = localStorage.getItem("token");
    window.open(`${url}/managecenter/brief/add?uid=${token}`,"_blank");
  }

  render(){
    const roleName = localStorage.getItem("roleName");
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
          <span
            className="w30"
            dangerouslySetInnerHTML={{ __html: item.title }}
            style={{cursor:"pointer"}}
            onClick={() => this.previewReport(item.title)}
          />
          <span className="w30">{item.creattime}</span>
          <span className="w10" dangerouslySetInnerHTML={{ __html: item.typeName }} />
          <span className="w10" dangerouslySetInnerHTML={{ __html: item.createUser }} />
          <span
            className="download w10"
            onClick={() => this.downloadReport(item.title)}
          />
        </li>
      );
    });
    return (
      <div>
        <Header />
        <Nav {...this.props}/>
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
            {roleName === "简报管理员" ? (
              <a
                className="new-report fr"
                rel="noopener noreferrer"
                onClick={() => {return this.goNewReport();}}
              >
                新建简报
              </a>
            ) : ""
            }
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
              className={`pagination ${rowCount > 50 ? "hide-last-page-num" : ""}`}
              pageSize={10}
              current={pageNow}
              showTotal={total => `共 ${Math.ceil(total / 10)} 页`}
            />
          </div>
        </div>
        <Footer {...this.props}/>
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
    setSearchReportValue,
  },
)(withRouter(Report));

