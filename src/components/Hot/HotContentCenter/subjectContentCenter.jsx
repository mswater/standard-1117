import React from "react";
import "./index.css";
import { siblings } from "../../../lib/tools/utils";


class SubjectContentCenter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.addEvent();
  }

  // 微信微博等切换
  contactFunc = (type) => {
    const {
      history,
      fetchSubjectContentList,
      fetchSubjectProList,
      fetchSubjectResetButton,
      fetchSubjectResetWeibo,
      fetchSubjectResetLanguage,
      fetchSubjectSearchValue,
      fetchSubjectSearchQuery,
      fetchSubjectThemeSearchFlag,
      hot:{
        subjectThemeSearch,
        subjectStartDate,
        subjectEndDate,
      },
      handlerIndex
    } = this.props;
    const readingId = localStorage.getItem("subjectReadingId");
    const params = {
      searchKey: subjectThemeSearch,
      hId: Number(readingId),
      sourceType: type,
      webList:["全部"],
      proList: null,
      languageList: null,
      order:"desc",
      orderType:subjectThemeSearch ? 3 : 1,
      startDate:subjectStartDate,
      endDate:subjectEndDate,
      pageNum:1,
      pageSize:10
    };
    history.push("/subject");
    localStorage.setItem("subjectContact", type);
    handlerIndex(0);
    fetchSubjectSearchQuery();
    fetchSubjectSearchValue();
    fetchSubjectResetWeibo(false);
    fetchSubjectResetLanguage(false);
    fetchSubjectProList(false);
    fetchSubjectResetButton(true);
    fetchSubjectThemeSearchFlag(true);
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
    const subjectContact = localStorage.getItem("subjectContact");
    return (
      <div
        className="hot-content-center subject-content-center"
        ref={(ref) => {this.classWay = ref;}}
      >
        <button
          type="button"
          style={
            (!subjectContact || subjectContact === "1") ? {
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
            subjectContact === "2" ? {
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
            subjectContact === "3" ? {
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
            subjectContact === "5" ? {
              borderBottom:"1px solid #0572B8", color: "#0572B8"
            } : {
              borderBottom:"1px solid #F2F3F6", color: "#515256"
            }
          }
          onClick={() => {return this.contactFunc(5);}}
        >
          国内文献
        </button>
        <button
          type="button"
          style={
            subjectContact === "4" ? {
              borderBottom:"1px solid #0572B8", color: "#0572B8"
            } : {
              borderBottom:"1px solid #F2F3F6", color: "#515256"
            }
          }
          onClick={() => {return this.contactFunc(4);}}
        >
          海外文献
        </button>
      </div>
    );
  }
}

export default SubjectContentCenter;
