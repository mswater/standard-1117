import React from "react";
import { Spin } from "antd";
import eCharts from "echarts";
import { StatChartGatherOptions } from "../../../lib/tools/chartsConfig";
import "../../../lib/tools/china";

import "./index.css";

class StatChartGather extends React.Component {


  componentDidMount() {
    const {
      stat:{
        fetchStatCollectionSourceLoading,
        statCollectData
      }
    } = this.props;
    if (!fetchStatCollectionSourceLoading) {
      const { statChartGather } = this;
      const myChart = eCharts.init(statChartGather);
      myChart.setOption(StatChartGatherOptions(statCollectData));
    }
  }

  componentDidUpdate(){
    const {
      stat:{
        fetchStatCollectionSourceLoading,
        statCollectData
      }
    } = this.props;
    if (!fetchStatCollectionSourceLoading) {
      const { statChartGather } = this;
      const myChart = eCharts.init(statChartGather);
      myChart.setOption(StatChartGatherOptions(statCollectData));
    }
  }

  render() {
    const { stat: {fetchStatCollectSourceLoading }} = this.props;
    return (
      <div>
        {fetchStatCollectSourceLoading ? (
          <div className="stat-chart-gather-spin-container fl">
            <Spin/>
          </div>
        ) : (
          <div className="stat-chart-gather-container  fl">
            <div className="stat-chart-gather-title">
              <h4>采集来源</h4>
            </div>
            <div
              ref={(ref) => {this.statChartGather = ref;}}
              className="stat-chart-gather-content"
            />
          </div>
        )
        }
      </div>
    );
  }
}
export default StatChartGather;
