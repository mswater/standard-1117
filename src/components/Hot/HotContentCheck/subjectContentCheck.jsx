import React from "react";
import { Checkbox, Icon, Pagination, Spin, message, Modal } from "antd";
import "./index.css";
import { siblings } from "../../../lib/tools/utils";
import empty from "../../../images/empty.png";

const sortArrFirst = [{
  value: "发布时间",
  flag: null,
  id: 1
},{
  value: "浏览量",
  flag: null,
  id: 2
}];
const sortArrSecond = [{
  value: "发布时间",
  flag: null,
  id: 1
},{
  value: "浏览量",
  flag: null,
  id: 2
},];
// 国内文献，海外文献 排序方式  searchContact = 4 或者 searchContact = 5
const sortArrThird = [{
  value: "检索评分",
  flag: null,
  id: 8
}, {
  value: "发表年份",
  flag: null,
  id: 9
}, {
  value: "创建时间",
  flag: null,
  id: 10
}];
function itemRender(current, type, originalElement){
  if (type === "prev") {
    return <a>&lt;上一页</a>;
  } if (type === "next") {
    return <a>下一页&gt;</a>;
  }
  return originalElement;
}
class SubjectContentCheck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedList: [],
      indeterminate: false,
      checkAll: false,
      selectNumber: 0,
      resultListArr: []
    };
  }

  componentDidMount() {
    this.addEvent();
    message.config({
      top: 300,
    });
    // 初始化排序
    const subjectContact = localStorage.getItem("subjectContact");
    /* eslint-disable  no-nested-ternary */
    const sortArr = (subjectContact === "2") ? sortArrSecond :
      ((subjectContact === "4" || subjectContact === "5") ?
        sortArrThird : sortArrFirst);
    sortArr[0].flag = false;
  }


  componentWillReceiveProps(nextProps) {
    const {
      hot: {
        subjectContentListData: {
          timeCompare: nextTimeCompare,
          page: {
            resultList: currentResultList,
          }
        }
      }
    } = nextProps;
    const {
      hot: {
        subjectContentListData: {
          timeCompare: currentTimeCompare,
        }
      }
    } = this.props;
    if (currentTimeCompare && nextTimeCompare !== currentTimeCompare) {
      /* eslint-disable no-param-reassign */
      /* eslint-disable array-callback-return */
      this.setState({
        checkedList: [],
        indeterminate: false,
        checkAll: false,
        selectNumber: 0,
        resultListArr: currentResultList
      });
    }
  }


  componentDidUpdate() {
    const {
      hot: {
        subjectThemeSearch,
        subjectThemeSearchFlag,
        subjectResetButtonFlag
      }
    } = this.props;
    this.addEvent();
    if (subjectResetButtonFlag || subjectThemeSearchFlag) {
      for (let i = 0; i < sortArrSecond.length; i += 1) {
        sortArrSecond[i].flag = null;
      }
      for (let i = 0; i < sortArrFirst.length; i += 1) {
        sortArrFirst[i].flag = null;
      }
      for (let i = 0; i < sortArrThird.length; i += 1) {
        sortArrThird[i].flag = null;
      }
    }
    const subjectContact = localStorage.getItem("subjectContact");
    if (subjectThemeSearchFlag) {
      if (subjectThemeSearch !== "" && subjectContact !== "4" && subjectContact !== "5") {
        const { classSort } = this;
        const arr = classSort.children;
        for (let i = 0; i < arr.length; i += 1) {
          arr[i].style.color = "#515256";
          arr[i].children[1].style.color = "#fff";
        }
        arr[arr.length - 1].style.color = "#0572B8";
        arr[arr.length - 1].children[1].style.color = "#0572B8";
      } else {
        const { classSort } = this;
        const arr = classSort.children;
        for (let i = 0; i < arr.length; i += 1) {
          arr[i].style.color = "#515256";
          arr[i].children[1].style.color = "#fff";
        }
        arr[0].style.color = "#0572B8";
        arr[0].children[1].style.color = "#0572B8";
        /* eslint-disable  no-nested-ternary */
        const sortArr = (subjectContact === "2") ? sortArrSecond :
          ((subjectContact === "4" || subjectContact === "5") ?
            sortArrThird : sortArrFirst);
        sortArr[0].flag = false;
      }
    }
  }

  componentWillUnmount() {
    for (let i = 0; i < sortArrFirst.length;) {
      sortArrFirst[i].flag = null;
      i += 1;
    }
    for (let i = 0; i < sortArrSecond.length;) {
      sortArrSecond[i].flag = null;
      i += 1;
    }
    for (let i = 0; i < sortArrThird.length;) {
      sortArrThird[i].flag = null;
      i += 1;
    }
  }

  optionsFunc = (data) => {
    const optionsArr = [];
    for (let i = 0; i < data.length; i += 1) {
      optionsArr.push(data[i].id.toString());
    }
    return optionsArr;
  };

  toDetails = (detailId) => {
    const subjectContact = localStorage.getItem("subjectContact");
    let articleType;
    if (subjectContact === "4" || subjectContact === "5") {
      articleType = (9 - Number(subjectContact)).toString();
    } else {
      articleType = "1";
    }
    const url = window.location.origin;
    window.open(`${url}/detail/${articleType}/${detailId}`, "_blank");
  };

  onCheckAllChange = (e) => {
    const {
      hot: {
        subjectContentListData: {
          page: {
            resultList,
          }
        }
      }
    } = this.props;
    this.setState({
      checkedList: e.target.checked ? this.optionsFunc(resultList) : [],
      indeterminate: false,
      checkAll: e.target.checked,
      selectNumber: e.target.checked ? this.optionsFunc(resultList).length : 0
    });
  };

  onChange = (checkedList) => {
    const {
      hot: {
        subjectContentListData: {
          page: {
            resultList,
          }
        }
      }
    } = this.props;
    this.setState({
      checkedList,
      indeterminate: !!checkedList.length
        && (checkedList.length < this.optionsFunc(resultList).length),
      checkAll: checkedList.length === this.optionsFunc(resultList).length,
      selectNumber: checkedList.length
    });
  };


  clearAll = () => {
    this.setState({
      checkedList: [],
      indeterminate: false,
      checkAll: false,
      selectNumber: 0
    });
  };

  download = () => {
    const {
      fetchDownload,
    } = this.props;
    const { checkedList } = this.state;
    const item = {
      ids: checkedList
    };
    if (checkedList.length === 0) {
      message.error("请选择要操作的对象！");
    } else {
      fetchDownload(item);
      message.success("pdf已经生成，请到个人主页-我的下载查看！");
    }
  };

  paginationFunc = (page) => {
    // 如果是游客身份，只能看前50页数据
    const username = localStorage.getItem("username");
    const subjectContact = localStorage.getItem("subjectContact");
    if (username === "guest" && page > 50 && (subjectContact === "4" || subjectContact === "5")) {
      Modal.info({
        title: "您目前为游客身份，仅可浏览500篇文献",
        content: (
          <div>
            <p>如需申请正式账号，请邮箱联系：agrihotspot@caas.cn</p>
          </div>
        ),
        onOk() {
        },
      });
    } else {
      const {
        fetchSubjectContentList,
        hot: {
          subjectProListFlag,
          subjectThemeSearch,
          subjectSearchQuery,
          subjectWeiboTypeFlag,
          subjectLanguageTypeFlag,
          subjectStartDate,
          subjectEndDate,
        }
      } = this.props;
      /* eslint-disable no-nested-ternary */
      const readingId = localStorage.getItem("subjectReadingId");
      const subjectContact = localStorage.getItem("subjectContact");
      const orderType = localStorage.getItem("subjectOrderType");
      const orderFlag = localStorage.getItem("subjectOrderFlag");
      const params = {
        searchKey: subjectThemeSearch,
        hId: Number(readingId),
        sourceType: Number(subjectContact),
        webList: subjectWeiboTypeFlag ? null : (subjectProListFlag ? null :
          (subjectLanguageTypeFlag ? null : ((subjectSearchQuery.length > 0) ?
            subjectSearchQuery : ["全部"]))),
        proList: subjectWeiboTypeFlag ? null : (subjectProListFlag ?
          ((subjectSearchQuery.length > 0) ? subjectSearchQuery : ["全部"]) : null),
        languageList: subjectLanguageTypeFlag ?
          ((subjectSearchQuery.length > 0) ? subjectSearchQuery : ["全部"]) : null,
        order: (orderFlag === "false") ? "desc" : "asc",
        orderType: !orderType ? 1 : Number(orderType),
        startDate: subjectStartDate,
        endDate: subjectEndDate,
        pageNum: page,
        pageSize: 10
      };
      fetchSubjectContentList(params);
    }
  };

  collectArticle = (obj) => {
    const {
      id,
      gid,
      iscollect
    } = obj;
    const {
      fetchArticleCollect,
      fetchArticleCancelCollect,
    } = this.props;
    const subjectContact = localStorage.getItem("subjectContact");
    let item;
    if (subjectContact === "4" || subjectContact === "5") {
      item = {
        cid: gid,
        type: Number(subjectContact),
      };
    } else {
      item = {
        cid: id,
        type: Number(subjectContact),
      };
    }
    if (iscollect === 1) {
      return fetchArticleCancelCollect(item, () => {
        obj.iscollect = 0;
      });
    }
    return fetchArticleCollect(item, () => {
      obj.iscollect = 1;
    });
  };


  toggleList = (id) => {
    const {
      hot: {
        subjectContentListData: {
          page: {
            resultList,
          }
        }
      },
      fetchSameList
    } = this.props;
    /* eslint-disable no-param-reassign */
    /* eslint-disable array-callback-return */
    resultList.map((cur, index) => {
      if (id === index) {
        cur.flag = !cur.flag;
        if (cur.flag === true) {
          fetchSameList(cur.id);
        }
      }
      if (id !== index) {
        cur.flag = false;
      }
    });

    this.setState({
      resultListArr: resultList
    });
  };


  resultListFunc = (data) => {
    const { resultListArr } = this.state;
    const {
      article: {
        sameCountData: {
          cid,
          samecount
        }
      }
    } = this.props;
    if (resultListArr.length === 0) {
      data.forEach((item) => {
        /* eslint-disable-next-line */
        item.flag = false;
        if (cid === item.id) {
          item.samecount = samecount;
        }
      });
      return data;
    }
    resultListArr.forEach((item) => {
      /* eslint-disable-next-line */
      if (cid === item.id) {
        item.samecount = samecount;
      }
    });
    return resultListArr;
  };

  sortFunc = (orderType, idx) => {
    const {
      fetchSubjectContentList,
      fetchSubjectThemeSearchFlag,
      fetchSubjectResetButton,
      hot: {
        subjectProListFlag,
        subjectThemeSearch,
        subjectSearchQuery,
        subjectWeiboTypeFlag,
        subjectLanguageTypeFlag,
        subjectStartDate,
        subjectEndDate,
      }
    } = this.props;
    /* eslint-disable no-nested-ternary */
    const readingId = localStorage.getItem("subjectReadingId");
    const subjectContact = localStorage.getItem("subjectContact");
    const sortArr = (subjectContact === "2") ? sortArrSecond :
      ((subjectContact === "4" || subjectContact === "5") ?
        sortArrThird : sortArrFirst);
    let orderFlag;
    if (orderType !== 3 && orderType !== 8) {
      sortArr.map((cur, index) => {
        if (index === idx) {
          if (cur.flag !== null) {
            cur.flag = !cur.flag;
          } else {
            cur.flag = false;
          }
          orderFlag = cur.flag;
        } else {
          cur.flag = null;
        }
      });
    }
    if (orderType === 3 || orderType === 8) {
      sortArr.map((cur) => {
        cur.flag = null;
      });
      orderFlag = false;
    }
    const params = {
      searchKey: subjectThemeSearch,
      hId: Number(readingId),
      sourceType: Number(subjectContact),
      webList: subjectWeiboTypeFlag ? null : (subjectProListFlag ? null :
        (subjectLanguageTypeFlag ? null :
          ((subjectSearchQuery.length > 0) ? subjectSearchQuery : ["全部"]))),
      proList: subjectProListFlag ?
        ((subjectSearchQuery.length > 0) ? subjectSearchQuery : ["全部"]) : null,
      languageList: subjectLanguageTypeFlag ?
        ((subjectSearchQuery.length > 0) ? subjectSearchQuery : ["全部"]) : null,
      order: (!orderFlag) ? "desc" : "asc",
      orderType,
      startDate: subjectStartDate,
      endDate: subjectEndDate,
      pageNum: 1,
      pageSize: 10
    };
    fetchSubjectResetButton(false);
    fetchSubjectThemeSearchFlag(false);
    fetchSubjectContentList(params);
    localStorage.setItem("subjectOrderType", orderType);
    localStorage.setItem("subjectOrderFlag", orderFlag);
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
    const username = localStorage.getItem("username");
    const subjectContact = localStorage.getItem("subjectContact");
    const { indeterminate, checkAll, checkedList, selectNumber } = this.state;
    const {
      hot: {
        fetchSubjectContentListLoading,
        subjectContentListData: {
          page: {
            resultList,
            rowCount,
            pageNow
          }
        },
        subjectThemeSearch
      },
      article: {
        sameListData,
      },
    } = this.props;
    const sameList = sameListData
      && sameListData.map((cur, index) => {
        return (
          <li key={index.toString()}>
            <span
              onClick={() => {
                return this.toDetails(cur.id);
              }}
            >
              <b/>
              {cur.fArticleTitle}
            </span>
            <span>发布时间：{(cur.fFetchtime || "").split(" ").splice(0, 1)}</span>
            <span>来源：{cur.fJobName}</span>
          </li>
        );
      });
    let item;
    // 国内文献，海外文献，item特殊处理
    if (subjectContact === "4" || subjectContact === "5") {
      item = resultList && resultList.map((cur) => {
        return (
          <div className="hot-content-check-item" key={cur.gid}>
            <div className="hot-content-check-item-title clear">
              <span
                className="hot-content-title-no-check"
                onClick={() => {
                  return this.toDetails(cur.gid);
                }}
                dangerouslySetInnerHTML={{ __html: cur.title }}
              />
            </div>
            <div
              className="hot-content-check-item-text"
              title={cur.abstract}
              onClick={() => {
                return this.toDetails(cur.gid);
              }}
              dangerouslySetInnerHTML={{ __html: `${cur.abstract}${"..."}` }}
            />
            <div className="hot-content-check-item-bottom clear">
              <div className="fl">
                <div>
                  <span>发表年份：</span>
                  <span>{cur.year}年</span>
                  <span>创建时间：</span>
                  <span>{cur.createTime}</span>
                  <span>作者：</span>
                  <span>{cur.author}</span>
                  <span>期刊：</span>
                  <span>{cur.journalName}</span>
                </div>
              </div>
              <div className="hot-content-check-item-click fr">
                {username === "guest" ? "" : (
                  <span className="ml20">
                    <button
                      type="button"
                      onClick={() => {
                        return this.collectArticle(cur);
                      }}
                    >
                      {
                        (cur.iscollect === 1) ?
                          <Icon theme="filled" type="star" style={{ color: "#F6BD4E" }}/>
                          : <Icon theme="outlined" type="star" style={{ color: "#797979" }}/>
                      }
                    </button>
                    <span>{cur.iscollect ? cur.iscollect : 0}</span>
                  </span>
                )
                }
              </div>
            </div>
          </div>
        );
      });
    } else {
      item = this.resultListFunc(resultList) &&
        this.resultListFunc(resultList).map((cur) => {
          return (
            <div className="hot-content-check-item" key={cur.id}>
              <div className="hot-content-check-item-title clear">
                <div className="fl">
                  {username === "guest" ? "" :
                    (
                      <Checkbox
                        value={cur.id ? cur.id.toString() : ""}
                      />
                    )
                  }
                  <span
                    className="hot-content-title"
                    onClick={() => {
                      return this.toDetails(cur.id);
                    }}
                    dangerouslySetInnerHTML={{
                      __html: cur.fArticleTitleColour
                    }}
                  />
                </div>
              </div>
              <div
                className="hot-content-check-item-text"
                title={cur.fArticleContent}
                onClick={() => {
                  return this.toDetails(cur.id);
                }}
                dangerouslySetInnerHTML={{ __html: `${cur.fArticleContent}${"..."}` }}
              />
              <div className="hot-content-check-item-bottom clear">
                <div className="fl">
                  <div>
                    <span>发布时间：</span>
                    <span>{(cur.fFetchtime || "").split(" ").splice(0, 1)}</span>
                    <span>来源：</span>
                    <span>{cur.fJobName}</span>
                  </div>
                </div>
                <div className="hot-content-check-item-click fr">
                  <button type="button" className="read-num">
                    <Icon type="eye"/>
                  </button>
                  <span>{cur.readnum}</span>
                  {username === "guest" ? "" : (
                    <span className="ml20">
                      <button
                        type="button"
                        onClick={() => {
                          return this.collectArticle(cur);
                        }}
                      >
                        {
                          (cur.iscollect === 1) ?
                            <Icon theme="filled" type="star" style={{ color: "#F6BD4E" }}/>
                            : <Icon theme="outlined" type="star" style={{ color: "#797979" }}/>
                        }
                      </button>
                      <span>{cur.iscollect ? cur.iscollect : 0}</span>
                    </span>
                  )
                  }
                </div>
              </div>
              {(cur.flag) && (
                <div className="same-article-list-container">
                  <ul className="same-article-list">
                    {sameList}
                  </ul>
                </div>
              )}
            </div>
          );
        });
    }

    const sortArr = (subjectContact === "2") ? sortArrSecond :
      ((subjectContact === "4" || subjectContact === "5") ?
        sortArrThird : sortArrFirst);
    const sortItem = sortArr && sortArr.map((cur, index) => {
      return (
        <button
          key={index.toString()}
          type="button"
          onClick={() => {
            return this.sortFunc(cur.id, index);
          }}
        >
          <span>{cur.value}</span>
          <Icon
            type={(sortArr[index] && sortArr[index].flag)
              ? "arrow-up" : "arrow-down"}
          />
        </button>
      );
    });
    return (
      <div className="hot-content-check">
        <div className="hot-content-check-top clear">
          <div className="hot-content-check-top-sort fl clear">
            <div className="fl">
              排序：
            </div>
            <div className="fl" ref={(ref) => {this.classSort = ref;}}>
              {sortItem}
              {(subjectThemeSearch !== "" &&
                subjectContact !== "4" &&
                subjectContact !== "5") && (
                <button
                  type="button"
                  onClick={() => {
                    return this.sortFunc(3, "");
                  }}
                >
                  <span>相关性</span><Icon type="arrow-down"/>
                </button>
              )}
            </div>
          </div>
          <div className="hot-content-check-top-result fr">
            找到{rowCount}条结果
          </div>
        </div>
        {(username === "guest" || subjectContact === "4" || subjectContact === "5") ? "" : (
          <div className="hot-content-check-middle clear">
            <div className="fl clear">
              <Checkbox
                className="fl"
                indeterminate={indeterminate}
                onChange={this.onCheckAllChange}
                checked={checkAll}
              >
                全选
              </Checkbox>
              <div className="hot-content-check-middle-select fl clear">
                <p className="fl">
                  <span>已选：</span>
                  <span>{selectNumber}</span>
                </p>
                <button className="fl" type="button" onClick={this.clearAll}>清除</button>
              </div>
            </div>
            <div className="hot-content-check-download fr">
              {item.length > 0 ?
                <button
                  type="button"
                  onClick={this.download}
                >
                  批量下载
                </button>
                : ""
              }
            </div>
          </div>
        )
        }
        {
          fetchSubjectContentListLoading ? <div className="spin"><Spin/></div> :
            <div className="hot-content-check-center">
              {item.length > 0 ? (
                <Checkbox.Group
                  value={checkedList}
                  onChange={this.onChange}
                >
                  {item}
                </Checkbox.Group>
              ) : <img src={empty} className="noList" alt=""/>}
            </div>
        }
        {!rowCount ? "" :
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
        }
      </div>
    );
  }
}

export default SubjectContentCheck;

