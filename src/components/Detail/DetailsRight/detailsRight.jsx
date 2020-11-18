import React from "react";
import { Spin, Tag } from "antd";
import "./index.css";

const colorStyle = [{
  color:"magenta"
},{
  color:"red"
},{
  color:"volcano"
},{
  color:"orange"
},{
  color:"gold"
},{
  color:"lime"
},{
  color:"magenta"
},{
  color:"red"
},{
  color:"volcano"
},{
  color:"orange"
},{
  color:"gold"
},{
  color:"lime"
}];
/* eslint-disable no-nested-ternary */
class DetailsRight extends React.Component {

  componentDidMount() {
  }

  hotTabs = (title) => {
    const {history } = this.props;
    // 保存标签
    localStorage.setItem("tabsTitle", title);
    history.push("/details/tabs");
  };

  toDetails = (detailId) => {
    // const { history } = this.props;
    const {
      fetchArticleDetail,
      fetchArticleLabel,
      fetchSimArticle,
      fetchSimLiterature
    } = this.props;
    // 文章详情
    fetchArticleDetail(detailId);
    // 获取标签
    fetchArticleLabel(detailId);
    // 相关文章
    fetchSimArticle(detailId);
    // 相关文献
    fetchSimLiterature(detailId);
    // history.push(`/${detailId}`);
    const url = window.location.origin;
    window.open(`${url}/detail/${detailId}`,"_blank");
  };

  render() {
    const {
      article: {
        articleLabelData,
        simArticleData,
        simLiteratureData,
        fetchArticleLabelLoading,
        fetchSimArticleLoading,
        fetchSimLiteratureLoading
      }
    } = this.props;
    const item = articleLabelData && articleLabelData.map((cur, index) => {
      return (
        <Tag
          color={colorStyle[index] && colorStyle[index].color}
          key={index.toString()}
          onClick={() => {return this.hotTabs(cur);}}
          title={cur}
        >
          {cur}
        </Tag>
      );
    });
    // 相关文章
    const simArticleList=simArticleData && simArticleData.map((cur, index) => {
      return (
        <li key={index.toString()}>
          <a
            target="_blank"
            rel="noopener noreferrer"
            title={cur.fArticleTitle}
          >
            <i className="details_dot"/>
            <span onClick={() => {return this.toDetails(cur.id);}}>
              {cur.fArticleTitle}
            </span>
          </a>
        </li>
      );
    });
    const simLiteratureList=simLiteratureData && simLiteratureData.map((cur, index) => {
      return (
        <li key={index.toString()}>
          <i />
          <a
            href={cur.pageUrl}
            target="_blank"
            rel="noopener noreferrer"
            title={cur.title}
          >
            <i className="details_dot"/>
            <span>
              {cur.title}
            </span>
          </a>
        </li>
      );
    });
    return (
      <div className="hot-details-right fr">
        {fetchArticleLabelLoading ? <div className="spin"><Spin/></div> :
          (!item.length ? "" :
            (
              <div className="hot-tags clear">
                <div className="hot-detail-title">
                  本文标签
                </div>
                <div className="hot-tags-content">
                  {item}
                </div>
              </div>
            )
          )
        }
        {fetchSimArticleLoading ? <div className="spin"><Spin/></div> :
          (!simArticleList.length ? "" :
            (
              <div className="hot-details-related-articles">
                <div className="hot-detail-title">
                  相关文章
                </div>
                <ul className="hot-details-related-articles-content">
                  {simArticleList}
                </ul>
              </div>
            )
          )
        }
        {fetchSimLiteratureLoading ? <div className="spin"><Spin/></div> :
          (!simLiteratureList.length ? "" :
            (
              <div className="hot-details-related-doc">
                <div className="hot-detail-title">
                  相关文献
                </div>
                <ul className="hot-details-related-doc-content">
                  { simLiteratureList }
                </ul>
              </div>
            )
          )
        }
      </div>
    );
  }
}
export default DetailsRight;
