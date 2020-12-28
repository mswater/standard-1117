import React from "react";
import DetailsLeft from "../DetailsLeft/detailsLeft.jsx";

class DetailsContent extends React.Component {

  componentDidMount() {
  }

  render() {
    return (
      <div className="normal-main-with-bg basic">
        <div className="normal-main-con clear">
          <DetailsLeft {...this.props}/>
        </div>
      </div>
    );
  }
}
export default DetailsContent;
