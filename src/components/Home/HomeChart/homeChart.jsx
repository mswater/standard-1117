import React from "react";
import eCharts from "echarts";
import { Spin } from "antd";

import { HomeChartsOptions } from "../../../lib/tools/chartsConfig.js";

import "./index.css";

class HomeChart extends React.Component {

  componentDidMount() {
    const {
      home: {
        fetchHotSubjectLoading,
        hotSubjectData
      },
    } = this.props;
    if(!fetchHotSubjectLoading){
      const { homeCharts } = this;
      const myChart = eCharts.init(homeCharts);
      myChart.setOption(HomeChartsOptions(hotSubjectData));
    }
  }

  componentDidUpdate() {
    const {
      home: {
        fetchHotSubjectLoading,
        hotSubjectData
      },
    } = this.props;
    if(!fetchHotSubjectLoading){
      const { homeCharts } = this;
      const myChart = eCharts.init(homeCharts);
      myChart.setOption(HomeChartsOptions(hotSubjectData));
    }
  }

  render(){
    const { home:{ fetchHotSubjectLoading }} = this.props;
    return (
      <div>
        {fetchHotSubjectLoading ? (
          <div className="home-chart-middle-spin-container">
            <Spin/>
          </div>
        ) : (
          <div className="home-chart-container">
            <div
              ref={(ref) => {this.homeCharts = ref;}}
              className="home-chart"
            />
          </div>
        )
        }
      </div>
    );
  }
}

export default HomeChart;
