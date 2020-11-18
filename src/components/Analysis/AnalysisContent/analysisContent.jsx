import React from "react";
import { Menu, Spin } from "antd";
import AnalysisContentCenter from "../AnalysisContentCenter/analysisContentCenter.jsx";
import AnalysisContentCheck from  "../AnalysisContentCheck/analysisContentCheck.jsx";
import AnalysisChart from  "../AnalysisChart/analysisChart.jsx";
import AnalysisTop from  "../AnalysisTop/analysisTop.jsx";

import "./index.css";

class AnalysisContent extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
    };
  }

  handleClick = (e) => {
    const { props } = this;
    const { fetchAnalyseMenuKey } = this.props;
    props.history.push("/analysis");
    fetchAnalyseMenuKey(e.key);
  };

  childArrFunc = () => {
    const {
      analyse: {
        analyseListData,
        analyseMenuAndTypeData: {
          child,
        },
      },
    } = this.props;
    if(analyseListData && analyseListData.length>0){
      if (child.length === 0) {
        return  analyseListData[0].child;
      }
      return child;
    }
    return [];
  };

  // 获取menu的id值
  handleAnalyseId=(aId)=>{
    const {
      fetchAnalyseMenuKey,
      fetchAnalyseContentList,
      analyse:{
        analyseTypeName,
        analyseMenuAndTypeData:{
          id
        }
      }
    } = this.props;
    const obj ={
      pid:id,
      cid: aId,
      type: analyseTypeName,
      pageNum: 1,
      pageSize: 10,
    };
    fetchAnalyseMenuKey(aId);
    fetchAnalyseContentList(obj);
  };


  render() {
    const token = localStorage.getItem("token");
    const {
      analyse: {
        analyseMenuKey,
        fetchAnalyseListLoading,
        analyseListData
      },
    } = this.props;
    const firstItem = this.childArrFunc() && this.childArrFunc().map(cur => {
      return (
        <Menu.Item
          key={cur.id}
          onClick={() => {
            return this.handleAnalyseId(cur.id);
          }}
        >
          {cur.name}
        </Menu.Item>
      );
    });
    return (
      <div className="analysis-content-wrap">
        {
          (analyseListData && analyseListData.length >0)
            ?
            (
              <div className="analysis-content clear">
                <AnalysisTop {...this.props}/>
                <div className=" fl">
                  <div className="analysis-content-left-container clear">
                    <div className="analysis-content-slider fl">
                      {fetchAnalyseListLoading ? <div className="spin"><Spin/></div> :
                        <Menu
                          onClick={this.handleClick}
                          className="menu"
                          selectedKeys={
                            [`${!analyseMenuKey ? "4" :analyseMenuKey}`]
                          }
                          mode="inline"
                        >
                          {firstItem}
                        </Menu>
                      }
                    </div>
                    <div className="analysis-content-main fl">
                      <AnalysisContentCenter {...this.props}/>
                      <AnalysisContentCheck {...this.props}/>
                    </div>
                  </div>
                </div>
                <div className="analysis-content-chart fr">
                  <AnalysisChart {...this.props}/>
                </div>
              </div>
            )
            :
            (
              <div className="hot-content-none">
              暂无监测信息，点击
                <a
                  href={`/managecenter/analysis/list?uid=${token}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  行业分析管理
                </a>
              创建我的分析项目
              </div>
            )
        }
      </div>
    );
  }
}

export default AnalysisContent;
