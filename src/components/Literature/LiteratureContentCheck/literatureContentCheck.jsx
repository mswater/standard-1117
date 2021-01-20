import React from "react";
import { Icon, Pagination, Spin } from "antd";
import "./index.css";
import { siblings } from "../../../lib/tools/utils";
import empty from "../../../images/empty.png";

function itemRender(current, type, originalElement){
  if (type === "prev") {
    return <a>&lt;上一页</a>;
  } if (type === "next") {
    return <a>下一页&gt;</a>;
  }
  return originalElement;
}
const sortArr = [{
  value: "发布时间",
  flag: false,
  id: 1
}, {
  value: "浏览量",
  flag: false,
  id: 2
}];
/* eslint-disable no-nested-ternary */
class LiteratureContentCheck extends React.Component {
  constructor(props) {
    super(props);
    this.sort_index = 0;
    this.state = {
    };
  }

  componentDidMount() {
    this.addEvent();
  }


  componentDidUpdate() {
    const {
      literature: {
        literatureSearchQuery,
        literatureThemeSearchFlag,
        literatureResetButtonFlag
      },
    } = this.props;
    if (literatureResetButtonFlag) {
      this.addEvent();
      /* eslint-disable no-nested-ternary */
      const { classSort } = this;
      const arr = classSort.children;
      for (let i = 0; i < arr.length; i += 1) {
        // 全部置灰
        arr[i].style.color = "#515256";
        arr[i].children[1].style.color = "#fff";
      }
      for (let i = 0; i < sortArr.length; i += 1) {
        sortArr[i].flag = false;
      }
      // 默认选中第一个
      arr[0].style.color = "#0572B8";
      arr[0].children[1].style.color = "#0572B8";
    }
    if(!literatureResetButtonFlag) {
      if (literatureThemeSearchFlag) {
        if(literatureSearchQuery) {
          const { classSort } = this;
          const arr = classSort.children;
          for (let i = 0; i < arr.length; i += 1) {
            arr[i].style.color = "#515256";
            arr[i].children[1].style.color = "#fff";
          }
          arr[arr.length - 1].style.color = "#0572B8";
          arr[arr.length - 1].children[1].style.color = "#0572B8";
        }
        if (!literatureSearchQuery) {
          const { classSort } = this;
          const arr = classSort.children;
          for (let i = 0; i < arr.length; i += 1) {
            arr[i].style.color = "#515256";
            arr[i].children[1].style.color = "#fff";
          }
          arr[0].style.color = "#0572B8";
          arr[0].children[1].style.color = "#0572B8";
        }
      }
      this.addEvent();
    }
  }

  componentWillUnmount(){
    for(let i = 0; i < sortArr.length;){
      sortArr[i].flag = false;
      i += 1;
    }
  }

  toDetails = (detailId) =>{
    const url = window.location.origin;
    window.open(`${url}/detail/2/${detailId}`,"_blank");
  };

  // 分页
  paginationFunc = (page) => {
    const {
      fetchLiteratureContentList,
      literature:{
        literatureSearchQuery,
        literatureDateQuery,
        literatureSelectQuery,
      }
    } = this.props;
    const sId = localStorage.getItem("sId");
    const orderType = localStorage.getItem("literatureOrderType");
    const orderFlag = localStorage.getItem("literatureOrderFlag");
    const params = {
      searchWord:literatureSearchQuery,
      sid: sId ? Number(sId) : null,
      searchType:literatureSelectQuery,
      starTime:literatureDateQuery[0],
      endTime:literatureDateQuery[1],
      timeOrder: orderFlag === "false" ? "desc" : "asc",
      orderType:!orderType ? 1 : Number(orderType),
      pageNum:page,
      pageSize:10,
    };
    fetchLiteratureContentList(params);
  };


  collectArticle = (obj) =>{
    /* eslint-disable no-param-reassign */
    const {
      id,
      iscollect,
      fileName
    } = obj;
    const {
      fetchArticleCollect,
      fetchArticleCancelCollect,
      fetchLiteratureCollect,
    } = this.props;
    // 内部资料 type=9
    const params = {
      cid: fileName || id,
      type: 9,
    };
    if(iscollect === 1){
      return fetchArticleCancelCollect(params, () => {
        obj.iscollect = 0;
        fetchLiteratureCollect();
      });
    }
    return fetchArticleCollect(params, () => {
      obj.iscollect = 1;
      fetchLiteratureCollect();
    });
  };

