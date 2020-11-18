import React from "react";
import { Menu, Spin } from "antd";
import TopicContentTop from "../TopicContentTop/topicContentTop.jsx";
import TopicContentCenter from "../TopicContentCenter/topicContentCenter.jsx";
import TopicContentQuery from "../TopicContentQuery/topicContentQuery.jsx";
import TopicContentCheck from  "../TopicContentCheck/topicContentCheck.jsx";
import TopicChartTop from "../TopicChartTop/topicChartTop.jsx";
import TopicChartBottom from "../TopicChartBottom/topicChartBottom.jsx";

import "./index.css";

const {SubMenu} = Menu;

class TopicContent extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      clickIndex: 0,
    };
  }

  handlerIndex = (index) => {
    this.setState({
      clickIndex: index,
    });
  };

  onOpenChange = (openKeys) => {
    const {
      subject: {
        subjectListData
      },
      history
    } = this.props;
    let openSelectKey = null;
    const menuArr = [];
    const topicOpenKeyId = localStorage.getItem("topicOpenKeyId");
    const currentOpenkey = topicOpenKeyId ? [`${topicOpenKeyId}`] : [`${subjectListData[0].id}`];
    const latestOpenKey = openKeys.find(key =>{ return currentOpenkey.indexOf(key) === -1;});
    /* eslint-disable array-callback-return */
    /* eslint-disable no-unused-expressions */
    subjectListData && subjectListData.map(cur => {
      menuArr.push(`${cur.id}`);
      if(cur.id === Number(latestOpenKey)) {
        if(!cur.childrenKeyWords || cur.childrenKeyWords.length === 0){
          openSelectKey = Number(openKeys);
        }
        if (cur.childrenKeyWords.length !== 0) {
          openSelectKey = cur.childrenKeyWords[0].id;
        }
      }
    });
    if (menuArr.indexOf(latestOpenKey) === -1) {
      localStorage.setItem("topicOpenKeyId", openKeys[0]);
      history.push("/topic");
    } else {
      localStorage.setItem("topicOpenKeyId", latestOpenKey);
      history.push("/topic");
      localStorage.setItem("topicContent", openSelectKey);
    }
  };


  handleId=(id)=>{
    const {
      fetchSubjectContentList,
      fetchSubjectDataTrendMap,
      fetchSubSourcesStatisticsMap,
      fetchSubjectSearchValue,
      subject:{
        subjectThemeSearch,
        subjectProListFlag
      }
    } = this.props;
    const deadLine = localStorage.getItem("deadLine");
    const topicClassType = localStorage.getItem("topicClassType");
    const topicContact = localStorage.getItem("topicContact");
    const orderType = localStorage.getItem("topicOrderType");
    const orderFlag = localStorage.getItem("topicOrderFlag");
    const params = {
      kid: id,
      deadline: !deadLine ? 1 : Number(deadLine)
    };
    const obj ={
      searchKey:subjectThemeSearch,
      hId:id,
      sourceType:!topicContact ? 1 :Number(topicContact),
      webList:[],
      proList:subjectProListFlag ? ["全部"] : [],
      order:(orderFlag!=="false") ? "desc":"asc",
      orderType:!orderType ? 1 : Number(orderType),
      pageNum:1,
      pageSize:10
    };
    localStorage.setItem("id", id);
    fetchSubjectSearchValue();
    fetchSubjectContentList(obj);
    if(topicClassType === "2") {
      fetchSubjectDataTrendMap(params);
      fetchSubSourcesStatisticsMap(params);
    }
  };

  handleClick = (e) => {
    const { history} = this.props;
    history.push("/topic");
    localStorage.setItem("topicContent", e.key);
  };

  handleMenu=(childrenKeyWords)=>{
    const parentId = childrenKeyWords && childrenKeyWords[0] && childrenKeyWords[0].id;
    const {
      fetchSubjectContentList,
      fetchSubjectDataTrendMap,
      fetchSubSourcesStatisticsMap,
      fetchSubjectSearchValue,
      subject:{
        subjectThemeSearch,
        subjectProListFlag
      }
    } = this.props;
    const deadLine = localStorage.getItem("deadLine");
    const topicClassType = localStorage.getItem("topicClassType");
    const topicContact = localStorage.getItem("topicContact");
    const orderType = localStorage.getItem("topicOrderType");
    const orderFlag = localStorage.getItem("topicOrderFlag");
    const params = {
      kid: parentId,
      deadline: !deadLine ? 1 : Number(deadLine)
    };
    const obj ={
      searchKey:subjectThemeSearch,
      hId:parentId,
      sourceType:!topicContact ? 1 :Number(topicContact),
      webList:[],
      proList:subjectProListFlag ? ["全部"] : [],
      order:(orderFlag!=="false") ? "desc":"asc",
      orderType:!orderType ? 1 : Number(orderType),
      pageNum:1,
      pageSize:10
    };
    localStorage.setItem("id", parentId);
    fetchSubjectSearchValue();
    fetchSubjectContentList(obj);

    if(topicClassType === "2") {
      fetchSubjectDataTrendMap(params);
      fetchSubSourcesStatisticsMap(params);
    }
  };

  idFormat  = (data) => {
    const arr = [];
    /* eslint-disable array-callback-return */
    /* eslint-disable no-unused-expressions */
    data[0].childrenKeyWords && data[0].childrenKeyWords.map((cur, index) => {
      if (index === 0) {
        arr.push(`${cur.id}`);
      }
    });
    return arr;
  };

  render() {
    const topicContent = localStorage.getItem("topicContent");
    const topicClassType = localStorage.getItem("topicClassType");
    const topicOpenKeyId = localStorage.getItem("topicOpenKeyId");
    const { clickIndex } = this.state;
    const token = localStorage.getItem("token");
    const {
      subject:{
        subjectListData,
        fetchSubjectListLoading,
      }
    } = this.props;
    const firstItem = subjectListData && subjectListData.map((cur,index, arr) => {
      if(cur.childrenKeyWords.length === 0) {
        return(
          <Menu
            mode="inline"
            openKeys={topicOpenKeyId ? [`${topicOpenKeyId}`] : [`${arr[0].id}`]}
            onClick={this.handleClick}
            selectedKeys={topicContent ? [`${topicContent}`]
              : this.idFormat(arr)}
            onOpenChange={this.onOpenChange}
            style={{ width: 256 }}
            key={index.toString().concat("9")}
          >
            <Menu.Item
              key={cur.id.toString()}
              title={cur.keyName}
              onClick={() => {return this.handleId(cur.id);}}
            >
              {cur.keyName}
            </Menu.Item>
          </Menu>
        );
      }
      return (
        <Menu
          mode="inline"
          openKeys={topicOpenKeyId ? [`${topicOpenKeyId}`] : [`${arr[0].id}`]}
          onClick={this.handleClick}
          selectedKeys={topicContent ? [`${topicContent}`]
            : this.idFormat(arr)}
          onOpenChange={this.onOpenChange}
          style={{ width: 256 }}
          key={index.toString()}
        >
          <SubMenu
            onTitleClick={() => {return this.handleMenu(cur.childrenKeyWords);}}
            key={cur.id.toString()}
            title={<span>{cur.keyName}</span>}
          >
            {cur.childrenKeyWords.map((child)=>{
              return(
                <Menu.Item
                  key={child.id.toString()}
                  title={child.keyName}
                  onClick={() => {return this.handleId(child.id);}}
                >
                  -{child.keyName}
                </Menu.Item>
              );
            })}
          </SubMenu>
        </Menu>
      );
    });
    return (
      <div className="topic-content">
        {
          (subjectListData && subjectListData.length>0)
            ?
            (
              <div className="clear">
                <div className="topic-content-slider fl">
                  <div className="topic-content-topic">
                    <span>THEMATIC MONITORING</span>
                    <h2>-专题监测-</h2>
                  </div>
                  {fetchSubjectListLoading ? <div className="spin"><Spin/></div> :
                    <div className="topic-menu">
                      {firstItem}
                    </div>
                  }
                </div>
                <div className="topic-content-main fl">
                  <TopicContentTop {...this.props}/>
                  {(!topicClassType || parseInt(topicClassType, 0) === 1) ?
                    [<TopicContentCenter
                      key="TopicContentCenter"
                      handlerIndex={this.handlerIndex}
                      clickIndex={clickIndex}
                      {...this.props}
                    />,
                    <TopicContentQuery
                      key="TopicContentQuery"
                      handlerIndex={this.handlerIndex}
                      clickIndex={clickIndex}
                      {...this.props}
                    />,
                    <TopicContentCheck key="TopicContentCheck" {...this.props}/>]
                    : [<TopicChartTop key="TopicChartTop" {...this.props}/>,
                      <TopicChartBottom key="TopicChartBottom" {...this.props}/>,]}
                </div>
              </div>
            )
            :
            (
              <div className="topic-content-none">
              暂无监测信息，点击
                <a
                  href={`/managecenter/keywords/list?uid=${token}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  分类管理
                </a>
              创建我的专题
              </div>
            )
        }
      </div>
    );
  }
}

export default TopicContent;
