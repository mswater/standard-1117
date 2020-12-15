import React from "react";
import { Checkbox, Icon, message, Pagination, Spin } from "antd";
import "./index.css";
import { siblings } from "../../../lib/tools/utils";
import empty from  "../../../images/empty.png";

const CheckboxGroup = Checkbox.Group;
const sortArrFirst = [{
  value: "发布时间",
  flag: false,
  id: 1
}, {
  value: "浏览量",
  flag: false,
  id: 2
}];
const sortArrSecond = [{
  value: "发布时间",
  flag: false,
  id: 1
},{
  value: "浏览量",
  flag: false,
  id: 2
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
// 国内文献，海外文献 排序方式  searchContact = 4 或者 searchContact = 5
const sortArrThird = [{
  value: "检索评分",
  flag: false,
  id: 1
}, {
  value: "发表年份",
  flag: false,
  id: 2
}];
function itemRender(current, type, originalElement){
  if (type === "prev") {
    return <a>&lt;上一页</a>;
  } if (type === "next") {
    return <a>下一页&gt;</a>;
  }
  return originalElement;
}
class SearchContentCheck extends React.Component {
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
      search:{
        searchData:{
          timeCompare:nextTimeCompare,
          page:{
            resultList: currentResultList,
          }
        }
      }
    } = nextProps;
    const {
      search:{
        searchData:{
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
    /* eslint-disable  no-nested-ternary */
    const {
      headerSearchContent,
      search:{
        searchThemeSearchFlag,
        searchResetButtonFlag
      }
    } = this.props;
    if (searchResetButtonFlag) {
      const searchContact = localStorage.getItem("searchContact");
      const sortArr = searchContact === "2" ?
        sortArrSecond : ((searchContact === "4" || searchContact === "5")
          ? sortArrThird : sortArrFirst);
      this.addEvent();
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
    if(!searchResetButtonFlag) {
      if (searchThemeSearchFlag) {
        if(headerSearchContent) {
          const { classSort } = this;
          const arr = classSort.children;
          for (let i = 0; i < arr.length; i += 1) {
            arr[i].style.color = "#515256";
            arr[i].children[1].style.color = "#fff";
          }
          arr[arr.length - 1].style.color = "#0572B8";
          arr[arr.length - 1].children[1].style.color = "#0572B8";
        }
        if (!headerSearchContent) {
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
      if (!searchThemeSearchFlag) {
        this.addEvent();
      }
    }
  }


  readingNum = (detailId) =>{
    const {
      fetchArticleDetail
    } = this.props;
    fetchArticleDetail(detailId);
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
      search:{
        searchData:{
          page:{
            resultList,
          }
        }
      }
    } = this.props;
    this.setState({
      checkedList: e.target.checked ? this.optionsFunc(resultList) : [],
      indeterminate: false,
      checkAll: e.target.checked,
      selectNumber: e.target.checked ?this.optionsFunc(resultList).length : 0
    });
  };

  searchDetails = (detailId) => {
    const url = window.location.origin;
    window.open(`${url}/detail/${detailId}`,"_blank");
  };

  onChange = (checkedList) => {
    const {
      search:{
        searchData:{
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

  // 批量下载
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
      fetchSearch,
      headerSearchContent,
      search:{
        searchDateQuery,
        searchSearchQuery,
        searchProListFlag,
        searchWeiboTypeFlag
      }
    } = this.props;
    /* eslint-disable no-nested-ternary */
    const searchContact = localStorage.getItem("searchContact");
    const orderType = localStorage.getItem("searchOrderType");
    const orderFlag = localStorage.getItem("searchOrderFlag");
    const params = {
      type:!Number(searchContact) ? 1 : Number(searchContact),
      starTime: searchDateQuery[0],
      endTime: searchDateQuery[1],
      searchKey: headerSearchContent,
      webList: searchWeiboTypeFlag ? [] :(searchProListFlag ? [] :
        (searchSearchQuery!==[] ? (searchSearchQuery === "全部" ?
          [] : searchSearchQuery) : [])),
      proList: searchWeiboTypeFlag ? [] :(searchProListFlag ?
        (searchSearchQuery!==[] ? (searchSearchQuery === "全部" ?
          [] : searchSearchQuery) : []) : []),
      timeOrder: "",
      browseOrder: "",
      relevantOrder: "",
      transpondOrder: "",
      commentOrder: "",
      likeOrder: "",
      mettingOrder: "",
      blogType:null,
      pageNum: page,
      pageSize: 10
    };
    if(orderType === "1"){
      params.timeOrder = orderFlag!=="false" ? "desc" : "asc";
    }
    if(orderType === "2"){
      params.browseOrder = orderFlag!=="false" ? "desc" : "asc";
    }
    if(orderType === "3"){
      params.relevantOrder = "desc";
    }
    if(orderType === "4"){
      params.transpondOrder = orderFlag!=="false" ? "desc" : "asc";
    }
    if(orderType === "5"){
      params.commentOrder = orderFlag!=="false" ? "desc" : "asc";
    }
    if(orderType === "6"){
      params.likeOrder =  orderFlag!=="false" ? "desc" : "asc";
    }
    if(orderType === "7"){
      params.mettingOrder = orderFlag!=="false" ? "desc" : "asc";
    }
    fetchSearch(params);
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
    const searchContact = localStorage.getItem("searchContact");
    const item ={
      cid:id || fileName,
      type:Number(searchContact),
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
      search:{
        searchData:{
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
      fetchSearch,
      headerSearchContent,
      fetchSearchThemeSearchFlag,
      fetchSearchResetButton,
      search:{
        searchDateQuery,
        searchSearchQuery,
        searchProListFlag,
        searchWeiboTypeFlag
      }
    } = this.props;
    /* eslint-disable no-nested-ternary */
    const searchContact = localStorage.getItem("searchContact");
    const sortArr = searchContact === "2" ?
      sortArrSecond : ((searchContact === "4" || searchContact === "5")
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
      type:Number(searchContact),
      starTime: searchDateQuery[0],
      endTime: searchDateQuery[1],
      searchKey: headerSearchContent,
      webList: searchWeiboTypeFlag ? [] :(searchProListFlag ? []
        :(searchSearchQuery!==[] ? (searchSearchQuery === "全部" ?
          [] : searchSearchQuery) : [])),
      proList: searchWeiboTypeFlag ? [] :(searchProListFlag ?
        (searchSearchQuery!==[] ? (searchSearchQuery === "全部" ?
          [] : searchSearchQuery) : []) : []),
      timeOrder: "",
      browseOrder: "",
      relevantOrder: "",
      transpondOrder: "",
      commentOrder: "",
      likeOrder: "",
      mettingOrder: "",
      blogType:null,
      pageNum: 1,
      pageSize: 10
    };
    if(orderType === 1){
      params.timeOrder = !sortArr[this.sort_index].flag ? "desc" : "asc";
    }
    if(orderType === 2){
      params.browseOrder = !sortArr[this.sort_index].flag ? "desc" : "asc";
    }
    if(orderType === 3){
      params.relevantOrder = "desc";
    }
    if(orderType === 4){
      params.transpondOrder = !sortArr[this.sort_index].flag ? "desc" : "asc";
    }
    if(orderType === 5){
      params.commentOrder = !sortArr[this.sort_index].flag ? "desc" : "asc";
    }
    if(orderType === 6){
      params.likeOrder =  !sortArr[this.sort_index].flag ? "desc" : "asc";
    }
    if(orderType === 7){
      params.mettingOrder = !sortArr[this.sort_index].flag ? "desc" : "asc";
    }
    fetchSearchResetButton(false);
    fetchSearchThemeSearchFlag(false);
    fetchSearch(params);
    localStorage.setItem("searchOrderType",Number(orderType));
    localStorage.setItem("searchOrderFlag",sortArr[this.sort_index].flag);
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
    const { indeterminate, checkAll, checkedList, selectNumber} = this.state;
    const renderSearchContact = localStorage.getItem("searchContact");
    const sortArr = renderSearchContact === "2" ?
      sortArrSecond : ((renderSearchContact === "4" || renderSearchContact === "5")
        ? sortArrThird : sortArrFirst);
    const {
      search:{
        fetchSearchLoading,
        searchData:{
          page:{
            resultList,
            rowCount,
            pageNow
          }
        }
      },
      headerSearchContent,
      article:{
        sameListData
      }
    } = this.props;
    const sameList =sameListData
      && sameListData.map((cur,index) => {
        return(
          <li key={index.toString()}>
            <span
              onClick={() => {return this.searchDetails(cur.id);}}
            >
              <b />
              {cur.fArticleTitle}
            </span>
            <span>发布时间：{(cur.fFetchtime|| "").split(" ").splice(0,1)}</span>
            <span>来源：{cur.fJobName}</span>
          </li>
        );
      });
    const item = this.resultListFunc(resultList)
      && this.resultListFunc(resultList).map((cur, index) => {
        return (
          <div className="search-content-check-item" key={index.toString()}>
            <div className="search-content-check-item-title clear">
              {(
                renderSearchContact === "4"
                || renderSearchContact === "5"
                || renderSearchContact === "6"
              ) ?
                <a
                  href={cur.pageUrl || cur.fPageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="search-content-title-link"
                  onClick={() => {return this.readingNum(cur.id);}}
                >
                  <span
                    dangerouslySetInnerHTML={{
                      __html: cur.fArticleTitleColour || cur.title
                    }}
                  />
                </a>
                :
                <div className="search-content-left fl">
                  <CheckboxGroup
                    options={[cur.id ? cur.id.toString() : ""]}
                    value={checkedList}
                    onChange={this.onChange}
                  />
                  <span
                    className="search-content-title"
                    onClick={() => {
                      return this.searchDetails(cur.id);
                    }}
                    dangerouslySetInnerHTML={{
                      __html: cur.fArticleTitleColour
                    }}
                  />
                </div>
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
              renderSearchContact === "5"
              ||  renderSearchContact === "4"
              ||  renderSearchContact === "6"
            ) ?
              (
                <div className="search-content-check-item-text">
                  <a
                    href={cur.pageUrl||cur.fPageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {return this.readingNum(cur.id || cur.fileName);}}
                  >
                    <p
                      title={cur.fArticleIntroduction||cur.summary}
                      dangerouslySetInnerHTML={{ __html:
                          `${cur.fArticleIntroduction||cur.summary}${"..."}`}}
                    />
                  </a>
                </div>
              )
              :
              (
                <div
                  className="search-content-check-item-text"
                  onClick={() => {return this.searchDetails(cur.id);}}
                >
                  <p
                    title={cur.fArticleContent||cur.fullText}
                    dangerouslySetInnerHTML={{ __html:
                        `${cur.fArticleIntroduction|| cur.fullText}${"..."}`
                    }}
                  />
                </div>
              )
            }
            <div className="search-content-check-item-bottom clear">
              <div className="fl">
                { /* eslint-disable no-nested-ternary */ }
                {renderSearchContact === "2" ? (
                  <div>
                    <span>发布时间：</span>
                    <span>{(cur.fFetchtime|| "").split(" ").splice(0,1)}</span>
                    <span>转发</span>
                    <span>{cur.repost||0}</span>
                    <span>评论</span>
                    <span>{cur.comments||0}</span>
                    <span>赞</span>
                    <span>{cur.mlike||0}</span>
                    <span>来源：</span>
                    <span>{cur.fJobName}</span>
                  </div>
                ): (
                  renderSearchContact === "4" ?
                    (
                      <div>
                        <div className="search_box">
                          <span>发表时间：</span>
                          <span>{(cur.time|| "").split(" ").splice(0,1)}</span>
                          <span>作者：</span>
                          <span className="search_author">
                            <a href="#" title={cur.author}>
                              {cur.author}
                            </a>
                          </span>
                          <span>期刊：</span>
                          <span className="search_source">
                            <a href="#" title={cur.source}>
                              {cur.source}
                            </a>
                          </span>
                        </div>
                      </div>
                    )
                    : (renderSearchContact === "5" ? (
                      <div>
                        <div className="search_box">
                          <span>发表时间：</span>
                          <span>{(cur.fFetchtime|| "").split(" ").splice(0,1)}</span>
                          <span>作者：</span>
                          <span className="search_author">
                            <a href="#" title={cur.fArticleAuthor}>
                              {cur.fArticleAuthor}
                            </a>
                          </span>
                          <span>期刊：</span>
                          <span className="search_source">
                            <a href="#" title={cur.fArticleBook}>
                              {cur.fArticleBook}
                            </a>
                          </span>
                          <span>来源：</span>
                          <span>{cur.fJobName}</span>
                        </div>
                      </div>
                    ):(
                      renderSearchContact === "6" ? (
                        <div className="search_container">
                          <div className="search_box">
                            <span>会议时间：</span>
                            <span>{(cur.onlineTime|| "").split(" ").splice(0,1)}</span>
                            <span>会议地点：</span>
                            <span className="search_address">
                              <a href="#" title={cur.fArticleAddress}>
                                {cur.fArticleAddress}
                              </a>
                            </span>
                            <span>来源：</span>
                            <span className="search_source">
                              <a href="#" title={cur.fJobName}>
                                {cur.fJobName}
                              </a>
                            </span>
                          </div>
                        </div>):
                        (
                          <div>
                            <span>发布时间：</span>
                            <span>{(cur.fFetchtime|| "").split(" ").splice(0,1)}</span>
                            <span>来源：</span>
                            <span>{cur.fJobName}</span>
                          </div>
                        )
                    )))
                }
              </div>
              { /* eslint-disable no-nested-ternary */ }
              <div className="search-content-check-item-click fr">
                {renderSearchContact === "4" ? "" :
                  <button type="button" className="read-num">
                    <Icon type="eye"/>
                  </button>
                }
                {renderSearchContact === "4" ? "" :
                  <span>{cur.readnum}</span>
                }
                {username === "guest" ? "" : (
                  <span>
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
      <div className="search-content-check">
        <div className="search-content-check-top clear">
          <div className="search-content-check-top-sort fl clear">
            <div className="fl">
              排序：
            </div>
            <div className="fl" ref={(ref) => {this.classSort = ref;}}>
              {sortItem}
              {(headerSearchContent !== "") && (
                <button type="button" onClick={() => {return this.sortFunc(3,0);}}>
                  <span>相关性</span><Icon type="arrow-down" />
                </button>
              )}
            </div>
          </div>
          <div className="search-content-check-top-result fr">
            找到{rowCount}条结果
          </div>
        </div>
        {(
          !renderSearchContact
          ||renderSearchContact === "1"
          || renderSearchContact === "2"
          || renderSearchContact === "3"
        ) && username !== "guest" && (
          <div className="search-content-check-middle clear">
            <div className="fl clear">
              <Checkbox
                className="fl"
                indeterminate={indeterminate}
                onChange={this.onCheckAllChange}
                checked={checkAll}
              >
                全选
              </Checkbox>
              <div className="search-content-check-middle-select fl clear">
                <p className="fl">
                  <span>已选：</span>
                  <span>{selectNumber}</span>
                </p>
                <button className="fl" type="button" onClick={this.clearAll}>清除</button>
              </div>
            </div>
            <div className="search-content-check-download fr">
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
          fetchSearchLoading ? <div className="spin"><Spin/></div> :
            <div className="search-content-check-center">
              {item.length > 0 ? item : <img src={empty} className="noList" alt=""/>}
            </div>
        }
        {!rowCount ? "" :
          <div className="search-content-check-pagination">
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

export default SearchContentCheck;
