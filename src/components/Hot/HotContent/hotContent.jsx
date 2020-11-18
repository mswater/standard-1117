import React from "react";
import { Menu, Spin } from "antd";
/* eslint-disable */
import book from "../../../images/book.png";
import HotContentTop from "../HotContentTop/hotContentTop.jsx";
import HotContentCenter from "../HotContentCenter/hotContentCenter.jsx";
import HotContentQuery from "../HotContentQuery/hotContentQuery.jsx";
import HotContentCheck from  "../HotContentCheck/hotContentCheck.jsx";
import HotChartTop from  "../HotChartTop/hotChartTop.jsx";
import HotChartMiddle from  "../HotChartMiddle/hotChartMiddle.jsx";
import HotChartPieLeft from "../HotChartPieLeft/hotChartPieLeft.jsx";
import HotChartPieRight from "../HotChartPieRight/hotChartPieRight.jsx";

import "./index.css";

class HotContent extends React.Component{

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

  componentDidMount() {
  }

  handleClick = (e) => {
    const { history } = this.props;
    history.push("/hot");
    localStorage.setItem("hotContent", e.key);
  };

  idFormat  = (data) => {
    const arr = [];
    // /* eslint-disable array-callback-return */
    // /* eslint-disable no-unused-expressions */
    data && data.map((cur, index) => {
      if (index === 0) {
        arr.push(`${cur.id}`);
      }
    });
    return arr;
  };


  // menu处理
  handleReading=(id)=>{
    const {
      fetchSugReading ,
      fetchHotContentList,
      fetchSiteActivityMap,
      fetchDataTrendMap,
      fetchSourcesStatisticsMap,
      fetchSiteMap,
      fetchHotSearchValue,
      hot:{
        hotThemeSearch,
        hotProListFlag,
      }
    } = this.props;
    const deadLine = localStorage.getItem("deadLine");
    const hotClassType = localStorage.getItem("hotClassType");
    const hotContact = localStorage.getItem("hotContact");
    const orderType = localStorage.getItem("orderType");
    const orderFlag = localStorage.getItem("orderFlag");
    const params = {
      kid: id,
      deadline: !deadLine ? 1 : Number(deadLine)
    };
    const obj ={
      searchKey:hotThemeSearch,
      hId:id,
      sourceType:!hotContact? 1 :Number(hotContact),
      webList:[],
      proList:hotProListFlag ? ["全部"] : [],
      order:(orderFlag!=="false") ? "desc":"asc",
      orderType:!orderType ? 1 :Number(orderType),
      pageNum:1,
      pageSize:10
    };
    localStorage.setItem("readingId", id);
    fetchHotSearchValue();
    fetchSugReading(id);
    fetchHotContentList(obj);
    if(hotClassType === "2"){
      fetchSiteActivityMap(params);
      fetchDataTrendMap(params);
      // 热点监测-来源统计图
      fetchSourcesStatisticsMap(params);
      // 热点监测-地域热力图
      fetchSiteMap(params);
    }
  };


  render() {
    const hotContent = localStorage.getItem("hotContent");
    const hotClassType = localStorage.getItem("hotClassType");
    const { clickIndex } = this.state;
    const token = localStorage.getItem("token");
    const {
      hot:{
        hotListData,
        sugReadingData:{
          readingList
        },
        fetchHotListLoading,
      }
    } = this.props;
    const firstItem = hotListData && hotListData.map(cur => {
      return (
        <Menu.Item
          key={cur.id.toString()}
          onClick={() => {return this.handleReading(cur.id);}}
        >
          {cur.keyName}
        </Menu.Item>
      );
    });
    return (
      <div className="hot-content clear">
        {
          (hotListData && hotListData.length>0)
          ?
            (<div className="clear">
            <div className="hot-content-slider fl">
              <div className="hot-content-topic">
                <span>HOTPOTS MONITORING</span>
                <h2>-热点监测-</h2>
              </div>
              {fetchHotListLoading ?  <div className="spin"><Spin /></div> :
                <Menu
                  onClick={this.handleClick}
                  className="menu"
                  defaultSelectedKeys={hotContent ? [`${hotContent}`] : [`${hotListData[0].id}`]}
                  mode="inline"
                >
                  {firstItem}
                </Menu>
              }
            </div>
            <div className="hot-content-main fl">
              <HotContentTop {...this.props}/>
              {(!hotClassType || parseInt(hotClassType, 0) === 1) ?
                [
                  <HotContentCenter
                    key="HotContentCenter"
                    handlerIndex={this.handlerIndex}
                    clickIndex={clickIndex}
                    {...this.props}
                  />,
                  <HotContentQuery
                    key="HotContentQuery"
                    handlerIndex={this.handlerIndex}
                    clickIndex={clickIndex}
                    {...this.props}
                  />,
                  <HotContentCheck key="HotContentCheck" {...this.props}/>]
                : [<HotChartTop key="HotChartTop" {...this.props}/>,
                  <HotChartMiddle key="HotChartMiddle" {...this.props}/>,
                  <div key="HotChartBottom" className="clear">
                    <HotChartPieLeft key="HotChartPieLeft" {...this.props}/>
                    <HotChartPieRight key="HotChartPieRight" {...this.props}/>
                  </div>]}
            </div>
          </div>)
            : (<div className="hot-content-none">
              暂无监测信息，点击
              <a
                href={`/managecenter/keywords/list?uid=${token}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                分类管理
              </a>
              创建我的热点
            </div>)
        }
      </div>
    );
  }
}

export default HotContent;
