import React from "react";
import { Menu, Spin } from "antd";
import LiteratureContentCenter from "../LiteratureContentCenter/literatureContentCenter.jsx";
import LiteratureContentQuery from "../LiteratureContentQuery/literatureContentQuery.jsx";
import LiteratureContentCheck from  "../LiteratureContentCheck/literatureContentCheck.jsx";


import "./index.css";
/* eslint-disable no-nested-ternary */
const { SubMenu } = Menu;
class LiteratureContent extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  onOpenChange = (openKeys) => {
    const {
      literature: {
        literatureListData
      },
      history
    } = this.props;
    let openSelectKey = null;
    const menuArr = [];
    const literatureOpenKeyId = localStorage.getItem("literatureOpenKeyId");
    const currentOpenkey = literatureOpenKeyId ? `${literatureOpenKeyId}` :
      `${literatureListData[0].id}`;
    const latestOpenKey = openKeys.find(key =>{ return currentOpenkey.indexOf(key) === -1;});
    /* eslint-disable array-callback-return */
    /* eslint-disable no-unused-expressions */
    literatureListData && literatureListData.map(cur => {
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
      localStorage.setItem("literatureOpenKeyId", openKeys[0]);
      history.push("/literature");
    } else {
      localStorage.setItem("literatureOpenKeyId", latestOpenKey);
      history.push("/literature");
      localStorage.setItem("literatureContent", openSelectKey);
    }
  };

  handleId=(lId)=>{
    const {
      fetchLiteratureContentList,
      fetchLiteratureSearchValueFun,
      literature:{
        literatureSearchQuery,
        literatureDateQuery,
        literatureSelectQuery
      }
    } = this.props;
    const literatureContact = localStorage.getItem("literatureContact");
    const orderType = localStorage.getItem("literatureOrderType");
    const orderFlag = localStorage.getItem("literatureOrderFlag");
    const obj ={
      searchKey:literatureSearchQuery,
      hId: lId,
      sourceType:!literatureContact ? 4 :Number(literatureContact),
      webList:[],
      selectedField:literatureSelectQuery,
      startDate:literatureDateQuery[0],
      endDate:literatureDateQuery[1],
      order:(orderFlag!=="false") ? "desc":"asc",
      orderType:!orderType ? 1 : Number(orderType),
      pageNum:1,
      pageSize:10
    };
    fetchLiteratureSearchValueFun();
    localStorage.setItem("lId", lId);
    fetchLiteratureContentList(obj);
  };

  handleParentId=(lId)=>{
    const {
      fetchLiteratureContentList,
      fetchLiteratureSearchValueFun,
      literature:{
        literatureSearchQuery,
        literatureDateQuery,
        literatureSelectQuery
      },
      history
    } = this.props;
    const literatureContact = localStorage.getItem("literatureContact");
    const orderType = localStorage.getItem("literatureOrderType");
    const orderFlag = localStorage.getItem("literatureOrderFlag");
    const obj ={
      searchKey:literatureSearchQuery,
      hId: lId,
      sourceType:!literatureContact ? 4 :Number(literatureContact),
      webList:[],
      selectedField:literatureSelectQuery,
      startDate:literatureDateQuery[0],
      endDate:literatureDateQuery[1],
      order:(orderFlag!=="false") ? "desc":"asc",
      orderType:!orderType ? 1 : Number(orderType),
      pageNum:1,
      pageSize:10
    };
    localStorage.setItem("lId", lId);
    localStorage.setItem("literatureOpenKeyId", lId);
    history.push("/literature");
    fetchLiteratureSearchValueFun();
    fetchLiteratureContentList(obj);
  };


  handleClick = (e) => {
    const { props } = this;
    props.history.push("/literature");
    localStorage.setItem("literatureContent", e.key);
  };

  handleMenu=(childrenKeyWords)=>{
    const parentId = childrenKeyWords && childrenKeyWords[0] && childrenKeyWords[0].id;
    const {
      fetchLiteratureContentList,
      fetchLiteratureSearchValueFun,
      literature:{
        literatureSearchQuery,
        literatureDateQuery,
        literatureSelectQuery
      }
    } = this.props;
    const literatureContact = localStorage.getItem("literatureContact");
    const orderType = localStorage.getItem("literatureOrderType");
    const orderFlag = localStorage.getItem("literatureOrderFlag");
    const obj ={
      searchKey:literatureSearchQuery,
      hId: parentId,
      sourceType:!literatureContact ? 4 :Number(literatureContact),
      webList:[],
      selectedField:literatureSelectQuery,
      startDate:literatureDateQuery[0],
      endDate:literatureDateQuery[1],
      order:(orderFlag!=="false") ? "desc":"asc",
      orderType:!orderType ? 1 : Number(orderType),
      pageNum:1,
      pageSize:10
    };
    fetchLiteratureSearchValueFun();
    fetchLiteratureContentList(obj);
  };


  render() {
    const literatureContent = localStorage.getItem("literatureContent");
    const literatureOpenKeyId = localStorage.getItem("literatureOpenKeyId");
    const {
      literature:{
        literatureListData,
        fetchLiteratureListLoading
      }
    } = this.props;
    const firstItem = literatureListData && literatureListData.map(cur => {
      if(cur.childrenKeyWords.length === 0) {
        return(
          <Menu.Item
            key={cur.id.toString()}
            title={cur.keyName}
            onClick={() => {return this.handleParentId(cur.id);}}
          >
            {cur.keyName}
          </Menu.Item>
        );
      }
      return (
        <SubMenu
          onTitleClick={() => {return this.handleMenu(cur.childrenKeyWords);}}
          key={cur.id}
          title={<span>{cur.keyName}</span>}
        >
          {cur.childrenKeyWords.map((child)=>{
            return(
              <Menu.Item
                key={child.id.toString()}
                onClick={() => {return this.handleId(child.id);}}
                title={child.keyName}
              >
                -{child.keyName}
              </Menu.Item>
            );
          })}
        </SubMenu>
      );
    });
    return (
      <div className="literature-content clear">
        <div className="literature-content-slider fl">
          <div className="literature-content-topic">
            <span>DOCUMENTATION CENTER</span>
            <h2>- 文献中心 -</h2>
          </div>
          {fetchLiteratureListLoading ? <div className="spin"><Spin/></div> :
            <div className="topic-menu">
              <Menu
                mode="inline"
                selectedKeys={
                  literatureContent ?
                    [`${literatureContent}`] :
                    (literatureContent === "" ? "" : ["421"])
                }
                onOpenChange={this.onOpenChange}
                onClick={this.handleClick}
                openKeys={literatureOpenKeyId  ? [`${literatureOpenKeyId}`] : [] }
                style={{ width: 256 }}
              >
                <Menu.Item
                  key=""
                  onClick={() => {return this.handleParentId("");}}
                >
                  全部
                </Menu.Item>
                {firstItem}
              </Menu>
            </div>
          }
        </div>
        <div className="literature-content-main fl">
          <LiteratureContentCenter {...this.props}/>
          <LiteratureContentQuery {...this.props}/>
          <LiteratureContentCheck {...this.props}/>
        </div>
      </div>
    );
  }
}

export default LiteratureContent;

