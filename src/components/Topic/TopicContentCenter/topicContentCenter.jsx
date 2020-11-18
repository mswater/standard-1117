import React from "react";
import "./index.css";
import { siblings } from "../../../lib/tools/utils";


class TopicContentCenter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.addEvent();
  }

  contactFunc = (type) => {
    const {
      history,
      fetchSubjectContentList,
      fetchSubjectProList,
      fetchSubjectResetButton,
      fetchSubjectResetWeibo,
      fetchSubjectSearchValue,
      subject:{
        subjectThemeSearch
      },
      handlerIndex
    } = this.props;
    const menuId = localStorage.getItem("id");
    const params = {
      searchKey:subjectThemeSearch,
      hId: Number(menuId),
      sourceType: type,
      webList:[],
      proList: [],
      order:"desc",
      orderType:1,
      pageNum:1,
      pageSize:10
    };
    history.push("/topic");
    localStorage.setItem("topicContact", type);
    handlerIndex(0);
    fetchSubjectSearchValue();
    fetchSubjectResetWeibo(false);
    fetchSubjectProList(false);
    fetchSubjectResetButton(true);
    fetchSubjectContentList(params);
  };

  checkType() {
    /* eslint-disable no-param-reassign */
    siblings(this).forEach((item, index, arr) => {
      arr[index].style.color = "#515256";
      arr[index].style.borderBottom = "1px solid #F2F3F6";
    });
    this.style.color = "#0572B8";
    this.style.borderBottom = "1px solid #0572B8";
  }

  addEvent() {
    const { classWay } = this;
    const arr = classWay.children;
    const ways = [];
    for (let i = 0; i < arr.length; i += 1) {
      ways.push(arr[i]);
    }
    Array.prototype.forEach.call(ways, (item) => {
      item.addEventListener("click", this.checkType);
    });
  }

  render() {
    const topicContact = localStorage.getItem("topicContact");
    return (
      <div className="topic-content-center" ref={(ref) => {this.classWay = ref;}}>
        <button
          type="button"
          style={
            (!topicContact || topicContact === "1") ? {
              borderBottom:"1px solid #0572B8", color: "#0572B8"
            } : {
              borderBottom:"1px solid #F2F3F6", color: "#515256"
            }
          }
          onClick={() => {return this.contactFunc(1);}}
        >
          资讯
        </button>
        <button
          type="button"
          style={
            topicContact === "2" ? {
              borderBottom:"1px solid #0572B8", color: "#0572B8"
            } : {
              borderBottom:"1px solid #F2F3F6", color: "#515256"
            }
          }
          onClick={() => {return this.contactFunc(2);}}
        >
          微博
        </button>
        <button
          type="button"
          style={
            topicContact === "3" ? {
              borderBottom:"1px solid #0572B8", color: "#0572B8"
            } : {
              borderBottom:"1px solid #F2F3F6", color: "#515256"
            }
          }
          onClick={() => {return this.contactFunc(3);}}
        >
          微信
        </button>
        <button
          type="button"
          style={
            topicContact === "4" ? {
              borderBottom:"1px solid #0572B8", color: "#0572B8"
            } : {
              borderBottom:"1px solid #F2F3F6", color: "#515256"
            }
          }
          onClick={() => {return this.contactFunc(4);}}
        >
          国内文献
        </button>
        <button
          type="button"
          style={
            topicContact === "5" ? {
              borderBottom:"1px solid #0572B8", color: "#0572B8"
            } : {
              borderBottom:"1px solid #F2F3F6", color: "#515256"
            }
          }
          onClick={() => {return this.contactFunc(5);}}
        >
          海外文献
        </button>
      </div>
    );
  }
}

export default TopicContentCenter;
