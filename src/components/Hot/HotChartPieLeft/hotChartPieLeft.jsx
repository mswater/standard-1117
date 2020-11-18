import React from "react";
import eCharts from "echarts";
import { HotChartPieLeftOptions } from "../../../lib/tools/chartsConfig";

import "./index.css";


class HotChartPieLeft extends React.Component {


  componentDidMount() {
    const {
      hotChartPieLeft
    } = this;
    const {
      hot:{
        sourcesStatisticsMapData
      }
    } = this.props;
    const myChart = eCharts.init(hotChartPieLeft);
    myChart.setOption(HotChartPieLeftOptions(sourcesStatisticsMapData));
  }

  componentDidUpdate(){
    const {
      hotChartPieLeft
    } = this;
    const {
      hot:{
        sourcesStatisticsMapData
      }
    } = this.props;
    const myChart = eCharts.init(hotChartPieLeft);
    myChart.setOption(HotChartPieLeftOptions(sourcesStatisticsMapData));
  }

  render() {
    return (
      <div className="hot-chart-pie-left-container fl">
        <div className="hot-chart-pie-left-title">
          <h4>来源统计</h4>
        </div>
        <div ref={(ref) => {this.hotChartPieLeft = ref;}} className="hot-chart-pie-left-content"/>
      </div>
    );
  }
}
export default HotChartPieLeft;
