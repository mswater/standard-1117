import React from "react";
import { Menu, Spin } from "antd";
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

  handleClick = (e) => {
    const { history } = this.props;
    history.push("/hot");
    localStorage.setItem("hotContent", e.key);
  };

  idFormat  = (data) => {
    const arr = [];
    arr.push(data && data[0].id);
    /**
     * 旧有逻辑，因eslint报错而修改  20201130-mswater
     */
    // data && data.map((cur, index) => {
    //   if (index === 0) {
    //     arr.push(`${cur.id}`);
    //   }
    // });
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
      pageSize:5
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
        fetchHotListLoading,
      }
    } = this.props;
    const firstItem = hotListData && hotListData.map(cur => {
      return (
        <Menu.Item key={cur.id.toString()}>
          <a onClick={() => {return this.handleReading(cur.id);}}>{cur.keyName}</a>
        </Menu.Item>
      );
    });
    return (
      <div className="normal-main-with-bg">
        <div className="normal-main-con clear">
          {(hotListData && hotListData.length>0) ? (
            <div className="clear">
              <div className="left-menu fl">
                <h1>-&nbsp;热点监测&nbsp;-</h1>
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
                  [<HotContentCenter
                    key="HotContentCenter"
                    handlerIndex={this.handlerIndex}
                    clickIndex={clickIndex}
                    {...this.props}
                  />, <HotContentQuery
                    key="HotContentQuery"
                    handlerIndex={this.handlerIndex}
                    clickIndex={clickIndex}
                    {...this.props}
                  />, <HotContentCheck
                    key="HotContentCheck"
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

export default HotContent;