  sortFunc = (orderType, idx) =>{
    const {
      fetchLiteratureContentList,
      fetchLiteratureThemeSearchFlag,
      fetchLiteratureResetButton,
      literature:{
        literatureSearchQuery,
        literatureDateQuery,
        literatureSelectQuery,
      }
    } = this.props;
    /* eslint-disable no-nested-ternary */
    /* eslint-disable no-param-reassign */
    /* eslint-disable array-callback-return */
    const sId = localStorage.getItem("sId");
    if (orderType !== 3) {
      if (this.sort_index === idx) {
        sortArr.map((cur, index) => {
          if (index === idx) {
            cur.flag = !cur.flag;
          }
        });
      }
      if (this.sort_index !== idx) {
        this.sort_index = idx;
        sortArr.map((cur) => {
          cur.flag = false;
        });
      }
    }
    if (orderType === 3) {
      if (this.sort_index === idx) {
        sortArr.map((cur, index) => {
          if (index === idx) {
            cur.flag = false;
          }
        });
      }
      if (this.sort_index !== idx) {
        this.sort_index = idx;
        sortArr.map((cur) => {
          cur.flag = false;
        });
      }
    }
    const params = {
      searchWord:literatureSearchQuery,
      searchType:literatureSelectQuery,
      starTime:literatureDateQuery[0],
      endTime:literatureDateQuery[1],
      timeOrder: orderType === 3 ? "desc" :
        (!sortArr[this.sort_index].flag ? "desc" : "asc"),
      orderType,
      pageNum:1,
      pageSize:10,
      sid: sId ? Number(sId) : null,
    };
    fetchLiteratureResetButton(false);
    fetchLiteratureThemeSearchFlag(false);
    fetchLiteratureContentList(params);
    localStorage.setItem("literatureOrderType",orderType);
    localStorage.setItem("literatureOrderFlag",sortArr[this.sort_index].flag);
  };

  checkType() {
    /* eslint-disable no-param-reassign */
    siblings(this).forEach((item, index, arr) => {
      arr[index].style.color = "#515256";
      arr[index].children[1].style.color = "#fff";
    });
    this.style.color = "#0572B8";
    this.children[1].style.color = "#0572B8";
  }

  addEvent() {
    const { classSort } = this;
    const arr = classSort.children;
    const ways = [];
    for (let i = 0; i < arr.length; i += 1) {
      ways.push(arr[i]);
    }
    Array.prototype.forEach.call(ways, (item) => {
      item.addEventListener("click", this.checkType);
    });
  }


  render() {
    const {
      literature:{
        literatureContentListData:{
          page:{
            resultList,
            rowCount,
            pageNow,
          }
        },
        literatureSearchQuery,
        fetchLiteratureContentListLoading
      }
    } = this.props;
    const item = resultList && resultList.map((cur, index) => {
      return (
        <div className="literature-content-check-item" key={index.toString()}>
          <div className="literature-content-check-item-title clear">
            <a
              className="literature-detail"
              rel="noopener noreferrer"
              dangerouslySetInnerHTML={{
                __html: cur.fArticleTitle
              }}
              title={cur.fArticleTitle}
              onClick={() => {return this.toDetails(cur.fileName);}}
            />
          </div>
          <div className="literature-content-check-item-text">
            <a
              className="literature-detail"
              rel="noopener noreferrer"
              title={cur.fArticleIntroduction}
              dangerouslySetInnerHTML={{ __html:`${cur.fArticleIntroduction}`}}
              onClick={() => {return this.toDetails(cur.fileName);}}
            />
          </div>
          <div className="literature-content-check-item-bottom clear">
            <div className="fl">
              { /* eslint-disable no-nested-ternary */ }
              <div className="literature-content-info">
                <span>上传人：</span>
                <span
                  className="literature_author"
                  dangerouslySetInnerHTML={{ __html:`${cur.fArticleAuthor}`}}
                />
                <span>发布时间：</span>
                <span>{cur.fFetchtime !== "" ?
                  ((cur.fFetchtime || "").split(" ").splice(0,1)) :
                  ((cur.fArticleTime || "").split(" ").splice(0,1))}
                </span>
              </div>
            </div>
            <div className="literature-content-check-item-click fr">
              <button type="button" className="read-num">
                <Icon type="eye"/>
              </button>
              <span>{cur.readnum === 0 ? 0 : cur.readnum}</span>
              <button
                type="button"
                className="ml20"
                onClick={() => {
                  return this.collectArticle(cur);
                }}
              >
                {
                  (cur.iscollect === 1) ?
                    <Icon theme="filled" type="star" style={{color:"#F6BD4E"}} />
                    : <Icon theme="outlined" type="star" style={{color:"#797979"}}/>
                }
              </button>
              <span>{cur.iscollect ? cur.iscollect : 0}</span>
            </div>
          </div>
        </div>
      );
    });
    const sortItem = sortArr && sortArr.map((cur, index) => {
      return (
        <button
          key={index.toString()}
          type="button"
          onClick={() => {return this.sortFunc(cur.id, index, cur.flag);}}
        >
          <span>{cur.value}</span><Icon type={cur.flag ? "arrow-up" : "arrow-down"}/>
        </button>
      );
    });
    return (
      <div className="literature-content-check">
        <div className="literature-content-check-top clear">
          <div className="literature-content-check-top-sort fl clear">
            <div className="fl">
              排序：
            </div>
            <div className="fl" ref={(ref) => {this.classSort = ref;}}>
              {sortItem}
              {(literatureSearchQuery) && (
                <button type="button" onClick={() => {return this.sortFunc(3,0);}}>
                  <span>相关性</span><Icon type="arrow-down"/>
                </button>
              )}
            </div>
          </div>
          <div className="literature-content-check-top-result fr">
            找到{rowCount}条结果
          </div>
        </div>
        {
          fetchLiteratureContentListLoading ? <div className="spin"><Spin/></div> :
            <div className="literature-content-check-center">
              {item.length >0 ? item : <img src={empty} className="noList" alt=""/>}
            </div>
        }
        {!rowCount ? "" :
          <div className="literature-content-check-pagination">
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
        }
      </div>
    );
  }
}

export default LiteratureContentCheck;
