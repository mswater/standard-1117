import React from "react";
import { Icon, Pagination, Spin } from "antd";
import "./index.css";
import { siblings } from "../../../lib/tools/utils";
import empty from "../../../images/empty.png";

const sortArrFirst = [{
  value: "会议时间",
  flag: false,
  id: 1
}, {
  value: "浏览量",
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
class MeetingContentCheck extends React.Component {
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
      meeting:{
        meetingThemeSearch,
        meetingThemeSearchFlag,
        meetingResetButtonFlag
      }
    } = this.props;
    if (meetingResetButtonFlag) {
      const { classSort } = this;
      const arr = classSort.children;
      for (let i = 0; i < arr.length; i += 1) {
        arr[i].style.color = "#515256";
        arr[i].children[1].style.color = "#fff";
      }
      arr[0].style.color = "#0572B8";
      arr[0].children[1].style.color = "#0572B8";
    }
    if(!meetingResetButtonFlag) {
      if (meetingThemeSearchFlag) {
        if(meetingThemeSearch) {
          const { classSort } = this;
          const arr = classSort.children;
          for (let i = 0; i < arr.length; i += 1) {
            arr[i].style.color = "#515256";
            arr[i].children[1].style.color = "#fff";
          }
          arr[arr.length - 1].style.color = "#0572B8";
          arr[arr.length - 1].children[1].style.color = "#0572B8";
        }
        if (!meetingThemeSearch) {
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
      if (!meetingThemeSearchFlag) {
        this.addEvent();
      }
    }
  }

  readingNum = (detailId) =>{
    const {
      fetchArticleDetail
    } =this.props;
    fetchArticleDetail(detailId);
  };


  paginationFunc = (page) => {
    const {
      fetchMeetingList,
      meeting:{
        meetingDateQuery,
        meetingThemeSearch,
        meetingSearchQuery,
        meetingProListFlag,
        meetingLanguageListFlag,
      }
    } = this.props;
    const orderType = localStorage.getItem("meetingOrderType");
    const orderFlag = localStorage.getItem("meetingOrderFlag");
    /* eslint-disable no-nested-ternary */
    const params = {
      searchKey: meetingThemeSearch,
      starTime:meetingDateQuery[0],
      endTime:meetingDateQuery[1],
      webList: meetingProListFlag ? [] : (meetingLanguageListFlag ? [] :
        (meetingSearchQuery === "全部" ? [] : meetingSearchQuery)),
      proList: meetingProListFlag ? (meetingSearchQuery === "全部" ? [] : meetingSearchQuery) : [],
      languageList: meetingLanguageListFlag ? (meetingSearchQuery === "全部" ?
        [] : meetingSearchQuery) : [],
      timeOrder: "",
      browseOrder:"",
      relevantOrder:"",
      pageNum: page,
      pageSize: 10,
    };
    if(orderType === "2"){
      params.browseOrder = orderFlag!=="false" ? "desc" : "asc";
    }
    if(orderType === "3"){
      params.relevantOrder = "desc";
    }
    if(orderType === "1"){
      params.timeOrder = orderFlag!=="false" ? "desc" : "asc";
    }
    fetchMeetingList(params);
  };

  // 收藏文章
  collectArticle = (obj) =>{
    /* eslint-disable no-param-reassign */
    const {
      id,
      iscollect,
    } = obj;
    const {
      fetchArticleCollect,
      fetchArticleCancelCollect,
      fetchMeetingCollect
    } = this.props;
    const item = {
      cid: id,
      type:6,
    };
    if(iscollect === 1){
      return fetchArticleCancelCollect(item, () => {
        obj.iscollect = 0;
        fetchMeetingCollect();
      });
    }
    return fetchArticleCollect(item, () => {
      obj.iscollect = 1;
      fetchMeetingCollect();
    });
  };

  sortFunc = (orderType, idx) =>{
    const {
      fetchMeetingList,
      fetchMeetingThemeSearchFlag,
      fetchMeetingResetButton,
      meeting:{
        meetingDateQuery,
        meetingThemeSearch,
        meetingSearchQuery,
        meetingProListFlag,
        meetingLanguageListFlag,
      }
    } = this.props;
    /* eslint-disable no-nested-ternary */
    /* eslint-disable array-callback-return */
    const sortArr = sortArrFirst;
    if (orderType !== 3) {
      // 判断当前点击的
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
      searchKey: meetingThemeSearch,
      starTime:meetingDateQuery[0],
      endTime:meetingDateQuery[1],
      webList: meetingProListFlag ? [] : (meetingLanguageListFlag ? [] :
        (meetingSearchQuery === "全部" ? [] : meetingSearchQuery)),
      proList: meetingProListFlag ? (meetingSearchQuery === "全部" ? [] : meetingSearchQuery) : [],
      languageList: meetingLanguageListFlag ? (meetingSearchQuery === "全部" ?
        [] : meetingSearchQuery) : [],
      timeOrder: "",
      browseOrder:"",
      relevantOrder:"",
      pageNum: 1,
      pageSize: 10,
    };
    if(orderType === 2){
      params.browseOrder = !sortArr[this.sort_index].flag ? "desc" : "asc";
    }
    if(orderType === 3){
      params.relevantOrder = "desc";
    }
    if(orderType === 1){
      params.timeOrder = !sortArr[this.sort_index].flag ? "desc" : "asc";
    }

    fetchMeetingResetButton(false);
    fetchMeetingThemeSearchFlag(false);
    fetchMeetingList(params);
    localStorage.setItem("meetingOrderType",orderType);
    localStorage.setItem("meetingOrderFlag",sortArr[this.sort_index].flag);
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
      meeting:{
        fetchMeetingListLoading,
        meetingThemeSearch,
        meetingData:{
          page:{
            resultList,
            rowCount,
            pageNow
          }
        }
      }
    } = this.props;
    const username = localStorage.getItem("username");
    const sortArr = sortArrFirst;
    const item = resultList && resultList.map((cur, index) => {
      return (
        <div className="meeting-content-check-item" key={index.toString()}>
          <div
            className="meeting-content-check-item-title"
            onClick={() => {return this.readingNum(cur.id);}}
          >
            <a
              href={cur.fPageUrl}
              target="_blank"
              rel="noopener noreferrer"
              dangerouslySetInnerHTML={{ __html:cur.fArticleTitle}}
              className="meeting-content-title-link"
            />
          </div>
          <div
            className="meeting-content-check-item-text"
            onClick={() => {return this.readingNum(cur.id);}}
          >
            <a
              href={cur.fPageUrl}
              target="_blank"
              rel="noopener noreferrer"
              title={cur.fArticleContent}
              className="meeting-content-address"
              dangerouslySetInnerHTML={{ __html:`${cur.fArticleContent}${"..."}`}}
            />
          </div>
          <div className="meeting-content-check-item-bottom clear">
            <div className="meeting-content-info fl">
              <span>会议时间：</span>
              <span>{(cur.onlineTime || "").split(" ").splice(0,1)}</span>
              <span>会议地址：</span>
              <span
                className="meeting-address"
                dangerouslySetInnerHTML={{ __html:cur.fArticleAddress}}
              />
              <span>来源：</span>
              <span>{cur.fJobName}</span>
            </div>
            <div className="meeting-content-check-item-click fr">
              <button type="button" className="read-num">
                <Icon type="eye"/>
              </button>
              <span>{cur.readnum}</span>
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
              )}
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
      <div className="meeting-content-check">
        <div className="meeting-content-check-top clear">
          <div className="meeting-content-check-top-sort fl clear">
            <div className="fl">
              排序：
            </div>
            <div className="fl" ref={(ref) => {this.classSort = ref;}}>
              {sortItem}
              {(meetingThemeSearch) && (
                <button type="button" onClick={() => {return this.sortFunc(3,0);}}>
                  <span>相关性</span><Icon type="arrow-down" />
                </button>
              )}
            </div>
          </div>
          <div className="meeting-content-check-top-result fr">
            找到{rowCount}条结果
          </div>
        </div>
        {
          fetchMeetingListLoading ? <div className="spin"><Spin/></div> :
            <div className="meeting-content-check-center">
              {item.length > 0 ? item : <img src={empty} className="noList" alt=""/> }
            </div>
        }
        {!rowCount ? "" :
          <div className="meeting-content-check-pagination">
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

export default MeetingContentCheck;
