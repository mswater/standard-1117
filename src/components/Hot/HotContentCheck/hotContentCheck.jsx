import React from "react";
import { Checkbox, Icon, Pagination, Spin, message } from "antd";
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
}, {
  value: "转发数",
  flag: null,
  id: 4
}, {
  value: "评论数",
  flag: null,
  id: 5
}, {
  value: "点赞数",
  flag: null,
  id: 6
}];

function itemRender(current, type, originalElement){
  if (type === "prev") {
    return <a>&lt;上一页</a>;
  } if (type === "next") {
    return <a>下一页&gt;</a>;
  }
  return originalElement;
}
class HotContentCheck extends React.Component {
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
    const hotContact = localStorage.getItem("hotContact");
    const sortArr = (hotContact === "2") ? sortArrSecond : sortArrFirst;
    sortArr[0].flag = false;
  }


  componentWillReceiveProps(nextProps) {
    const {
      hot: {
        hotContentListData: {
          timeCompare: nextTimeCompare,
          page: {
            resultList: currentResultList,
          }
        }
      }
    } = nextProps;
    const {
      hot: {
        hotContentListData: {
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
        hotThemeSearch,
        hotThemeSearchFlag,
        hotResetButtonFlag
      }
    } = this.props;
    this.addEvent();
    if (hotResetButtonFlag || hotThemeSearchFlag) {
      for (let i = 0; i < sortArrSecond.length; i += 1) {
        sortArrSecond[i].flag = null;
      }
      for (let i = 0; i < sortArrFirst.length; i += 1) {
        sortArrFirst[i].flag = null;
      }
    }
    if (hotThemeSearchFlag) {
      if (hotThemeSearch !== "") {
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
        const hotContact = localStorage.getItem("hotContact");
        const sortArr = (hotContact === "2") ? sortArrSecond : sortArrFirst;
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
  }

  optionsFunc = (data) => {
    const optionsArr = [];
    for (let i = 0; i < data.length; i += 1) {
      optionsArr.push(data[i].id.toString());
    }
    return optionsArr;
  };

  toDetails = (detailId) => {
    const url = window.location.origin;
    window.open(`${url}/detail/1/${detailId}`, "_blank");
  };

  onCheckAllChange = (e) => {
    const {
      hot: {
        hotContentListData: {
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

  onChange = (list) => {
    const {
      hot: {
        hotContentListData: {
          page: {
            resultList,
          }
        }
      }
    } = this.props;

    this.setState({
      checkedList: list,
      indeterminate: !!list.length
        && (list.length < this.optionsFunc(resultList).length),
      checkAll: list.length === this.optionsFunc(resultList).length,
      selectNumber: list.length
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
    const {
      fetchHotContentList,
      hot: {
        hotProListFlag,
        hotThemeSearch,
        hotSearchQuery,
        hotWeiboTypeFlag,
        hotLanguageTypeFlag,
        hotStartDate,
        hotEndDate,
      }
    } = this.props;
    /* eslint-disable no-nested-ternary */
    const readingId = localStorage.getItem("readingId");
    const hotContact = localStorage.getItem("hotContact");
    const orderType = localStorage.getItem("orderType");
    const orderFlag = localStorage.getItem("orderFlag");
    const params = {
      searchKey: hotThemeSearch,
      hId: Number(readingId),
      sourceType: Number(hotContact),
      webList: hotWeiboTypeFlag ? [] : (hotProListFlag ? [] :
        (hotLanguageTypeFlag ? [] : ((hotSearchQuery.length > 0) ?
          hotSearchQuery : []))),
      proList: hotWeiboTypeFlag ? [] : (hotProListFlag ?
        ((hotSearchQuery.length > 0) ? hotSearchQuery : ["全部"]) : []),
      languageList: hotWeiboTypeFlag ? [] : (hotLanguageTypeFlag ?
        ((hotSearchQuery.length > 0) ? hotSearchQuery : ["全部"]) : []),
      order: (orderFlag === "false") ? "desc" : "asc",
      orderType: !orderType ? 1 : Number(orderType),
      startDate: hotStartDate,
      endDate: hotEndDate,
      pageNum: page,
      pageSize: 10
    };
    fetchHotContentList(params);
  };

  collectArticle = (obj) => {
    const {
      id,
      iscollect
    } = obj;
    const {
      fetchArticleCollect,
      fetchArticleCancelCollect,
    } = this.props;
    const hotContact = localStorage.getItem("hotContact");
    const item = {
      cid: id,
      type: Number(hotContact),
    };
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
        hotContentListData: {
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
      fetchHotContentList,
      fetchHotThemeSearchFlag,
      fetchHotResetButton,
      hot: {
        hotProListFlag,
        hotThemeSearch,
        hotSearchQuery,
        hotWeiboTypeFlag,
        hotLanguageTypeFlag,
        hotStartDate,
        hotEndDate,
      }
    } = this.props;
    /* eslint-disable no-nested-ternary */
    const readingId = localStorage.getItem("readingId");
    const hotContact = localStorage.getItem("hotContact");
    const sortArr = (hotContact === "2") ? sortArrSecond : sortArrFirst;
    let orderFlag;
    if (orderType !== 3) {
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
    if (orderType === 3) {
      sortArr.map((cur) => {
        cur.flag = null;
      });
      orderFlag = false;
    }
    const params = {
      searchKey: hotThemeSearch,
      hId: Number(readingId),
      sourceType: Number(hotContact),
      webList: hotWeiboTypeFlag ? [] : (hotProListFlag ? [] :
        (hotLanguageTypeFlag ? [] :
          ((hotSearchQuery.length > 0) ? hotSearchQuery : []))),
      proList: hotWeiboTypeFlag ? [] : (hotProListFlag ?
        ((hotSearchQuery.length > 0) ? hotSearchQuery : ["全部"]) : []),
      languageList: hotLanguageTypeFlag ?
        ((hotSearchQuery.length > 0) ? hotSearchQuery : ["全部"]) : [],
      order: (!orderFlag) ? "desc" : "asc",
      orderType,
      startDate: hotStartDate,
      endDate: hotEndDate,
      pageNum: 1,
      pageSize: 10
    };
    fetchHotResetButton(false);
    fetchHotThemeSearchFlag(false);
    fetchHotContentList(params);
    localStorage.setItem("orderType", orderType);
    localStorage.setItem("orderFlag", orderFlag);
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
    const hotContact = localStorage.getItem("hotContact");
    const { indeterminate, checkAll, checkedList, selectNumber } = this.state;
    const {
      hot: {
        fetchHotContentListLoading,
      },
      hot: {
        hotContentListData: {
          page: {
            resultList,
            rowCount,
            pageNow
          }
        },
        hotThemeSearch
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

    const item = this.resultListFunc(resultList)
      && this.resultListFunc(resultList).map((cur, index) => {
        return (
          <div className="hot-content-check-item" key={cur.id}>
            <div className="hot-content-check-item-title clear">
              <div className="fl">
                {username === "guest" ? "" :
                  (
                    <Checkbox value={cur.id ? cur.id.toString() : ""}/>
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
              <span
                onClick={() => {
                  return this.toggleList(index);
                }}
                className="repeat-article fr"
              >
                {
                  (cur.samecount && cur.samecount > 0) ?
                    (
                      <span>
                        [{cur.flag ? "点击收起" : "点击展开"}
                        <b>{cur.samecount}</b>篇重复文章]
                      </span>
                    ) : ""
                }
              </span>
            </div>
            <div
              className="hot-content-check-item-text"
              title={cur.fArticleIntroduction}
              onClick={() => {
                return this.toDetails(cur.id);
              }}
              dangerouslySetInnerHTML={{ __html: `${cur.fArticleIntroduction}${"..."}` }}
            />
            <div className="hot-content-check-item-bottom clear">
              <div className="fl">
                {hotContact === "2" ? (
                  <div>
                    <span>发布时间：</span>
                    <span>{(cur.fFetchtime || "").split(" ").splice(0, 1)}</span>
                    <span>转发</span>
                    <span>{cur.repost}</span>
                    <span>评论</span>
                    <span>{cur.comments}</span>
                    <span>赞</span>
                    <span>{cur.mlike}</span>
                    <span>来源：</span>
                    <span>{cur.fJobName}</span>
                  </div>) : (
                  <div>
                    <span>发布时间：</span>
                    <span>{(cur.fFetchtime || "").split(" ").splice(0, 1)}</span>
                    <span>来源：</span>
                    <span>{cur.fJobName}</span>
                  </div>
                )}
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
    const sortArr = hotContact === "2" ? sortArrSecond : sortArrFirst;
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
              {(hotThemeSearch) && (
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
        {username === "guest" ? "" : (
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
          fetchHotContentListLoading ? <div className="spin"><Spin/></div> :
            <div className="hot-content-check-center">
              {item.length > 0 ?
                (
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
              className="pagination"
              pageSize={10}
              current={pageNow}
            />
          </div>
        }
      </div>
    );
  }
}

export default HotContentCheck;

