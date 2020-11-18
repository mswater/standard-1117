import React from "react";
import Share from "social-share-react";
import { Spin } from "antd";

import "./index.css";


class DetailsLeft extends React.Component {

  componentDidMount() {
  }

  render() {
    const {
      article: {
        articleDetailData,
        fetchArticleDetailLoading
      },
    } = this.props;
    return (
      <div className="hot-details-left fl">
        {fetchArticleDetailLoading ?
          <div className="spin"><Spin /></div>:
          <div>
            <div className="hot-details-title" key={articleDetailData.id}>
              <h2>{articleDetailData.fArticleTitle}</h2>
              <p>
                <span>时间：{articleDetailData.fArticleTime}</span>
                <span>来源：{articleDetailData.fJobName}</span>
                <span>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={articleDetailData.fPageUrl}
                  >
                  阅读原文&gt;&gt;
                  </a>
                </span>
              </p>
            </div>
            <div className="hot-details">
              <p dangerouslySetInnerHTML={{ __html:articleDetailData.fContent}} />
            </div>
            <div className="declare">
              特别声明：本站信息部分收集于互联网，所有文章仅出于传递信息之需要,
              且明确注明来源和作者，如有侵权，请联系product-service@cnki.net，我们将立即进行删除处理。
            </div>
          </div>
        }
        <div className="hot-details-img">
          <Share
            url={articleDetailData.fPageUrl}
            title={articleDetailData.fArticleTitle}
            disabled={["google", "facebook", "twitter", "linkedin", "qq", "tencent"]}
          />
        </div>
      </div>
    );
  }
}
export default DetailsLeft;
