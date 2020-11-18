import React from "react";
import eCharts from "echarts";
import { Spin } from "antd";
import { HotChartTopOptions } from "../../../lib/tools/chartsConfig";
import "../../../lib/tools/china";

import "./index.css";


class HotChartTop extends React.Component {

  componentDidMount() {
    const {
      hot:{
        siteMapData,
        fetchSiteMapLoading
      }
    } = this.props;
    if (!fetchSiteMapLoading) {
      const { hotChartTop} = this;
      const myChart = eCharts.init(hotChartTop);
      myChart.setOption(HotChartTopOptions(siteMapData));
    }
  }

  componentDidUpdate() {
    const {
      hot:{
        siteMapData,
        fetchSiteMapLoading
      }
    } = this.props;
    if (!fetchSiteMapLoading) {
      const { hotChartTop } = this;
      const myChart = eCharts.init(hotChartTop);
      myChart.setOption(HotChartTopOptions(siteMapData));
    }
  }

  render() {
    const { hot: { fetchSiteMapLoading }} = this.props;
    return (
      <div>
        {fetchSiteMapLoading ? (
          <div className="hot-chart-middle-spin-container">
            <Spin/>
          </div>
        ) : (
          <div className="hot-chart-top-container">
            <div className="hot-chart-top-title">
              <h4>地域热力图</h4>
            </div>
            <div ref={(ref) => {this.hotChartTop = ref;}} className="hot-chart-top-content" />
          </div>
        )
        }
      </div>
    );
  }
}
export default HotChartTop;
