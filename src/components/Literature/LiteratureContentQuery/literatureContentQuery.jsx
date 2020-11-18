import React from "react";
import { Input, Icon, Spin } from "antd";
import "./index.css";
import { fuzzyQuery, siblings } from "../../../lib/tools/utils";
import noData from "../../../images/nodata.png";

const { Search } = Input;

/* eslint-disable no-nested-ternary */
class LiteratureContentQuery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidUpdate () {
    const {
      literature:{
        literatureContentListData,
        fetchLiteratureContentListLoading,
      }
    } = this.props;
    const searchWeb = literatureContentListData.webList;
    const renderContactNumber = localStorage.getItem("literatureContact");
    if (!renderContactNumber || renderContactNumber === "4") return;
    if(!fetchLiteratureContentListLoading && searchWeb.length >0){
      const { classType, itemType } = this;
      const classArr = classType.children;
      const itemArr = itemType.children;
      this.addEvent();
      this.addItemEvent();
      for (let i = 0; i < classArr.length; i += 1) {
        if (i === 0) {
          classArr[i].style.backgroundColor = "#F6BD4E";
          classArr[i].children[1].style.color = "#0572B8";
          classArr[i].children[1].style.backgroundColor = "#ffffff";
        }
        if (i !== 0) {
          classArr[i].style.backgroundColor = "#D1D1D1";
          classArr[i].style.backgroundColor = "#D1D1D1";
          classArr[i].children[1].style.color = "#ffffff";
          classArr[i].children[1].style.backgroundColor = "transparent";
        }
      }
      if (itemArr.length > 2) {
        for (let i = 0; i < itemArr.length; i += 1) {
          if (i === 0) {
            itemArr[i].style.color = "#0572B8";
            itemArr[i].style.border = "1px solid #0572B8";
          }
          if (i !== 0) {
            itemArr[i].style.color = "#515256";
            itemArr[i].style.border = "1px solid #fff";
          }
        }
      } else{
        for (let i = 0; i < itemArr.length; i += 1) {
          if (i === 0) {
            itemArr[i].style.color = "#515256";
            itemArr[i].style.border = "1px solid #fff";
          }
          if (i !== 0) {
            itemArr[i].style.color = "#0572B8";
            itemArr[i].style.border = "1px solid #0572B8";
          }
        }
      }
    }
  }

  resetListFunc = () => {
    const {
      fetchLiteratureContentList,
      fetchLiteratureWebsite,
      literature:{
        literatureSearchQuery,
        literatureDateQuery,
        literatureSelectQuery
      }
    } = this.props;
    const docId = localStorage.getItem("lId");
    const literatureContact = localStorage.getItem("literatureContact");
    const orderType = localStorage.getItem("literatureOrderType");
    const orderFlag = localStorage.getItem("literatureOrderFlag");
    const params = {
      searchKey:literatureSearchQuery,
      hId: !docId ? (docId === "" ? "" : 421) : Number(docId),
      sourceType:Number(literatureContact),
      webList: [],
      selectedField:literatureSelectQuery,
      startDate:literatureDateQuery[0],
      endDate:literatureDateQuery[1],
      order:orderFlag!=="false" ? "desc" : "asc",
      orderType:!orderType ? 1 : Number(orderType),
      pageNum:1,
      pageSize:10
    };
    // 调用接口
    fetchLiteratureContentList(params);
    fetchLiteratureWebsite();
  };

  searchQuery = (value) => {
    const {
      fetchLiteratureResetFuzzyQuery,
      fetchLiteratureContentList,
      fetchLiteratureSearchValueFun,
      literature: {
        literatureContentListData,
        literatureSearchQuery,
        literatureDateQuery,
        literatureSelectQuery
      }
    } = this.props;
    const docId = localStorage.getItem("lId");
    const literatureContact = localStorage.getItem("literatureContact");
    const orderType = localStorage.getItem("literatureOrderType");
    const orderFlag = localStorage.getItem("literatureOrderFlag");
    const params = {
      searchKey:literatureSearchQuery,
      hId: !docId ? (docId === "" ? "" : 421) : Number(docId),
      sourceType:Number(literatureContact),
      webList: [],
      selectedField:literatureSelectQuery,
      startDate:literatureDateQuery[0],
      endDate:literatureDateQuery[1],
      order:orderFlag!=="false" ? "desc" : "asc",
      orderType:orderType ? 1 : Number(orderType),
      pageNum:1,
      pageSize:10
    };
    fetchLiteratureSearchValueFun(value);
    if (!value || value.length === 0 || value === "全部") {
      fetchLiteratureContentList(params);
    }
    const isWebList = literatureContentListData.literatureWebList;
    const fuzzyArr = fuzzyQuery(isWebList, value);
    const paramsWeb = {
      ...literatureContentListData,
      webList: fuzzyArr
    };
    fetchLiteratureResetFuzzyQuery(paramsWeb);
  };

  searchChange = (e) => {
    const {
      fetchLiteratureSearchValueFun,
    } = this.props;
    fetchLiteratureSearchValueFun(e.target.value);
  };

  // 直接点击，安徽等检索
  searchItem =(item) =>{
    const {
      fetchLiteratureContentList,
      fetchLiteratureWebsite,
      literature:{
        literatureSearchQuery,
        literatureDateQuery,
        literatureSelectQuery
      }
    } = this.props;
    const docId = localStorage.getItem("lId");
    const literatureContact = localStorage.getItem("literatureContact");
    const orderType = localStorage.getItem("literatureOrderType");
    const orderFlag = localStorage.getItem("literatureOrderFlag");
    const params = {
      searchKey:literatureSearchQuery,
      hId: !docId ? (docId === "" ? "" : 421) : Number(docId),
      sourceType:Number(literatureContact),
      webList: item,
      selectedField:literatureSelectQuery,
      startDate:literatureDateQuery[0],
      endDate:literatureDateQuery[1],
      order:orderFlag!=="false" ? "desc" : "asc",
      orderType:!orderType ? 1 : Number(orderType),
      pageNum:1,
      pageSize:10
    };
    fetchLiteratureWebsite(item);
    fetchLiteratureContentList(params);
  };

  sourceArr = () => {
    const renderContactNumber = localStorage.getItem("literatureContact");
    if (parseInt(renderContactNumber, 0) === 5) {
      return ["来源网站"];
    }
    return ["来源网站"];
  };

  checkType() {
    /* eslint-disable no-param-reassign */
    siblings(this).forEach((item, index, arr) => {
      arr[index].style.backgroundColor = "#D1D1D1";
      arr[index].children[1].style.color = "#ffffff";
      arr[index].children[1].style.backgroundColor = "transparent";
    });
    this.style.backgroundColor = "#F6BD4E";
    this.children[1].style.color = "#0572B8";
    this.children[1].style.backgroundColor = "#ffffff";
  }

  addEvent() {
    const { classType } = this;
    const arr = classType.children;
    const ways = [];
    for (let i = 0; i < arr.length; i += 1) {
      ways.push(arr[i]);
    }
    Array.prototype.forEach.call(ways, (item) => {
      item.addEventListener("click", this.checkType);
    });
  }

  checkItemType() {
    /* eslint-disable no-param-reassign */
    siblings(this).forEach((item, index, arr) => {
      arr[index].style.color = "#515256";
      arr[index].style.border = "1px solid #fff";
    });
    this.style.color = "#0572B8";
    this.style.border = "1px solid #0572B8";
  }

  // 切换搜索列表的
  addItemEvent() {
    const { itemType } = this;
    const arr = itemType.children;
    const ways = [];
    for (let i = 0; i < arr.length; i += 1) {
      ways.push(arr[i]);
    }
    Array.prototype.forEach.call(ways, (item) => {
      item.addEventListener("click", this.checkItemType);
    });
  }

  render() {
    const renderContactNumber = localStorage.getItem("literatureContact");
    const { literature: {
      literatureContentListData,
      fetchLiteratureContentListLoading,
      literatureSearchValueClear
    }} = this.props;
    const item = this.sourceArr() && this.sourceArr().map((cur, index) => {
      return (
        <button
          type="button"
          key={index.toString()}
        >
          <span>{cur}</span><Icon type="up" />
        </button>
      );
    });
    const searchWeb = literatureContentListData.webList
      && literatureContentListData.webList.map((cur, index) => {
        return (
          <div className="fl" key={index.toString()} onClick={() => this.searchItem(cur)}>
            {cur}
          </div>
        );
      });
    return (
      /* eslint-disable no-nested-ternary */
      <div className="literature-content-query">
        {(renderContactNumber === "5") && (
          <div className="literature-content-query-class clear">
            <div className="fl">分组浏览 ：</div>
            <div className="literature-content-query-box" ref={(ref) => {this.classType = ref;}}>
              {item}
            </div>
          </div>
        )}
        {(renderContactNumber === "5") && (
          <div className="literature-content-query-select">
            <div className="query-top clear">
              <Search
                value={literatureSearchValueClear}
                placeholder="请输入检索内容..."
                enterButton="检索"
                size="default"
                allowClear
                style={{width: "260px"}}
                onChange={this.searchChange}
                onSearch={this.searchQuery}
              />
              {fetchLiteratureContentListLoading ?
                <div className="content-list-loading"><Spin /></div>
                : (!searchWeb || (searchWeb && searchWeb.length === 0)?
                  <div className="no-data"><img src={noData} alt=""/></div> : (
                    <div
                      className="literature-query-center"
                      ref={(ref) => {
                        this.itemType = ref;
                      }}
                    >
                      <div className="fl" onClick={this.resetListFunc}>全部</div>
                      {searchWeb}
                    </div>
                  ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default LiteratureContentQuery;

