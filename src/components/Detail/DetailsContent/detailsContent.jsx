import React from "react";

import "./index.css";
import DetailsLeft from "../DetailsLeft/detailsLeft.jsx";
import DetailsRight from "../DetailsRight/detailsRight.jsx";


class DetailsContent extends React.Component {

  componentDidMount() {
  }

  render() {
    return (
      <div className="normal-main-with-bg">
        <div className="hot-details-content clear">
          <DetailsLeft {...this.props}/>
          <DetailsRight {...this.props}/>
        </div>
      </div>
    );
  }
}
export default DetailsContent;
