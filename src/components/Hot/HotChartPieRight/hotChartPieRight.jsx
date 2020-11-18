import React from "react";
import eCharts from "echarts";
import { HotChartPieRightOptions } from "../../../lib/tools/chartsConfig";

import "./index.css";

class HotChartPieRight extends React.Component {


  componentDidMount() {
    const {
      hotChartPieRight
    } = this;
    const {
      hot: {
        siteActivityMapData
      }
    } = this.props;
    const myChart = eCharts.init(hotChartPieRight);
    myChart.setOption(HotChartPieRightOptions(siteActivityMapData));

  }

  componentDidUpdate() {
    const {
      hotChartPieRight
    } = this;
    const {
      hot:{
        siteActivityMapData
      }
    } = this.props;
    const myChart = eCharts.init(hotChartPieRight);
    myChart.setOption(HotChartPieRightOptions(siteActivityMapData));
  }

  render(){
    return (
      <div className="hot-chart-pie-right-container fr">
        <div className="hot-chart-pie-right-title">
          <h4>站点活跃度统计</h4>
        </div>
        <div ref={(ref) => {this.hotChartPieRight = ref;}} className="hot-chart-pie-right-content"/>
      </div>
    );
  }
}

export default HotChartPieRight;
