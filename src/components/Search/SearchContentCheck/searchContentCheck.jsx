import React from "react";
import { Checkbox, Icon, message, Modal, Pagination, Spin } from "antd";
import "./index.css";
import { siblings } from "../../../lib/tools/utils";
import empty from  "../../../images/empty.png";

const CheckboxGroup = Checkbox.Group;
const sortArrFirst = [{
  value: "发布时间",
  flag: null,
  id: 1
}, {
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
class SearchContentCheck extends React.Component {
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
    /* eslint-disable  no-nested-ternary */
    const searchContact = localStorage.getItem("searchContact");
    const sortArr = searchContact === "2" ?
      sortArrSecond : ((searchContact === "4" || searchContact === "5")
        ? sortArrThird : sortArrFirst);
    sortArr[0].flag = false;
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
    this.addEvent();
    if(searchThemeSearchFlag || searchResetButtonFlag){
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
    const { classSort } = this;
    const arr = classSort.children;
    const searchContact = localStorage.getItem("searchContact");
    if (searchThemeSearchFlag) {
      if(headerSearchContent !== "" && searchContact !== "4" && searchContact !== "5") {
        for (let i = 0; i < arr.length; i += 1) {
          arr[i].style.color = "#515256";
          arr[i].children[1].style.color = "#fff";
        }
        arr[arr.length - 1].style.color = "#0572B8";
        arr[arr.length - 1].children[1].style.color = "#0572B8";
      }else{
        for (let i = 0; i < arr.length; i += 1) {
          arr[i].style.color = "#515256";
          arr[i].children[1].style.color = "#fff";
        }
        arr[0].style.color = "#0572B8";
        arr[0].children[1].style.color = "#0572B8";
        const sortArr = searchContact === "2" ?
          sortArrSecond : ((searchContact === "4" || searchContact === "5")
            ? sortArrThird : sortArrFirst);
        sortArr[0].flag = false;
      }
    }
  }

  componentWillUnmount(){
    for(let i = 0; i < sortArrFirst.length;){
      sortArrFirst[i].flag = null;
      i += 1;
    }
    for(let i = 0; i < sortArrSecond.length;){
      sortArrSecond[i].flag = null;
      i += 1;
    }
    for(let i = 0; i < sortArrThird.length;){
      sortArrThird[i].flag = null;
      i += 1;
    }
  }

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
    const searchContact = localStorage.getItem("searchContact");
    if(searchContact === "4" || searchContact === "5") {
      localStorage.setItem("articleType", (9 - Number(searchContact)).toString());
    }else if(searchContact === "9"){
      localStorage.setItem("articleType", "2");
    }else{
      localStorage.setItem("articleType", "1");
    }
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
    // 如果是游客身份，只能看前50页数据
    const username = localStorage.getItem("username");
    const renderSearchContact = localStorage.getItem("searchContact");
    if(username === "guest" && page > 50 &&
      (renderSearchContact === "4" || renderSearchContact === "5")){
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
    }else{
      const {
        fetchSearch,
        headerSearchContent,
        search:{
          searchDateQuery,
          searchSearchQuery,
          searchProListFlag,
          searchWeiboTypeFlag,
          searchLanguageTypeFlag,
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
          (searchLanguageTypeFlag ? [] : ((searchSearchQuery.length > 0) ?
            searchSearchQuery : []))),
        proList: searchWeiboTypeFlag ? [] :(searchProListFlag ?
          ((searchSearchQuery.length > 0) ? searchSearchQuery : []) : []),
        languageList: searchLanguageTypeFlag ?
          ((searchSearchQuery.length > 0) ? searchSearchQuery : []) : [],
        timeOrder: "",
        browseOrder: "",
        relevantOrder: "",
        transpondOrder: "",
        commentOrder: "",
        likeOrder: "",
        mettingOrder: "",
        scoreOrder: "",
        timeOrder1: "",
        blogType:null,
        pageNum: page,
        pageSize: 10
      };
      if(orderType === "1"){
        params.timeOrder = orderFlag==="false" ? "desc" : "asc";
      }
      if(orderType === "2"){
        params.browseOrder = orderFlag==="false" ? "desc" : "asc";
      }
      if(orderType === "3"){
        params.relevantOrder = "desc";
      }
      if(orderType === "4"){
        params.transpondOrder = orderFlag==="false" ? "desc" : "asc";
      }
      if(orderType === "5"){
        params.commentOrder = orderFlag==="false" ? "desc" : "asc";
      }
      if(orderType === "6"){
        params.likeOrder =  orderFlag==="false" ? "desc" : "asc";
      }
      if(orderType === "7"){
        params.mettingOrder = orderFlag==="false" ? "desc" : "asc";
      }
      if(orderType === "8"){ // 检索评分
        params.scoreOrder = orderFlag==="false" ? "desc" : "asc";
      }
      if(orderType === "9"){ // 发表年份
        params.timeOrder = orderFlag==="false" ? "desc" : "asc";
      }
      if(orderType === "10"){ // 创建时间
        params.timeOrder1 = orderFlag==="false" ? "desc" : "asc";
      }
      fetchSearch(params);
    }
  };

  // 收藏文章
  collectArticle = (obj) =>{
    /* eslint-disable no-param-reassign */
    const {
      id,
      gid,
      iscollect,
      fileName
    } = obj;
    const {
      fetchArticleCollect,
      fetchArticleCancelCollect,
    } = this.props;
    let item;
    const searchContact = localStorage.getItem("searchContact");
    if((searchContact === "4" || searchContact === "5")){
      item = {
        cid:gid,
        type:Number(searchContact),
      };
    }else if(searchContact === "9"){
      item = {
        cid:fileName,
        type:Number(searchContact),
      };
    }else{
      item = {
        cid:id,
        type:Number(searchContact),
      };
    }
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
        searchWeiboTypeFlag,
        searchLanguageTypeFlag,
      }
    } = this.props;
    /* eslint-disable no-nested-ternary */
    const searchContact = localStorage.getItem("searchContact");
    const sortArr = searchContact === "2" ?
      sortArrSecond : ((searchContact === "4" || searchContact === "5")
        ? sortArrThird : sortArrFirst);
    let orderFlag;
    if (orderType !== 3) {
      sortArr.map((cur, index) => {
        if(index === idx){
          if(cur.flag !== null){
            cur.flag = !cur.flag;
          }else{
            cur.flag = false;
          }
          orderFlag = cur.flag;
        }else{
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
      type:Number(searchContact),
      starTime: searchDateQuery[0],
      endTime: searchDateQuery[1],
      searchKey: headerSearchContent,
      webList: searchWeiboTypeFlag ? [] :(searchProListFlag ? [] :
        (searchLanguageTypeFlag ? [] : ((searchSearchQuery.length > 0) ?
          searchSearchQuery : []))),
      proList: searchWeiboTypeFlag ? [] :(searchProListFlag ?
        ((searchSearchQuery.length > 0) ? searchSearchQuery : []) : []),
      languageList: searchLanguageTypeFlag ?
        ((searchSearchQuery.length > 0) ? searchSearchQuery : []) : [],
      timeOrder: "",
      browseOrder: "",
      relevantOrder: "",
      transpondOrder: "",
      commentOrder: "",
      likeOrder: "",
      mettingOrder: "",
      scoreOrder: "",
      timeOrder1: "",
      blogType:null,
      pageNum: 1,
      pageSize: 10
    };
    if(orderType === 1){
      params.timeOrder = !orderFlag ? "desc" : "asc";
    }
    if(orderType === 2){
      params.browseOrder = !orderFlag ? "desc" : "asc";
    }
    if(orderType === 3){
      params.relevantOrder = "desc";
    }
    if(orderType === 4){
      params.transpondOrder = !orderFlag ? "desc" : "asc";
    }
    if(orderType === 5){
      params.commentOrder = !orderFlag ? "desc" : "asc";
    }
    if(orderType === 6){
      params.likeOrder =  !orderFlag ? "desc" : "asc";
    }
    if(orderType === 7){
      params.mettingOrder = !orderFlag ? "desc" : "asc";
    }
    if(orderType === 8){
      params.scoreOrder = !orderFlag ? "desc" : "asc";
    }
    if(orderType === 9){
      params.timeOrder = !orderFlag ? "desc" : "asc";
    }
    if(orderType === 10){
      params.timeOrder1 = !orderFlag ? "desc" : "asc";
    }
    fetchSearchResetButton(false);
    fetchSearchThemeSearchFlag(false);
    fetchSearch(params);
    localStorage.setItem("searchOrderType",Number(orderType));
    localStorage.setItem("searchOrderFlag",orderFlag);
  };

  readingNum = (detailId) =>{
    const {
      fetchArticleDetail
    } =this.props;
    fetchArticleDetail(detailId);
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
              {(renderSearchContact === "6") ?
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
                : ((renderSearchContact === "4" || renderSearchContact === "5") ? (
                  <span
                    className="search-content-title"
                    onClick={() => {
                      return this.searchDetails(cur.gid);
                    }}
                    dangerouslySetInnerHTML={{ __html: cur.title }}
                  />
                ) : ((renderSearchContact === "9") ? (
                  <span
                    className="search-content-title"
                    onClick={() => {
                      return this.searchDetails(cur.fileName);
                    }}
                    dangerouslySetInnerHTML={{ __html: cur.fArticleTitle }}
                  />
                ) : (
                  <div className="search-content-left fl">
                    {username === "guest" ? "" :
                      (
                        <CheckboxGroup
                          options={[cur.id ? cur.id.toString() : ""]}
                          value={checkedList}
                          onChange={this.onChange}
                        />
                      )
                    }
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
                )))
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
            {(renderSearchContact === "6") ?
              (
                <div
                  className="search-content-check-item-text"
                  onClick={() => {return this.readingNum(cur.id);}}
                >
                  <a
                    href={cur.pageUrl||cur.fPageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <p
                      title={cur.fArticleIntroduction||cur.summary}
                      dangerouslySetInnerHTML={{ __html:
                          `${cur.fArticleIntroduction||cur.summary}${"..."}`}}
                    />
                  </a>
                </div>
              )
              : ((renderSearchContact === "4" || renderSearchContact === "5") ? (
                <div
                  className="search-content-check-item-text"
                  onClick={() => {return this.searchDetails(cur.gid);}}
                >
                  <p
                    title={cur.abstract}
                    dangerouslySetInnerHTML={{ __html:
                        `${cur.abstract}${"..."}`
                    }}
                  />
                </div>
              ) : (renderSearchContact === "9" ? (
                <div
                  className="search-content-check-item-text"
                  onClick={() => {return this.searchDetails(cur.fileName);}}
                >
                  <p
                    title={cur.fArticleIntroduction}
                    dangerouslySetInnerHTML={{ __html:
                        `${cur.fArticleIntroduction}${"..."}`
                    }}
                  />
                </div>
              ) : (
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
              )))
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
                  (renderSearchContact === "4" || renderSearchContact === "5") ?
                    (
                      <div>
                        <div className="search_box">
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
                    ))
                }
              </div>
              { /* eslint-disable no-nested-ternary */ }
              <div className="search-content-check-item-click fr">
                {(renderSearchContact === "4" || renderSearchContact === "5") ? "" :
                  <button type="button" className="read-num">
                    <Icon type="eye"/>
                  </button>
                }
                {(renderSearchContact === "4" || renderSearchContact === "5") ? "" :
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
              {(headerSearchContent !== "" &&
                renderSearchContact !== "4" &&
                renderSearchContact !== "5") && (
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
