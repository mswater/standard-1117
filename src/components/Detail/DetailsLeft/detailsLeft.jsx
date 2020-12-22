import React from "react";
import { Spin } from "antd";

import "./index.css";


class DetailsLeft extends React.Component {

  componentDidMount() {
  }

  render() {
    // 文章类型 = 4 国内  5  国外   表示国内文献和海外文献
    const articleType = localStorage.getItem("articleType");
    const {
      article: {
        articleDetailData,
        fetchArticleDetailLoading
      },
    } = this.props;
    console.log(fetchArticleDetailLoading, articleDetailData);
    return (
      <div className="hot-details-left">
        {fetchArticleDetailLoading ?
          <div className="spin"><Spin /></div>: (
            <div>
              {(articleDetailData.gid || articleDetailData.id) &&
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
                ) : (
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
