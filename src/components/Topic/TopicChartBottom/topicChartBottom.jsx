import React from "react";
import eCharts from "echarts";
import { Spin } from "antd";
import { HotChartPieLeftOptions } from "../../../lib/tools/chartsConfig";

import "./index.css";


class TopicChartBottom extends React.Component {

  componentDidMount() {
    const {
      subject:{
        fetchSourcesStatisticsMapLoading,
        sourcesStatisticsMapData
      }
    } = this.props;
    if(!fetchSourcesStatisticsMapLoading){
      const { hotChartPieLeft } = this;
      const myChart = eCharts.init(hotChartPieLeft);
      myChart.setOption(HotChartPieLeftOptions(sourcesStatisticsMapData));
    }

  }

  componentDidUpdate() {
    const {
      subject: {
        fetchSourcesStatisticsMapLoading,
        sourcesStatisticsMapData
      }
    } = this.props;
    if(!fetchSourcesStatisticsMapLoading){
      const { hotChartPieLeft } = this;
      const myChart = eCharts.init(hotChartPieLeft);
      myChart.setOption(HotChartPieLeftOptions(sourcesStatisticsMapData));
    }
  }

  render() {
    const { subject: { fetchSourcesStatisticsMapLoading }} = this.props;
    return (
      <div>
        {fetchSourcesStatisticsMapLoading ? (
          <div className="topic-chart-middle-spin-container">
            <Spin/>
          </div>
        ) : (
          <div className="topic-chart-pie-left-container">
            <div className="topic-chart-pie-left-title">
              <h4>来源统计</h4>
            </div>
            <div
              ref={(ref) => {this.hotChartPieLeft = ref;}}
              className="topic-chart-pie-left-content"
            />
          </div>
        )}
      </div>
    );
  }
}
export default TopicChartBottom;
