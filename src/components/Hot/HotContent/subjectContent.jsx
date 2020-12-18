import React from "react";
import { Menu, Spin } from "antd";
import SubjectContentTop from "../HotContentTop/subjectContentTop.jsx";
import SubjectContentCenter from "../HotContentCenter/subjectContentCenter.jsx";
import SubjectContentQuery from "../HotContentQuery/subjectContentQuery.jsx";
import SubjectContentCheck from  "../HotContentCheck/subjectContentCheck.jsx";
import HotChartTop from  "../HotChartTop/hotChartTop.jsx";
import HotChartMiddle from  "../HotChartMiddle/hotChartMiddle.jsx";
import HotChartPieLeft from "../HotChartPieLeft/hotChartPieLeft.jsx";
import HotChartPieRight from "../HotChartPieRight/hotChartPieRight.jsx";
import "./index.css";

class SubjectContent extends React.Component{

  constructor(props) {
    super(props);
    this.state={
      clickIndex: 0,
    };
  }

  handlerIndex = (index) => {
    this.setState({
      clickIndex: index,
    });
  };

  handleClick = (e) => {
    const { history } = this.props;
    history.push("/subject");
    localStorage.setItem("subjectContent", e.key);
  };

  // menu处理
  handleReading=(id)=>{
    const {
      fetchSubjectContentList,
      fetchSubjectSiteActivityMap,
      fetchSubjectDataTrendMap,
      fetchSubjectSourcesStatisticsMap,
      fetchSubjectSiteMap,
      fetchSubjectSearchValue,
      changeSubjectBg,
      hot:{
        subjectThemeSearch,
        subjectProListFlag,
        subjectLanguageTypeFlag,
        subjectStartDate,
        subjectEndDate,
      }
    } = this.props;
    const deadLine = localStorage.getItem("subjectDeadLine");
    const subjectClassType = localStorage.getItem("subjectClassType");
    const subjectContact = localStorage.getItem("subjectContact");
    const orderType = localStorage.getItem("subjectOrderType");
    const orderFlag = localStorage.getItem("subjectOrderFlag");
    const params = {
      kid: id,
      deadline: !deadLine ? 1 : Number(deadLine)
    };
    const obj ={
      searchKey:subjectThemeSearch,
      hId:id,
      sourceType:!subjectContact? 1 :Number(subjectContact),
      webList:(!subjectProListFlag && !subjectLanguageTypeFlag) ? ["全部"] : null,
      proList:subjectProListFlag ? ["全部"] : null,
      languageList:subjectLanguageTypeFlag ? ["全部"] : null,
      order:(orderFlag!=="false") ? "desc":"asc",
      orderType:!orderType ? 1 :Number(orderType),
      startDate:subjectStartDate,
      endDate:subjectEndDate,
      pageNum:1,
      pageSize:5
    };
    localStorage.setItem("subjectReadingId", id);
    fetchSubjectSearchValue();
    fetchSubjectContentList(obj);
    // 切换背景图
    changeSubjectBg(id);
    if(subjectClassType === "2"){
      fetchSubjectSiteActivityMap(params);
      fetchSubjectDataTrendMap(params);
      // 学科专题-来源统计图
      fetchSubjectSourcesStatisticsMap(params);
      // 学科专题-地域热力图
      fetchSubjectSiteMap(params);
    }
  };


  render() {
    const subjectContent = localStorage.getItem("subjectContent");
    const subjectClassType = localStorage.getItem("subjectClassType");
    const { clickIndex } = this.state;
    const token = localStorage.getItem("token");
    const {
      hot:{
        subjectListData,
        fetchSubjectListLoading,
        subjectBigBg,
      },
    } = this.props;
    const firstItem = subjectListData && subjectListData.map(cur => {
      return (
        <Menu.Item key={cur.id.toString()}>
          <a onClick={() => {return this.handleReading(cur.id);}}>{cur.keyName}</a>
        </Menu.Item>
      );
    });
    return (
      <div className={`normal-main-with-bg ${subjectBigBg}`}>
        <div className="normal-main-con clear">
          {(subjectListData && subjectListData.length>0) ? (
            <div className="clear">
              <div className="left-menu fl">
                <h1>-&nbsp;学科专题&nbsp;-</h1>
                {fetchSubjectListLoading ?  <div className="spin"><Spin /></div> :
                  <Menu
                    onClick={this.handleClick}
                    className="menu"
                    defaultSelectedKeys={subjectContent ?
                      [`${subjectContent}`] : [`${subjectListData[0].id}`]}
                    mode="inline"
                  >
                    {firstItem}
                  </Menu>
                }
              </div>
              <div className="hot-content-main fl">
                <SubjectContentTop {...this.props}/>
                {(!subjectClassType || parseInt(subjectClassType, 0) === 1) ?
                  [<SubjectContentCenter
                    key="SubjectContentCenter"
                    handlerIndex={this.handlerIndex}
                    clickIndex={clickIndex}
                    {...this.props}
                  />, <SubjectContentQuery
                    key="SubjectContentQuery"
                    handlerIndex={this.handlerIndex}
                    clickIndex={clickIndex}
                    {...this.props}
                  />, <SubjectContentCheck
                    key="SubjectContentCheck"
                    {...this.props}
                  />
                  ] : [<HotChartTop key="HotChartTop" {...this.props}/>,
                    <HotChartMiddle key="HotChartMiddle" {...this.props}/>,
                    <div key="HotChartBottom" className="clear">
                      <HotChartPieLeft key="HotChartPieLeft" {...this.props}/>
                      <HotChartPieRight key="HotChartPieRight" {...this.props}/>
                    </div>
                  ]}
              </div>
            </div>
          ) : (
            <div className="hot-content-none">
              暂无监测信息，点击
              <a
                href={`/managecenter/keywords/list?uid=${token}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                分类管理
              </a>
              创建我的热点
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default SubjectContent;
