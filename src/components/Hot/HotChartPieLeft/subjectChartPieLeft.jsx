import React from "react";
import eCharts from "echarts";
import { HotChartPieLeftOptions } from "../../../lib/tools/chartsConfig";

import "./index.css";


class SubjectChartPieLeft extends React.Component {


  componentDidMount() {
    const {
      subjectChartPieLeft
    } = this;
    const {
      hot:{
        subjectSourcesStatisticsMapData
      }
    } = this.props;
    const myChart = eCharts.init(subjectChartPieLeft);
    myChart.setOption(HotChartPieLeftOptions(subjectSourcesStatisticsMapData));
  }

  componentDidUpdate(){
    const {
      subjectChartPieLeft
    } = this;
    const {
      hot:{
        subjectSourcesStatisticsMapData
      }
    } = this.props;
    const myChart = eCharts.init(subjectChartPieLeft);
    myChart.setOption(HotChartPieLeftOptions(subjectSourcesStatisticsMapData));
  }

  render() {
    return (
      <div className="hot-chart-pie-left-container fl">
        <div className="hot-chart-pie-left-title">
          <h4>来源统计</h4>
        </div>
        <div
          ref={(ref) => {this.subjectChartPieLeft = ref;}}
          className="hot-chart-pie-left-content"
        />
      </div>
    );
  }
}
export default SubjectChartPieLeft;
