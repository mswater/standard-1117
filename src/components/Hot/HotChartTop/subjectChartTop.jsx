import React from "react";
import eCharts from "echarts";
import { Spin } from "antd";
import { HotChartTopOptions } from "../../../lib/tools/chartsConfig";
import "../../../lib/tools/china";

import "./index.css";


class SubjectChartTop extends React.Component {

  componentDidMount() {
    const {
      hot:{
        subjectSiteMapData,
        fetchSubjectSiteMapLoading
      }
    } = this.props;
    if (!fetchSubjectSiteMapLoading) {
      const { subjectChartTop} = this;
      const myChart = eCharts.init(subjectChartTop);
      myChart.setOption(HotChartTopOptions(subjectSiteMapData));
    }
  }

  componentDidUpdate() {
    const {
      hot:{
        subjectSiteMapData,
        fetchSubjectSiteMapLoading
      }
    } = this.props;
    if (!fetchSubjectSiteMapLoading) {
      const { subjectChartTop } = this;
      const myChart = eCharts.init(subjectChartTop);
      myChart.setOption(HotChartTopOptions(subjectSiteMapData));
    }
  }

  render() {
    const { hot: { fetchSubjectSiteMapLoading }} = this.props;
    return (
      <div>
        {fetchSubjectSiteMapLoading ? (
          <div className="hot-chart-middle-spin-container">
            <Spin/>
          </div>
        ) : (
          <div className="hot-chart-top-container">
            <div className="hot-chart-top-title">
              <h4>地域热力图</h4>
            </div>
            <div
              ref={(ref) => {this.subjectChartTop = ref;}}
              className="hot-chart-top-content"
            />
          </div>
        )
        }
      </div>
    );
  }
}
export default SubjectChartTop;
