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
    let articleDetail;
    if(articleType === "4" || articleType === "5"){
      articleDetail = (
        <div>
          <div className="hot-details-title" key={articleDetailData.gid}>
            <h2>{articleDetailData.title}</h2>
            <p>
              <span>发表时间：{articleDetailData.year}</span>
              <span>来源期刊：{articleDetailData.journalName}</span>
            </p>
            <p>
              <span>{articleDetailData.authorFacet}</span>
            </p>
            <p>
              <span>{articleDetailData.authorAdd[0]}</span>
              <span>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={articleDetailData.linkLs[0]}
                  className="fr"
                >
                阅读原文&gt;&gt;
                </a>
              </span>
            </p>
          </div>
          <div className="hot-details">
            <p dangerouslySetInnerHTML={{ __html:articleDetailData.fContent}} />
            <p>关键词：{articleDetailData.keyword}</p>
          </div>
        </div>
      );
    }else{
      articleDetail = (
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
      );
    }
    return (
      <div className="hot-details-left">
        {fetchArticleDetailLoading ?
          <div className="spin"><Spin /></div>: articleDetail
        }
      </div>
    );
  }
}

export default DetailsLeft;
