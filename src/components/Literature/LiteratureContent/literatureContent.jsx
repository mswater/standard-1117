import React from "react";
import { Menu, Spin } from "antd";
import LiteratureContentCenter from "../LiteratureContentCenter/literatureContentCenter.jsx";
import LiteratureContentCheck from  "../LiteratureContentCheck/literatureContentCheck.jsx";


import "./index.css";
/* eslint-disable no-nested-ternary */
class LiteratureContent extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handleId=(sId)=>{
    const {
      fetchLiteratureContentList,
      fetchLiteratureSearchValueFun,
      literature:{
        literatureSearchQuery,
        literatureDateQuery,
        literatureSelectQuery
      }
    } = this.props;
    const orderType = localStorage.getItem("sharingOrderType");
    const orderFlag = localStorage.getItem("sharingOrderFlag");
    const obj ={
      searchWord:literatureSearchQuery,
      sid: sId,
      searchType:literatureSelectQuery,
      starTime:literatureDateQuery[0],
      endTime:literatureDateQuery[1],
      timeOrder:(orderFlag==="false") ? "desc":"asc",
      orderType:!orderType ? 1 : Number(orderType),
      pageNum:1,
      pageSize:10
    };
    fetchLiteratureSearchValueFun();
    localStorage.setItem("sId", sId);
    fetchLiteratureContentList(obj);
  };

  handleClick = (e) => {
    const { props } = this;
    props.history.push("/literature");
    localStorage.setItem("sharingMaterialType", e.key);
  };

  render() {
    const {
      literature:{
        literatureListData,
        fetchLiteratureListLoading
      }
    } = this.props;
    const sharingMaterialType = localStorage.getItem("sharingMaterialType");
    const firstItem = literatureListData && literatureListData.map((cur) => {
      return(
        <Menu.Item
          key={cur.id.toString()}
          title={cur.name}
        >
          <a onClick={() => {return this.handleId(cur.id);}}>{cur.name}</a>
        </Menu.Item>
      );
    });
    return (
      <div className="normal-main-con clear">
        <div className="left-menu fl">
          <h1>-&nbsp;资料共享&nbsp;-</h1>
          {fetchLiteratureListLoading ?  <div className="spin"><Spin /></div> :
            <Menu
              onClick={this.handleClick}
              className="menu"
              mode="inline"
              defaultSelectedKeys={sharingMaterialType ? [`${sharingMaterialType}`] : ["0"]}
            >
              <Menu.Item key="0" title="全部">
                <a onClick={() => {return this.handleId("");}}>全部</a>
              </Menu.Item>
              {firstItem}
            </Menu>
          }
        </div>
        <div className="literature-content-main fl">
          <LiteratureContentCenter {...this.props}/>
          <LiteratureContentCheck {...this.props}/>
        </div>
      </div>
    );
  }
}

export default LiteratureContent;

