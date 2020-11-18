import React from "react";
import eCharts from "echarts";
import { Spin } from "antd";
import { StatChartKeywordOptions } from "../../../lib/tools/chartsConfig";
import "../../../lib/tools/china";

import "./index.css";


class StatChartKeyword extends React.Component {


  componentDidMount() {
    const {
      stat:{
        fetchKeySourceLoading,
        keySourceData
      }
    } = this.props;
    if (!fetchKeySourceLoading) {
      const { statChartKeyword } = this;
      const myChart = eCharts.init(statChartKeyword);
      myChart.setOption(StatChartKeywordOptions(keySourceData));
    }
  }

  componentDidUpdate() {
    const {
      stat:{
        fetchKeySourceLoading,
        keySourceData
      }
    } = this.props;
    if (!fetchKeySourceLoading) {
      const { statChartKeyword } = this;
      const myChart = eCharts.init(statChartKeyword);
      myChart.setOption(StatChartKeywordOptions(keySourceData));
    }
  }

  render() {
    const { stat: {fetchKeySourceLoading }} = this.props;
    return (
      <div>
        {fetchKeySourceLoading ? (
          <div className="stat-chart-keyword-spin-container">
            <Spin/>
          </div>
        ) : (
          <div className="stat-chart-keyword-container  fr">
            <div className="stat-chart-keyword-title">
              <h4>关键词来源</h4>
            </div>
            <div
              ref={(ref) => {this.statChartKeyword = ref;}}
              className="stat-chart-keyword-content"
            />
          </div>
        )
        }
      </div>
    );
  }
}
export default StatChartKeyword;
