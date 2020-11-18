import React from "react";
import { Spin } from "antd";
import eCharts from "echarts";

import "./index.css";
import { HotChartMiddleOptions } from "../../../lib/tools/chartsConfig";

class HotChartMiddle extends React.Component {


  componentDidMount() {
    const {
      hot:{
        fetchDataTrendMapLoading,
        trendMapData
      },
    } = this.props;
    if (!fetchDataTrendMapLoading){
      const { hotChartMiddle } = this;
      const myChart = eCharts.init(hotChartMiddle);
      myChart.setOption(HotChartMiddleOptions(trendMapData));
    }
  }

  componentDidUpdate() {
    const {
      hot:{
        fetchDataTrendMapLoading,
        trendMapData
      },
    } = this.props;
    if (!fetchDataTrendMapLoading){
      const { hotChartMiddle } = this;
      const myChart = eCharts.init(hotChartMiddle);
      myChart.setOption(HotChartMiddleOptions(trendMapData));
    }
  }

  render() {
    const { hot:{ fetchDataTrendMapLoading }} = this.props;
    return (
      <div>
        {fetchDataTrendMapLoading ? (
          <div className="hot-chart-middle-spin-container">
            <Spin/>
          </div>
        ) : (
          <div className="hot-chart-middle-container">
            <div className="hot-chart-middle-title">
              <h4>数据量趋势图</h4>
            </div>
            <div ref={(ref) => {this.hotChartMiddle = ref;}} className="hot-chart-middle-content"/>
          </div>
        )
        }
      </div>
    );
  }
}
export default HotChartMiddle;
