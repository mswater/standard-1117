import React from "react";
import { Checkbox, Icon, message, Pagination, Spin } from "antd";
import "./index.css";
import { siblings } from "../../../lib/tools/utils";
import empty from "../../../images/empty.png";


const CheckboxGroup = Checkbox.Group;
const sortArrFirst = [{
  value: "发布时间",
  flag: false,
  id: 1
}, {
  value: "浏览量",
  flag: false,
  id: 2
}, {
  value: "",
  flag: false,
  id: ""
}, {
  value: "",
  flag: false,
  id: ""
}];
const sortArrSecond = [{
  value: "发布时间",
  flag: false,
  id: 1
}, {
  value: "转发数",
  flag: false,
  id: 4
}, {
  value: "评论数",
  flag: false,
  id: 5
}, {
  value: "点赞数",
  flag: false,
  id: 6
}];

const sortArrThird = [{
  value: "发表时间",
  flag: false,
  id: 1
}, {
  value: "浏览量",
  flag: false,
  id: 2
}, {
  value: "",
  flag: false,
  id: ""
}, {
  value: "",
  flag: false,
  id: ""
}];

function itemRender(current, type, originalElement){
  if (type === "prev") {
    return <a>&lt;上一页</a>;
  } if (type === "next") {
    return <a>下一页&gt;</a>;
  }
  return originalElement;
}
class TopicContentCheck extends React.Component {
  constructor(props) {
    super(props);
    this.sort_index = 0;
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
  }

