import React from "react";
import { Icon, Pagination, Spin } from "antd";

import "./index.css";
import { siblings } from "../../../lib/tools/utils";
import empty from "../../../images/empty.png";

/* eslint-disable no-nested-ternary */
function itemRender(current, type, originalElement){
  if (type === "prev") {
    return <a>&lt;上一页</a>;
  } if (type === "next") {
    return <a>下一页&gt;</a>;
  }
  return originalElement;
}

class TabsContent extends React.Component {

  componentDidMount () {
    this.addEvent();
  }

  componentDidUpdate() {
    const {
      article:{
        fetchArticleLabelListLoading,
        labelListData:{
          typeList,
        }
      }
    } = this.props;
    if (!fetchArticleLabelListLoading && typeList.length > 0) {
      this.addEvent();
    }
  }

  toTabDetails = (detailId) => {
    const url = window.location.origin;
    window.open(`${url}/detail/${detailId}`,"_blank");
  };

  // 分页
  paginationFunc = (page) => {
    const {
      fetchArticleLabelList,
      article:{
        tabsTypeName,
        labelListData:{
          label
        },
      }
    } = this.props;
    const params = {
      label,
      type:tabsTypeName,
      pageNum: page,
      pageSize: 10
    };
    fetchArticleLabelList(params);
  };

