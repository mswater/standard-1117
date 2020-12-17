import React from "react";
import "./index.css";
import { Modal } from "antd";
import { siblings } from "../../../lib/tools/utils";


class SearchContentCenter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    this.addEvent();
  }

  contactFunc = (typeSearch) => {
    const username = localStorage.getItem("username");
    if(typeSearch === 9 && username === "guest"){
      Modal.info({
        title: "您现在没有权限阅读此栏目",
        content: (
          <div>
            <p>如需申请正式账号，请邮箱联系：agrihotspot@caas.cn</p>
          </div>
        ),
        onOk() {
        },
      });
    }else{
      const {
        history,
        fetchSearch,
        fetchSearchProList,
        fetchSearchLanguageList,
        fetchSearchResetButton,
        fetchSearchResetWeibo,
        headerSearchContent,
        fetchSearchQuery,
        fetchSearchValue,
        search:{
          searchDateQuery,
        },
        handlerIndex
      } = this.props;
      const params= {
        type:typeSearch,
        starTime: searchDateQuery[0],
        endTime: searchDateQuery[1],
        searchKey: headerSearchContent,
        webList: [],
        proList: [],
        languageList: [],
        timeOrder: "",
        browseOrder: null,
        relevantOrder: null,
        transpondOrder: null,
        commentOrder: null,
        likeOrder: null,
        mettingOrder: null,
        blogType:null,
        pageNum: 1,
        pageSize: 10
      };
      if(!headerSearchContent){
        params.timeOrder = "desc";
      }else if(headerSearchContent){
        params.relevantOrder = "desc";
      }
      history.push("/search");
      localStorage.setItem("searchContact", typeSearch);
      handlerIndex(0);
      fetchSearchValue();
      fetchSearchQuery();
      fetchSearchResetWeibo(false);
      fetchSearchProList(false);
      fetchSearchLanguageList(false);
      fetchSearchResetButton(false);
      fetchSearch(params);
    }
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
    const searchContact = localStorage.getItem("searchContact");
    return (
      <div className="search-content-center" ref={(ref) => {this.classWay = ref;}}>
        <button
          type="button"
          style={
            (!searchContact || searchContact === "1") ? {
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
            searchContact === "2" ? {
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
            searchContact === "3" ? {
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
            searchContact === "6" ? {
              borderBottom:"1px solid #0572B8", color: "#0572B8"
            } : {
              borderBottom:"1px solid #F2F3F6", color: "#515256"
            }
          }
          onClick={() => {return this.contactFunc(6);}}
        >
          会议
        </button>
        <button
          type="button"
          style={
            searchContact === "4" ? {
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
            searchContact === "5" ? {
              borderBottom:"1px solid #0572B8", color: "#0572B8"
            } : {
              borderBottom:"1px solid #F2F3F6", color: "#515256"
            }
          }
          onClick={() => {return this.contactFunc(5);}}
        >
          海外文献
        </button>
        <button
          type="button"
          style={
            searchContact === "9" ? {
              borderBottom:"1px solid #0572B8", color: "#0572B8"
            } : {
              borderBottom:"1px solid #F2F3F6", color: "#515256"
            }
          }
          onClick={() => {return this.contactFunc(9);}}
        >
          内部资料
        </button>
      </div>
    );
  }
}

export default SearchContentCenter;
