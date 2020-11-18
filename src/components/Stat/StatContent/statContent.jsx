import React from "react";
import StatChartGather from "../StatChartGather/statChartGather.jsx";
import StatChartKeyword from "../StatChartKeyword/statChartKeyword.jsx";
import "./index.css";



class StatContent extends React.Component{
  componentDidMount() {
  }

  render() {
    return (
      <div className="stat-content">
        <div className="stat-content-main">
          <div className="clear">
            <StatChartGather {...this.props}/>
            <StatChartKeyword {...this.props}/>
          </div>
        </div>
      </div>
    );
  }
}

export default StatContent;
