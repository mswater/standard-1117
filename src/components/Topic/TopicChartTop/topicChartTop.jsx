import React from "react";
import eCharts from "echarts";
import { Spin } from "antd";
import "./index.css";
import { HotChartMiddleOptions } from "../../../lib/tools/chartsConfig";


class TopicChartTop extends React.Component {


  componentDidMount() {
    const {
      subject: {
        fetchSubjectDataTrendMapLoading,
        subjectTrendMapData
      },
    } = this.props;
    if(!fetchSubjectDataTrendMapLoading){
      const { hotChartMiddle } = this;
      const myChart = eCharts.init(hotChartMiddle);
      myChart.setOption(HotChartMiddleOptions(subjectTrendMapData));
    }
  }

  componentDidUpdate() {
    const {
      subject:{
        fetchSubjectDataTrendMapLoading,
        subjectTrendMapData
      },
    } = this.props;
    if(!fetchSubjectDataTrendMapLoading){
      const { hotChartMiddle } = this;
      const myChart = eCharts.init(hotChartMiddle);
      myChart.setOption(HotChartMiddleOptions(subjectTrendMapData));
    }
  }

  render() {
    const { subject: { fetchSubjectDataTrendMapLoading }} = this.props;
    return (
      <div>
        {fetchSubjectDataTrendMapLoading ? (
          <div className="topic-chart-middle-spin-container">
            <Spin/>
          </div>
        ) : (
          <div className="topic-chart-middle-container">
            <div className="topic-chart-middle-title">
              <h4>数据量趋势图</h4>
            </div>
            <div ref={(ref) => {this.hotChartMiddle = ref;}} className="hot-chart-middle-content"/>
          </div>
        )}
      </div>
    );
  }
}
export default TopicChartTop;
