import React from "react";
import { Spin } from "antd";

import "./index.css";


class DetailsLeft extends React.Component {

  componentDidMount() {
  }

  render() {
    // 文章类型 = 4  表示国内文献和海外文献
    const articleType = localStorage.getItem("articleType");
    const {
      article: {
        articleDetailData,
        fetchArticleDetailLoading
      },
    } = this.props;
    return (
      <div className="hot-details-left">
        {fetchArticleDetailLoading ?
          <div className="spin"><Spin /></div>:
          <div>
            <div className="hot-details-title" key={articleDetailData.id}>
              <h2>{articleDetailData.fArticleTitle}</h2>
              <p>
                <span>发表时间：{articleDetailData.fArticleTime}</span>
                <span>来源期刊：{articleDetailData.fJobName}</span>
                {
                  (articleType !== "4") ? (
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
                  ) : ""
                }
              </p>
              {(articleType === "4") ? (
                <p>
                  <p>
                    <span>作者</span><span>作者</span><span>作者</span><span>作者</span>
                  </p>
                  <p>
                    <span>某研究院</span>
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
                </p>
              ) : ""}
            </div>
            <div className="hot-details">
              <p dangerouslySetInnerHTML={{ __html:articleDetailData.fContent}} />
              {
                (articleType !== "4") ? "" : (
                  <p>关键词：{articleDetailData.vsm}</p>
                )
              }
            </div>
          </div>
        }
      </div>
    );
  }
}

export default DetailsLeft;
