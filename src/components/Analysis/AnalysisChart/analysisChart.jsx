import React from "react";
import { Spin } from "antd";
import eCharts from "echarts";

import "./index.css";
import { AnalysisChartOptions } from "../../../lib/tools/chartsConfig";
import { siblings } from "../../../lib/tools/utils";


class AnalysisChart extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      currentIndex: 0
    };
  }

  componentDidMount() {
    const {
      analyse: {
        fetchAnalyseTendencyComparLoading,
        trendComparData
      },
    } = this.props;
    if (!fetchAnalyseTendencyComparLoading){
      const { analysisChart } = this;
      const myChart = eCharts.init(analysisChart);
      myChart.setOption(AnalysisChartOptions(trendComparData));
    }
    this.addDateEvent();
  }


  componentDidUpdate() {
    const {
      analyse: {
        fetchAnalyseTendencyComparLoading,
        trendComparData
      }
    } = this.props;
    if (!fetchAnalyseTendencyComparLoading){
      const { analysisChart } = this;
      const myChart = eCharts.init(analysisChart);
      myChart.setOption(AnalysisChartOptions(trendComparData));
    }
    this.addDateEvent();
  }

  // 一月 三月 一年点击事件
  dateLink = (date) => {
    const {
      fetchAnalyseDataCompar,
      fetchAnalyseDate,
      fetchAnalyseTendencyCompar,
      analyse:{
        analyseTypeName,
        analyseMenuAndTypeData: {
          id
        }
      }
    } = this.props;
    const params ={
      type: date,
      pid: id
    };
    const item = {
      pid: id,
      artilceType: analyseTypeName,
      type: date,
    };
    fetchAnalyseDate(date);
    // 行业分析 数据对比表格
    fetchAnalyseDataCompar(params);
    // 行业分析 对比图表
    fetchAnalyseTendencyCompar(item);
  };

  // 资讯，微博等按钮事件
  contactFunc = (type, typeName) => {
    const {
      fetchAnalyseTendencyCompar,
      fetchAnalyseResetButton,
      analyse:{
        analyseMenuAndTypeData: {
          id
        },
        analyseDate
      },
    } = this.props;
    // 行业分析 文章列表参数
    const item = {
      pid: id,
      artilceType: typeName,
      type: analyseDate,
    };
    this.setState({
      currentIndex: type
    }, () => {
      fetchAnalyseResetButton(false);
      fetchAnalyseTendencyCompar(item);
    });
  };

  typesArrFunc = () => {
    const {
      analyse: {
        analyseListData,
        analyseMenuAndTypeData: {
          typs
        },
      },
    } = this.props;
    if (typs.length === 0) {
      return analyseListData[0].typs;
    }
    return typs;
  };

  styleFunc  = (index) => {
    const { currentIndex } = this.state;
    if (currentIndex === index) {
      return {
        borderBottom:"1px solid #0572B8", color: "#0572B8"
      };
    }
    // 返回其他
    return {
      borderBottom:"1px solid #F2F3F6", color: "#515256"
    };
  };

  dateType() {
    /* eslint-disable no-param-reassign */
    siblings(this).forEach((item, index, arr) => {
      arr[index].style.color = "#343539";
    });
    this.style.color = "#0572B8";
  }

  addDateEvent() {
    const { timeType } = this;
    const arr = timeType.children;
    const ways = [];
    for (let i = 0; i < arr.length; i += 1) {
      ways.push(arr[i]);
    }
    Array.prototype.forEach.call(ways, (item) => {
      item.addEventListener("click", this.dateType);
    });
  }

  render(){
    const {
      analyse: {
        comparData,
        fetchAnalyseDataComparLoading,
        fetchAnalyseTendencyComparLoading
      },
    } = this.props;

    const tableData = [];
    const typeArray = [];
    typeArray.push("");
    for (let i = 0; i < comparData.length; i+=1) {
      const {type} = comparData[i];
      typeArray.push(type);
    }
    tableData.push(typeArray);
    const nameArray = comparData[0].childTotalArray;
    for (let i = 0; i < nameArray.length; i+=1) {
      const {cName} = nameArray[i];
      const cNameArray = [];
      cNameArray.push(cName);
      for (let i = 0; i < comparData.length; i+=1) {
        const child = comparData[i].childTotalArray;
        for (let i = 0; i < child.length; i+=1) {
          const name = child[i].cName;
          const total = child[i].cTotal;
          if (name === cName) {
            cNameArray.push(total);
          }
        }
      }
      tableData.push(cNameArray);
    }
    const tableDataConst = tableData && tableData.map((item, i)=>{
      return (
        <tr key={i.toString()}>
          {item.map((res, n)=> {
            return (
              <td key={n.toString()}>{res}</td>
            );
          })}
        </tr>
      );
    });
    const firstItem = this.typesArrFunc() && this.typesArrFunc().map((cur, index) => {
      return (
        <button
          type="button"
          key={cur}
          style={this.styleFunc(index)}
          onClick={() => {return this.contactFunc(index, cur);}}
        >
          {cur}
        </button>
      );
    });
    return (
      <div className="analysis-chart-middle-container">
        <div className="analysis-chart-middle-title">
          <div className="analysis-content-top-date" ref={(ref) => {this.timeType = ref;}}>
            <span onClick={() => {return this.dateLink(1);}}>一月</span>
            <span onClick={() => {return this.dateLink(2);}}>三月</span>
            <span onClick={() => {return this.dateLink(3);}}>一年</span>
          </div>
          <h3>- 对比数据 -</h3>
        </div>
        <div className="analysis-form-left-content">
          {fetchAnalyseDataComparLoading ? <div className="spin"><Spin/></div> :
            <table>
              <tbody>
                {tableDataConst}
              </tbody>
            </table>
          }
        </div>
        <div className="analysis-chart-middle-title">
          <h3>- 趋势对比 -</h3>
        </div>
        <div className="analysis-content-center-chart">
          {firstItem}
        </div>
        {fetchAnalyseTendencyComparLoading ? (
          <div className="analysis-chart-middle-spin-container">
            <Spin/>
          </div>
        ) : (
          <div>
            <div
              ref={(ref) => {
                this.analysisChart = ref;
              }}
              className="analysis-chart-middle-content"
            />
          </div>
        )}
      </div>
    );
  }
}
export default AnalysisChart;

