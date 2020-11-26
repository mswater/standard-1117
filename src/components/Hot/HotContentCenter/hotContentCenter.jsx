import React from "react";
import "./index.css";
import { siblings } from "../../../lib/tools/utils";


class HotContentCenter extends React.Component {
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
      fetchHotContentList,
      fetchHotProList,
      fetchHotResetButton,
      fetchHotResetWeibo,
      fetchHotResetLanguage,
      fetchHotSearchValue,
      hot:{
        hotThemeSearch
      },
      handlerIndex
    } = this.props;
    const readingId = localStorage.getItem("readingId");
    const params = {
      searchKey: hotThemeSearch,
      hId: Number(readingId),
      sourceType: type,
      webList:[],
      proList: [],
      order:"desc",
      orderType:1,
      pageNum:1,
      pageSize:10
    };
    history.push("/hot");
    localStorage.setItem("hotContact", type);
    handlerIndex(0);
    fetchHotSearchValue();
    fetchHotResetWeibo(false);
    fetchHotResetLanguage(false);
    fetchHotProList(false);
    fetchHotResetButton(true);
    fetchHotContentList(params);
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
    const hotContact = localStorage.getItem("hotContact");
    return (
      <div className="hot-content-center" ref={(ref) => {this.classWay = ref;}}>
        <button
          type="button"
          style={
            (!hotContact || hotContact === "1") ? {
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
            hotContact === "2" ? {
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
            hotContact === "3" ? {
              borderBottom:"1px solid #0572B8", color: "#0572B8"
            } : {
              borderBottom:"1px solid #F2F3F6", color: "#515256"
            }
          }
          onClick={() => {return this.contactFunc(3);}}
        >
          微信
        </button>
      </div>
    );
  }
}

export default HotContentCenter;