  // 收藏文章
  collectArticle = (obj) =>{
    /* eslint-disable no-param-reassign */
    const {
      id,
      iscollect
    } = obj;
    const {
      fetchArticleCollect,
      fetchArticleCancelCollect,
      article:{
        tabsTypeName,
      }
    } = this.props;

    const item ={
      cid:id,
      type:tabsTypeName === "资讯" ? 1 :
        (
          (tabsTypeName === "微博") ? 2 :
            (
              (tabsTypeName === "微信") ? 3:
                (
                  (tabsTypeName === "会议") ? 6:
                    (
                      (tabsTypeName === "国内文献") ? 4:
                        (tabsTypeName === "海外文献") ? 5: 1
                    )
                )
            )
        ),
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

  contactFunc = (typeName) => {
    const {
      history,
      fetchArticleLabelList,
      fetchTabsTypeName,
      article:{
        labelListData:{
          label
        },
      }
    } = this.props;
    const params = {
      label,
      type:typeName.type ,
      pageNum: 1,
      pageSize: 10
    };
    history.push("/details/tabs");
    fetchTabsTypeName(typeName.type);
    fetchArticleLabelList(params);
  };

  checkType() {
    /* eslint-disable no-param-reassign */
    siblings(this).forEach((item, index, arr) => {
      arr[index].style.color = "#343539";
      arr[index].style.borderBottom = "transparent";
    });
    this.style.color = "#0572B8";
    this.style.borderBottom = "1px solid #0572B8";
  }

  addEvent() {
    const { classTabs } = this;
    const arr = classTabs.children;
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
      article:{
        fetchArticleLabelListLoading,
        tabsTypeName,
        labelListData:{
          page:{
            resultList,
            rowCount,
            pageNow
          },
          typeList,
          total,
        }
      }
    } =this.props;
    const tabsTitle = localStorage.getItem("tabsTitle");
    const tabTypes = typeList && typeList.map((cur,index) => {
      return(
        <button
          type="button"
          key={index.toString()}
          onClick={() => {return this.contactFunc(cur);}}
        >
          {cur.type}({cur.count})
        </button>
      );
    });
    const item = resultList && resultList.map((cur, index) => {
      return (
        <div className="hot-tabs-list" key={index.toString()}>
          {
            (tabsTypeName === "资讯" ||
            tabsTypeName === "微博" ||
            tabsTypeName === "微信") ?
              (
                <div>
                  <div
                    className="hot-tabs-list-title"
                    onClick={() => {
                      return this.toTabDetails(cur.id);
                    }}
                    dangerouslySetInnerHTML={{ __html: cur.title || cur.fArticleTitle }}
                  />
                  <div
                    className="hot-tabs-list-text"
                    onClick={() => {
                      return this.toTabDetails(cur.id);
                    }}
                    title={cur.summary || cur.fArticleIntroduction}
                    dangerouslySetInnerHTML={{ __html: cur.summary || cur.fArticleIntroduction }}
                  />
                </div>
              ):(
                <a
                  href={cur.pageUrl||cur.fPageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tab-content-title-link"
                >
                  <div
                    className="hot-tabs-list-title"
                    dangerouslySetInnerHTML={{ __html: cur.title || cur.fArticleTitle }}
                  />
                  <div
                    className="hot-tabs-list-text"
                    title={cur.summary || cur.fArticleContent}
                    dangerouslySetInnerHTML={{ __html: cur.summary || cur.fArticleContent }}
                  />
                </a>
              )}
          <div className="hot-tabs-list-bottom clear">
            {
              (tabsTypeName === "资讯" ||
                tabsTypeName === "微博" ||
                tabsTypeName === "微信") ?
                (
                  <div className="fl">
                    <span>发布时间：</span>
                    <span>{(cur.fArticleTime || "").split(" ").splice(0,1)}</span>
                    <span>来源：</span>
                    <span>{cur.fJobName}</span>
                  </div>
                ) :
                (
                  (tabsTypeName === "会议") ?
                    (
                      <div className="fl">
                        <div className="tabs-box">
                          <span>会议时间：</span>
                          <span>{(cur.onlineTime || "").split(" ").splice(0,1)}</span>
                          <span>会议地点：</span>
                          <span className="tabs_address">
                            <a href="#" title={cur.fArticleAddress}>
                              {cur.fArticleAddress}
                            </a>
                          </span>
                          <span>来源：</span>
                          <span>{cur.fJobName}</span>
                        </div>
                      </div>
                    ) :
                    (
                      (tabsTypeName === "国内文献") ?
                        (
                          <div className="fl">
                            <div className="tabs-box">
                              <span>发表时间：</span>
                              <span>{(cur.time || "").split(" ").splice(0,1)}</span>
                              <span>作者：</span>
                              <span>{cur.author}</span>
                              <span>{cur.type==="期刊" ? "期刊" : "会议"}：</span>
                              <span className="tabs_source">
                                <a href="#" title={cur.source}>
                                  {cur.source}
                                </a>
                              </span>
                            </div>
                          </div>
                        ) : (
                          <div className="fl">
                            <div className="tabs-box">
                              <span>发表时间：</span>
                              <span>{(cur.time || "").split(" ").splice(0,1)}</span>
                              <span>作者：</span>
                              <span>{cur.author}</span>
                              <span>期刊：</span>
                              <span className="tabs_source">
                                <a href="#" title={cur.source}>
                                  {cur.source}
                                </a>
                              </span>
                              <span>来源：</span>
                              <span>{cur.fJobName}</span>
                            </div>
                          </div>
                        )
                    )
                )
            }
            <div className="fr">
              {tabsTypeName === "国内文献" ? "" :
                <button type="button" className="read-num">
                  <Icon type="eye"/>
                </button>
              }
              {tabsTypeName === "国内文献" ? "" :
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
        </div>
      );
    });
    return (
      <div className="hot-tabs-content">
        <div className="hot-tabs-content-title">
          <span>有</span>
          <i>{total}</i>
          <span>篇提到</span>
          <span>{tabsTitle || ""}</span>
        </div>
        <div className="hot-tabs-btn" ref={(ref) => {this.classTabs = ref;}}>
          {tabTypes}
        </div>
        {
          fetchArticleLabelListLoading ? <div className="tabs-spin"><Spin/></div> :
            <div className="hot-tabs-center">
              {item.length > 0 ? item : <img src={empty} className="noList" alt=""/>}
            </div>
        }
        {!rowCount ? "" :
          <div className="hot-tabs-center-pagination">
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

export default TabsContent;



