import React from "react";
import { Pagination, Spin } from "antd";
import empty from "../../../images/empty.png";
import "./index.css";


/* eslint-disable no-nested-ternary */
function itemRender(current, type, originalElement){
  if (type === "prev") {
    return <a>&lt;上一页</a>;
  } if (type === "next") {
    return <a>下一页&gt;</a>;
  }
  return originalElement;
}
class AnalysisContentCheck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
  }

  toAnalyseDetails = (analyseId) => {
    const url = window.location.origin;
    window.open(`${url}/detail/${analyseId}`,"_blank");
  };

  // 分页
  paginationFunc = (page) => {
    const {
      fetchAnalyseContentList,
      analyse:{
        analyseTypeName,
        analyseMenuKey,
        analyseMenuAndTypeData: {
          id
        }
      }
    } = this.props;
    const params = {
      pid:id,
      cid: analyseMenuKey,
      type: analyseTypeName,
      pageNum: page,
      pageSize: 10,
    };
    fetchAnalyseContentList(params);
  };

  render() {
    const {
      analyse: {
        fetchAnalyseContentListLoading,
        analyseTypeName,
        analyseContentListData:{
          resultList,
          rowCount,
          pageNow
        }
      },
    } = this.props;
    const item = resultList && resultList.map((cur, index) => {
      return (
        <div className="analysis-content-check-item" key={index.toString()}>
          {
            (analyseTypeName === "资讯" ||
              analyseTypeName === "微博" ||
              analyseTypeName === "微信" ||
              analyseTypeName === "公告") ?
              (
                <div className="analysis-title-container">
                  <span
                    className="analysis-title"
                    dangerouslySetInnerHTML={{
                      __html: cur.fArticleTitle || cur.title
                    }}
                    onClick={() => {return this.toAnalyseDetails(cur.id);}}
                  />
                  <div
                    className="analysis-content-check-item-text"
                    title={cur.fArticleIntroduction}
                    onClick={() => {return this.toAnalyseDetails(cur.id);}}
                    dangerouslySetInnerHTML={{ __html:`${cur.fArticleIntroduction}${"..."}`}}
                  />
                </div>
              ):(
                <div className="analysis-title-container">
                  <a
                    href={cur.pageUrl || cur.fPageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="analysis-content-title-link"
                  >
                    <span
                      className="analysis-title"
                      dangerouslySetInnerHTML={{
                        __html: cur.fArticleTitle || cur.title
                      }}
                    />
                  </a>
                  <a
                    href={cur.pageUrl || cur.fPageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="analysis-content-title-link-details"
                  >
                    <div
                      className="analysis-content-check-item-text"
                      title={cur.fArticleIntroduction|| cur.summary}
                      dangerouslySetInnerHTML={{ __html:
                          `${cur.fArticleIntroduction|| cur.summary}${"..."}`
                      }}
                    />
                  </a>
                </div>
              )}
          <div className="analysis-content-check-item-bottom clear">
            {
              (analyseTypeName === "资讯" ||
                analyseTypeName === "微博" ||
                analyseTypeName === "微信" ||
                analyseTypeName === "公告") ?
                (
                  <div className="fl">
                    <div className="analyse-box">
                      <span>发布时间：</span>
                      <span>{(cur.fFetchtime || "").split(" ").splice(0,1)}</span>
                      <span>来源：</span>
                      <span>{cur.fJobName}</span>
                    </div>
                  </div>
                ):(
                  (analyseTypeName === "期刊文献") ?
                    (
                      <div className="fl">
                        <div className="analyse-box">
                          <span>发表时间：</span>
                          <span>{(cur.time|| "").split(" ").splice(0,1)}</span>
                          <span>作者：</span>
                          <span className="analyse_author">
                            <a href="#" title={cur.author}>
                              {cur.author}
                            </a>
                          </span>
                          <span>期刊：</span>
                          <span className="analyse_source">
                            <a href="#" title={cur.source}>
                              {cur.source}
                            </a>
                          </span>
                        </div>
                      </div>
                    ) :(
                      (analyseTypeName === "会议文献") ?
                        (
                          <div className="fl">
                            <div className="analyse-box">
                              <span>发表时间：</span>
                              <span>{(cur.time|| "").split(" ").splice(0,1)}</span>
                              <span>作者：</span>
                              <span className="analyse_author">
                                <a href="#" title={cur.author}>
                                  {cur.author}
                                </a>
                              </span>
                              <span>会议：</span>
                              <span className="analyse_source">
                                <a href="#" title={cur.source}>
                                  {cur.source}
                                </a>
                              </span>
                            </div>
                          </div>
                        ) :(
                          <div className="fl">
                            <div className="analyse-box">
                              <span>发表时间：</span>
                              <span>{(cur.onlineTime|| "").split(" ").splice(0,1)}</span>
                              <span>作者：</span>
                              <span className="analyse_author">
                                <a href="#" title={cur.fArticleAuthor}>
                                  {cur.fArticleAuthor}
                                </a>
                              </span>
                              <span>期刊：</span>
                              <span className="analyse_source">
                                <a href="#" title={cur.fArticleBook}>
                                  {cur.fArticleBook}
                                </a>
                              </span>
                              <span>来源：</span>
                              <span className="analyse_jobname">{cur.fJobName}</span>
                            </div>
                          </div>
                        )
                    )
                )}
          </div>
        </div>
      );
    });
    return (
      <div className="analysis-content-check">
        {
          fetchAnalyseContentListLoading ? <div className="analyse-spin"><Spin/></div> :
            <div className="analysis-content-check-center">
              {item.length > 0 ? item : <img src={empty} className="noList" alt=""/>}
            </div>
        }
        {!rowCount ? "" :
          <div className="analysis-content-check-pagination">
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

export default AnalysisContentCheck;
