import React from "react";
import { Spin } from "antd";
import eCharts from "echarts";

import "./index.css";
import { HotChartMiddleOptions } from "../../../lib/tools/chartsConfig";

class SubjectChartMiddle extends React.Component {


  componentDidMount() {
    const {
      hot:{
        fetchSubjectDataTrendMapLoading,
        subjectTrendMapData
      },
    } = this.props;
    if (!fetchSubjectDataTrendMapLoading){
      const { subjectChartMiddle } = this;
      const myChart = eCharts.init(subjectChartMiddle);
      myChart.setOption(HotChartMiddleOptions(subjectTrendMapData));
    }
  }

  componentDidUpdate() {
    const {
      hot:{
        fetchSubjectDataTrendMapLoading,
        subjectTrendMapData
      },
    } = this.props;
    if (!fetchSubjectDataTrendMapLoading){
      const { subjectChartMiddle } = this;
      const myChart = eCharts.init(subjectChartMiddle);
      myChart.setOption(HotChartMiddleOptions(subjectTrendMapData));
    }
  }

  render() {
    const { hot:{ fetchSubjectDataTrendMapLoading }} = this.props;
    return (
      <div>
        {fetchSubjectDataTrendMapLoading ? (
          <div className="hot-chart-middle-spin-container">
            <Spin/>
          </div>
        ) : (
          <div className="hot-chart-middle-container">
            <div className="hot-chart-middle-title">
              <h4>数据量趋势图</h4>
            </div>
            <div
              ref={(ref) => {this.subjectChartMiddle = ref;}}
              className="hot-chart-middle-content"
            />
          </div>
        )
        }
      </div>
    );
  }
}
export default SubjectChartMiddle;
