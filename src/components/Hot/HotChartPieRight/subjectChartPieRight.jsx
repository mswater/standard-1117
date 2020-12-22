import React from "react";
import eCharts from "echarts";
import { HotChartPieRightOptions } from "../../../lib/tools/chartsConfig";

import "./index.css";

class SubjectChartPieRight extends React.Component {


  componentDidMount() {
    const {
      subjectChartPieRight
    } = this;
    const {
      hot: {
        subjectSiteActivityMapData
      }
    } = this.props;
    const myChart = eCharts.init(subjectChartPieRight);
    myChart.setOption(HotChartPieRightOptions(subjectSiteActivityMapData));

  }

  componentDidUpdate() {
    const {
      subjectChartPieRight
    } = this;
    const {
      hot:{
        subjectSiteActivityMapData
      }
    } = this.props;
    const myChart = eCharts.init(subjectChartPieRight);
    myChart.setOption(HotChartPieRightOptions(subjectSiteActivityMapData));
  }

  render(){
    return (
      <div className="hot-chart-pie-right-container fr">
        <div className="hot-chart-pie-right-title">
          <h4>站点活跃度统计</h4>
        </div>
        <div
          ref={(ref) => {this.subjectChartPieRight = ref;}}
          className="hot-chart-pie-right-content"
        />
      </div>
    );
  }
}

export default SubjectChartPieRight;
