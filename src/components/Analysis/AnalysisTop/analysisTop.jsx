import React from "react";
import { Icon, Spin } from "antd";
import { siblings } from "../../../lib/tools/utils";

import "./index.css";

class AnalysisTop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLeft: false,
      showRight: true
    };
  }

  componentDidMount(){
    const {
      analyse: {
        analyseListData,
        fetchAnalyseListLoading,
      },
    } = this.props;
    if (!fetchAnalyseListLoading && analyseListData.length > 0){
      this.addEvent();
    }
  }

  componentDidUpdate() {
    const {
      analyse: {
        analyseListData,
        fetchAnalyseListLoading,
      },
    } = this.props;
    if (!fetchAnalyseListLoading && analyseListData.length > 0){
      this.addEvent();
    }
  }

  // 右边按钮
  showNext = () => {
    if (!this.nextFlag){
      this.nextFlag = true;
      setTimeout(() => {
        const { box } = this;
        const left = parseInt(getComputedStyle(box, null).marginLeft, 0);
        const width = parseInt(getComputedStyle(box, null).width, 0);
        this.setState({
          showLeft: true,
        }, () => {
          if (Math.abs(left) + 1250 >= width) {
            this.setState({
              showRight: false
            });
          }
          this.nextFlag = false;
          box.style.marginLeft = `${left-250}px`;
        });
      }, 500);
    }
  };

  // 左边按钮
  showPrev = () => {
    if (!this.prevFlag) {
      this.prevFlag = true;
      setTimeout(() => {
        const { box } = this;
        // 获取元素的marginLeft
        const left = parseInt(getComputedStyle(box, null).marginLeft, 0);
        // 右侧按钮出现
        this.setState({
          showRight: true,
        }, () => {
          if (left >= -250) {
            this.setState({
              showLeft: false
            });
          }
          this.prevFlag = false;
          box.style.marginLeft = `${left+250}px`;
        });
      }, 500);
    }
  };

  // 最上边机构分析等按钮点击
  analyseListIdFunc = (data) => {
    const {
      fetchAnalyseMenuAndType,
      fetchAnalyseContentList,
      fetchAnalyseDataCompar,
      fetchAnalyseResetButton,
      fetchAnalyseTendencyCompar,
      fetchAnalyseMenuKey,
      fetchAnalyseTypeName,
      analyse:{
        analyseDate
      },
    } = this.props;
    const { id, child, typs } = data;
    const menuKey = child[0].id;
    const typeName = typs[0];
    const params = {
      pid:id,
      cid: menuKey,
      type: typeName,
      pageNum: 1,
      pageSize: 10,
    };
    const obj = {
      pid: id,
      type: analyseDate,
    };
    // 行业分析 对比图表参数
    const item = {
      pid:id,
      artilceType: typeName,
      type: analyseDate,
    };
    fetchAnalyseTypeName(typeName);
    fetchAnalyseMenuKey(menuKey);
    fetchAnalyseMenuAndType(data);
    // 行业分析 文章列表
    fetchAnalyseContentList(params);
    fetchAnalyseResetButton(true);
    // 行业分析 数据对比表格
    fetchAnalyseDataCompar(obj);
    // 行业分析 对比图表
    fetchAnalyseTendencyCompar(item);
  };

  checkType() {
    /* eslint-disable no-param-reassign */
    siblings(this).forEach((item, index, arr) => {
      arr[index].children[0].style.backgroundColor = "#D1D1D1";
    });
    this.children[0].style.backgroundColor = "#F6BD4E";
  }

  addEvent() {
    const { box } = this;
    const arr = box.children;
    const ways = [];
    for (let i = 0; i < arr.length; i+=1) {
      ways.push(arr[i]);
    }
    Array.prototype.forEach.call(ways, (item) => {
      item.addEventListener("click", this.checkType);
    });
  }

  render() {
    const { showLeft, showRight } = this.state;
    const {
      analyse: {
        analyseListData,
        fetchAnalyseListLoading,
      },
    } = this.props;
    const btnItem = analyseListData && analyseListData.map((cur, index) => {
      return (
        <div className="analysis-top-btn" key={index.toString()}>
          <button
            type="button"
            onClick={() => {return this.analyseListIdFunc(cur);}}
            title={cur.name}
          >
            {cur.name}
          </button>
        </div>
      );
    });
    return (
      <div className="analysis-top">
        <div className="analysis-top-wrap">
          {(showLeft) && (<Icon type="left" onClick={this.showPrev}/>)}
          <div className="analysis-top-box">
            {fetchAnalyseListLoading ? <div className="spin"><Spin/></div> :
              <div
                className="analysis-top-list clear"
                ref={(ref) => {
                  this.box = ref;
                }}
                style={{ width: `${analyseListData.length * 250}px` }}
              >
                {btnItem}
              </div>
            }
          </div>
          {(analyseListData.length > 4 ? showRight : false) &&
          (<Icon type="right" onClick={this.showNext}/>)}
        </div>
      </div>
    );
  }
}

export default AnalysisTop;
