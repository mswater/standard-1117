import React from "react";
import "./index.css";

class IndexConTitle extends React.Component{
  constructor(props) {
    super(props);
    this.state = {};
  }

  render(){
    const {title} = this.props;
    return (
      <div className="ms-main-title">
        <h1>{title.main}</h1>
        <h2>{title.sub}</h2>
      </div>
    );
  }
}

export default IndexConTitle;
