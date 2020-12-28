import React from "react";
import { Spin } from "antd";

import "./index.css";


class DetailsLeft extends React.Component {

  componentDidMount() {
  }

  downloadFile = (downloadUrl) => {
    const url = window.location.origin;
    window.open(`${url}/managecenter/upload/${downloadUrl}`,"_blank");
  }

  render() {
    // 文章类型 = 4 国内  5  国外   表示国内文献和海外文献
    const {match:{params}}=this.props;
    const articleType = params.type;
    const {
      article: {
        articleDetailData,
        fetchArticleDetailLoading
      },
    } = this.props;
    return (
      <div className="hot-details-left">
        { /* eslint-disable no-nested-ternary */ }
        {fetchArticleDetailLoading ?
          <div className="spin"><Spin /></div>: (
            <div>
              {(articleDetailData.gid
                || articleDetailData.id
                || articleDetailData.fileName) &&
              (articleType === "4" || articleType === "5") ?
                (
                  <div>
                    <div className="hot-details-title" key={articleDetailData.gid}>
                      <h2>{articleDetailData.title}</h2>
                      <p>
                        <span>发表时间：{articleDetailData.year}</span>
                        <span>来源期刊：{articleDetailData.journalName}</span>
                      </p>
                      <p>
                        <span>{articleDetailData.authorFacet.join("，")}</span>
                      </p>
                      <p>
                        <span>{articleDetailData.authorAdd[0]}</span>
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href={articleDetailData.linkLs[0]}
                          className="fr"
                        >
                        阅读原文&gt;&gt;
                        </a>
                      </p>
                    </div>
                    <div className="hot-details">
                      <p dangerouslySetInnerHTML={{ __html:articleDetailData.abstract}} />
                      <p>关键词：{articleDetailData.keyword.join("，")}</p>
                    </div>
                  </div>
                ) : (articleType === "2") ? (
                  <div>
                    <div className="hot-details-title" key={articleDetailData.id}>
                      <h2>{articleDetailData.fArticleTitle}</h2>
                      <p>
                        <span>上传人：{articleDetailData.fArticleAuthor}</span>
                        <span>
                          创建时间：{(articleDetailData.fArticleTime || "").split(" ").splice(0,1)}
                        </span>
                        { articleDetailData.fFetchtime !== "" ? (
                          <span>
                            <span>修改时间：</span>
                            <span>
                              {(articleDetailData.fFetchtime || "").split(" ").splice(0,1)}
                            </span>
                          </span>
                        ) : "" }
                      </p>
                    </div>
                    <div className="hot-details">
                      <p dangerouslySetInnerHTML={{ __html:articleDetailData.fContent}} />
                      {articleDetailData.fLocation !== "" ? (
                        <p>
                          <a
                            rel="noopener noreferrer"
                            onClick={() => this.downloadFile(articleDetailData.fLocation)}
                          >
                            {articleDetailData.fLocation}
                          </a>
                        </p>
                      ) : ""}
                    </div>
                  </div>
                ) :(
                  <div>
                    <div className="hot-details-title" key={articleDetailData.id}>
                      <h2>{articleDetailData.fArticleTitle}</h2>
                      <p>
                        <span>发表时间：{articleDetailData.fArticleTime}</span>
                        <span>来源期刊：{articleDetailData.fJobName}</span>
                        <span>
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={articleDetailData.fPageUrl}
                            className="fr"
                          >
                          阅读原文&gt;&gt;
                          </a>
                        </span>
                      </p>
                    </div>
                    <div className="hot-details">
                      <p dangerouslySetInnerHTML={{ __html:articleDetailData.fContent}} />
                    </div>
                  </div>
                )
              }
            </div>
          )
        }
      </div>
    );
  }
}

export default DetailsLeft;
