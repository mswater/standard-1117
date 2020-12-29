import React from "react";
import "./index.css";
import { Checkbox, Icon } from "antd";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import {
  fetchArticleCollect,
  fetchArticleCancelCollect,
} from "../../../store/action/ArticleAction.js";

class HotContentItem extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      collect : 0
    };
  }

  componentWillMount() {
    const {
      data
    } = this.props;
    if(data.iscollect === 1){
      this.setState({
        collect: 1,
      });
    }else{
      this.setState({
        collect: 0,
      });
    }
  }

  toDetails = (detailId) => {
    const url = window.location.origin;
    window.open(`${url}/detail/1/${detailId}`, "_blank");
  };

  collectArticle = (obj) => {
    const {
      id,
    } = obj;
    const {
      collect
    } = this.state;
    const {
      fetchArticleCollect,
      fetchArticleCancelCollect,
    } = this.props;
    const hotContact = localStorage.getItem("hotContact");
    const item = {
      cid: id,
      type: Number(hotContact),
    };
    if (collect === 1) {
      this.setState({
        collect: 0,
      });
      return fetchArticleCancelCollect(item);
    }
    this.setState({
      collect: 1,
    });
    return fetchArticleCollect(item);
  };

  render() {
    const username = localStorage.getItem("username");
    const hotContact = localStorage.getItem("hotContact");
    const {
      data
    } = this.props;
    const { collect } = this.state;
    return (
      <div className="hot-content-check-item">
        <div className="hot-content-check-item-title clear">
          <div className="fl">
            {username === "guest" ? "" :
              (
                <Checkbox value={data.id ? data.id.toString() : ""}/>
              )
            }
            <span
              className="hot-content-title"
              onClick={() => {
                return this.toDetails(data.id);
              }}
              dangerouslySetInnerHTML={{
                __html: data.fArticleTitleColour
              }}
            />
          </div>
        </div>
        <div
          className="hot-content-check-item-text"
          title={data.fArticleContent.substr(0,130)}
          onClick={() => {
            return this.toDetails(data.id);
          }}
          dangerouslySetInnerHTML={{ __html: `${data.fArticleIntroduction}${"..."}` }}
        />
        <div className="hot-content-check-item-bottom clear">
          <div className="fl">
            {hotContact === "2" ? (
              <div>
                <span>发布时间：</span>
                <span>{(data.fFetchtime || "").split(" ").splice(0, 1)}</span>
                <span>转发</span>
                <span>{data.repost}</span>
                <span>评论</span>
                <span>{data.comments}</span>
                <span>赞</span>
                <span>{data.mlike}</span>
                <span>来源：</span>
                <span>{data.fJobName}</span>
              </div>) : (
              <div>
                <span>发布时间：</span>
                <span>{(data.fFetchtime || "").split(" ").splice(0, 1)}</span>
                <span>来源：</span>
                <span>{data.fJobName}</span>
              </div>
            )}
          </div>
          <div className="hot-content-check-item-click fr">
            <button type="button" className="read-num">
              <Icon type="eye"/>
            </button>
            <span>{data.readnum}</span>
            {username === "guest" ? "" : (
              <span className="ml20">
                <button
                  type="button"
                  onClick={() => {
                    return this.collectArticle(data);
                  }}
                >
                  {
                    (collect === 1) ?
                      <Icon theme="filled" type="star" style={{ color: "#F6BD4E" }}/>
                      : <Icon theme="outlined" type="star" style={{ color: "#797979" }}/>
                  }
                </button>
                <span>{(collect === 1) ? collect : 0}</span>
              </span>
            )
            }
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    hot: state.hot,
    article:state.article,
  };
};

export default connect(
  mapStateToProps,
  {
    fetchArticleCollect,
    fetchArticleCancelCollect,
  },
)(withRouter(HotContentItem));