  componentWillReceiveProps(nextProps) {
    const {
      subject:{
        subjectContentListData:{
          timeCompare:nextTimeCompare,
          page:{
            resultList: currentResultList,
          }
        }
      }
    } = nextProps;
    const {
      subject:{
        subjectContentListData:{
          timeCompare:currentTimeCompare,
        }
      }
    } = this.props;
    if (currentTimeCompare && nextTimeCompare !== currentTimeCompare) {
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
      subject:{
        subjectThemeSearch,
        subjectThemeSearchFlag,
        subjectResetButtonFlag
      }
    } = this.props;
    if (subjectResetButtonFlag) {
      /* eslint-disable no-nested-ternary */
      const topicContact = localStorage.getItem("topicContact");
      const sortArr = topicContact === "2" ?
        sortArrSecond : ((topicContact === "4" || topicContact === "5")
          ? sortArrThird : sortArrFirst);
      const { classSort } = this;
      const arr = classSort.children;
      for (let i = 0; i < arr.length; i += 1) {
        arr[i].style.color = "#515256";
        arr[i].children[1].style.color = "#fff";
      }
      for (let i = 0; i < sortArr.length; i += 1) {
        sortArr[i].flag = false;
      }
      arr[0].style.color = "#0572B8";
      arr[0].children[1].style.color = "#0572B8";
    }
    if(!subjectResetButtonFlag) {
      if (subjectThemeSearchFlag) {
        if(subjectThemeSearch) {
          const { classSort } = this;
          const arr = classSort.children;
          for (let i = 0; i < arr.length; i += 1) {
            arr[i].style.color = "#515256";
            arr[i].children[1].style.color = "#fff";
          }
          arr[arr.length - 1].style.color = "#0572B8";
          arr[arr.length - 1].children[1].style.color = "#0572B8";
        }
        if (!subjectThemeSearch) {
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
      if (!subjectThemeSearchFlag) {
        this.addEvent();
      }
    }
  }


  topicDetails = (detailId) => {
    const url = window.location.origin;
    window.open(`${url}/detail/${detailId}`,"_blank");
  };

  optionsFunc = (data) => {
    const optionsArr = [];
    for (let i = 0; i < data.length; i+=1) {
      optionsArr.push(data[i].id.toString());
    }
    return optionsArr;
  };

  onCheckAllChange = (e) => {
    const {
      subject:{
        subjectContentListData:{
          page:{
            resultList,
          }
        }
      }
    } = this.props;
    this.setState({
      checkedList: e.target.checked ?this.optionsFunc(resultList): [],
      indeterminate: false,
      checkAll: e.target.checked,
      selectNumber: e.target.checked ? this.optionsFunc(resultList).length : 0
    });
  };

  onChange = (checkedList) => {
    const {
      subject:{
        subjectContentListData:{
          page:{
            resultList,
          }
        }
      }
    } = this.props;
    this.setState({
      checkedList,
      indeterminate: !!checkedList.length
        && (checkedList.length < this.optionsFunc(resultList).length),
      checkAll: checkedList.length ===  this.optionsFunc(resultList).length,
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

  download = () =>{
    const {
      fetchDownload,
    } = this.props;
    const { checkedList } = this.state;
    const item ={
      ids: checkedList
    };
    if (checkedList.length === 0){
      message.error("请选择要操作的对象！");
    }else{
      fetchDownload(item);
      message.success("pdf已经生成，请到个人主页-我的下载查看！");
    }
  };

  // 分页
  paginationFunc = (page) => {
    const {
      fetchSubjectContentList,
      subject:{
        subjectProListFlag,
        subjectThemeSearch,
        subjectSearchQuery,
        subjectWeiboTypeFlag
      }
    } = this.props;
    /* eslint-disable no-nested-ternary */
    const menuId = localStorage.getItem("id");
    const topicContact = localStorage.getItem("topicContact");
    const orderType = localStorage.getItem("topicOrderType");
    const orderFlag = localStorage.getItem("topicOrderFlag");
    const params = {
      searchKey: subjectThemeSearch,
      hId: Number(menuId),
      sourceType:topicContact,
      webList: subjectWeiboTypeFlag ? [] : (subjectProListFlag ? [] :
        (subjectSearchQuery!==[] ? subjectSearchQuery : [])),
      proList: subjectWeiboTypeFlag ? [] : (subjectProListFlag ?
        (subjectSearchQuery!==[] ? subjectSearchQuery : []) : []),
      order: orderFlag!=="false" ? "desc" : "asc",
      orderType:!orderType ? 1 : Number(orderType),
      pageNum: page,
      pageSize:10
    };
    fetchSubjectContentList(params);
  };

  // 收藏文章
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
    } = this.props;
    const topicContact = localStorage.getItem("topicContact");
    const item = {
      cid: id || fileName,
      type:Number(topicContact),
    };
    if(iscollect === 1){
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
      subject:{
        subjectContentListData:{
          page:{
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
      if(id !== index) {
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
      article:{
        sameCountData:{
          cid,
          samecount
        }
      }
    } = this.props;
    if (resultListArr.length === 0) {
      data.forEach((item) => {
        /* eslint-disable-next-line */
        item.flag = false;
        if(cid === item.id) {
          item.samecount = samecount;
        }
      });
      return data;
    }
    resultListArr.forEach((item) => {
      /* eslint-disable-next-line */
      if(cid === item.id) {
        item.samecount = samecount;
      }
    });
    return resultListArr;
  };

  sortFunc = (orderType, idx) =>{
    const {
      fetchSubjectContentList,
      fetchSubjectResetButton,
      fetchSubjectThemeSearchFlag,
      subject: {
        subjectProListFlag,
        subjectThemeSearch,
        subjectSearchQuery,
        subjectWeiboTypeFlag
      }
    } = this.props;
    /* eslint-disable no-nested-ternary */
    const menuId = localStorage.getItem("id");
    const topicContact = localStorage.getItem("topicContact");
    const sortArr = topicContact === "2" ?
      sortArrSecond : ((topicContact === "4" || topicContact === "5")
        ? sortArrThird : sortArrFirst);
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
      searchKey: subjectThemeSearch,
      hId: Number(menuId),
      sourceType:topicContact,
      webList: subjectWeiboTypeFlag ? [] : (subjectProListFlag ? []
        :(subjectSearchQuery!==[] ? (subjectSearchQuery === ["全部"] ?
          [] : subjectSearchQuery) : [])),
      proList: subjectWeiboTypeFlag ? [] : (subjectProListFlag ?
        (subjectSearchQuery!==[] ? (subjectSearchQuery === ["全部"] ?
          [] : subjectSearchQuery) : []) : []),
      order:!sortArr[this.sort_index].flag ? "desc" : "asc",
      orderType,
      pageNum: 1,
      pageSize:10
    };
    fetchSubjectResetButton(false);
    fetchSubjectThemeSearchFlag(false);
    fetchSubjectContentList(params);
    localStorage.setItem("topicOrderType",orderType);
    localStorage.setItem("topicOrderFlag",sortArr[this.sort_index].flag);
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
    const topicContact = localStorage.getItem("topicContact");
    const sortArr = topicContact === "2" ?
      sortArrSecond : ((topicContact === "4" || topicContact === "5")
        ? sortArrThird : sortArrFirst);
    const { indeterminate, checkAll, checkedList, selectNumber} = this.state;
    const {
      subject:{
        fetchSubjectContentListLoading,
        subjectContentListData:{
          page:{
            resultList,
            rowCount,
            pageNow
          }
        },
        subjectThemeSearch
      },
      article:{
        sameListData
      }
    } = this.props;
    const sameList =sameListData
      && sameListData.map((cur,index) => {
        return(
          <li key={index.toString()}>
            <span
              onClick={() => {return this.topicDetails(cur.id);}}
            >
              <b />
              {cur.fArticleTitle}
            </span>
            <span>发布时间：{(cur.fFetchtime || "").split(" ").splice(0,1)}</span>
            <span>来源：{cur.fJobName}</span>
          </li>
        );
      });
    /* eslint-disable-next-line */
    const item = this.resultListFunc(resultList)
      && this.resultListFunc(resultList).map((cur,index) => {
        return (
          <div className="topic-content-check-item" key={cur.id || cur.fileName}>
            <div className="topic-content-check-item-title clear">
              {(
                topicContact === "5"
                || topicContact === "4"
              ) ?
                (
                  <a
                    href={cur.pageUrl || cur.fPageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="topic-content-title-link"
                  >
                    <span
                      className="topic-content-title"
                      dangerouslySetInnerHTML={{
                        __html: cur.fArticleTitleColour || cur.title
                      }}
                    />
                  </a>
                )
                :
                (
                  <div className="topic-content-left fl">
                    <CheckboxGroup
                      options={[cur.id ? cur.id.toString() : ""]}
                      value={checkedList}
                      onChange={this.onChange}
                    />
                    <span
                      className="topic-content-title"
                      onClick={() => {
                        return this.topicDetails(cur.id);
                      }}
                      dangerouslySetInnerHTML={{
                        __html: cur.fArticleTitleColour
                      }}
                    />
                  </div>
                )
              }

              <span
                onClick={()=>{return this.toggleList(index);}}
                className="repeat-article fr"
              >
                {
                  (cur.samecount && cur.samecount >0) ?
                    (<span>[{cur.flag ? "点击收起" : "点击展开"}<b>{cur.samecount}</b>篇重复文章]</span>):""
                }
              </span>
            </div>
            {(
              topicContact === "5"
              || topicContact === "4"
            ) ?
              (
                <div className="topic-content-check-item-text">
                  <a href={cur.pageUrl || cur.fPageUrl} target="_blank" rel="noopener noreferrer">
                    <p
                      title={cur.fArticleContent|| cur.summary || cur.fullText}
                      dangerouslySetInnerHTML={{
                        __html:
                          `${cur.fArticleContent || cur.summary || cur.fullText}${"..."}`
                      }}
                    />
                  </a>
                </div>
              )
              :
              (
                <div
                  className="topic-content-check-item-text"
                  onClick={() => {
                    return this.topicDetails(cur.id);
                  }}
                  title={cur.fArticleIntroduction}
                  dangerouslySetInnerHTML={{ __html: `${cur.fArticleIntroduction}${"..."}` }}
                />
              )
            }
            <div className="topic-content-check-item-bottom clear">
              <div className="fl">
                { /* eslint-disable no-nested-ternary */ }
                {topicContact === "2" ? (
                  <div>
                    <span>发布时间：</span>
                    <span>{(cur.fFetchtime || "").split(" ").splice(0,1)}</span>
                    <span>转发</span>
                    <span>{cur.repost}</span>
                    <span>评论</span>
                    <span>{cur.comments}</span>
                    <span>赞</span>
                    <span>{cur.mlike}</span>
                  </div>
                ): (
                  topicContact === "4" ?
                    (
                      <div>
                        <span>发表时间：</span>
                        <span>{(cur.time|| "").split(" ").splice(0,1)}</span>
                        <span>作者：</span>
                        <span>{cur.author}</span>
                        <span>期刊：</span>
                        <span>{cur.source}</span>
                      </div>
                    )
                    : (topicContact === "5" ? (
                      <div>
                        <span>发表时间：</span>
                        <span>{(cur.fFetchtime || "").split(" ").splice(0,1)}</span>
                        <span>作者：</span>
                        <span>{cur.fArticleAuthor}</span>
                        <span>期刊：</span>
                        <span>{cur.fArticleBook}</span>
                        <span>来源：</span>
                        <span>{cur.fJobName}</span>
                      </div>
                    ):(
                      <div>
                        <span>发布时间：</span>
                        <span>{(cur.fFetchtime || "").split(" ").splice(0,1)}</span>
                        <span>来源：</span>
                        <span>{cur.fJobName}</span>
                      </div>
                    )))
                }
              </div>
              <div className="topic-content-check-item-click fr">
                {topicContact === "4" ? "" :
                  <button type="button" className="read-num">
                    <Icon type="eye"/>
                  </button>
                }
                {topicContact === "4" ? "" :
                  <span>{cur.readnum}</span>
                }
                <button
                  type="button"
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
      <div className="topic-content-check">
        <div className="topic-content-check-top clear">
          <div className="topic-content-check-top-sort fl clear">
            <div className="fl">
              排序：
            </div>
            <div className="fl" ref={(ref) => {this.classSort = ref;}}>
              {sortItem}
              {(subjectThemeSearch) && (
                <button type="button" onClick={() => {return this.sortFunc(3,0,false);}}>
                  <span>相关性</span><Icon type="arrow-down" />
                </button>
              )}
            </div>
          </div>
          <div className="topic-content-check-top-result fr">
            找到{rowCount}条结果
          </div>
        </div>
        {(
          !topicContact
          ||topicContact === "1"
          || topicContact === "2"
          || topicContact === "3"
        ) && (
          <div className="topic-content-check-middle clear">
            <div className="fl clear">
              <Checkbox
                className="fl"
                indeterminate={indeterminate}
                onChange={this.onCheckAllChange}
                checked={checkAll}
              >
                全选
              </Checkbox>
              <div className="topic-content-check-middle-select fl clear">
                <p className="fl">
                  <span>已选：</span>
                  <span>{selectNumber}</span>
                </p>
                <button className="fl" type="button" onClick={this.clearAll}>清除</button>
              </div>
            </div>
            <div className="topic-content-check-download fr">
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
        )}
        {
          fetchSubjectContentListLoading ? <div className="spin"><Spin/></div> :
            <div className="topic-content-check-center">
              {item.length > 0 ? item : <img src={empty} className="noList" alt=""/>}
            </div>
        }
        {!rowCount ? "" :
          <div className="topic-content-check-pagination">
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

export default TopicContentCheck;

