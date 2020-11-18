import React from "react";
import SearchContentTop from "../SearchContentTop/searchContentTop.jsx";
import SearchContentCenter from "../SearchContentCenter/searchContentCenter.jsx";
import SearchContentQuery from "../SearchContentQuery/searchContentQuery.jsx";
import SearchContentCheck from  "../SearchContentCheck/searchContentCheck.jsx";

import "./index.css";

class SearchContent extends React.Component{

  constructor(props) {
    super(props);
    this.state={
      clickIndex: 0,
    };
  }

  handlerIndex = (index) => {
    this.setState({
      clickIndex: index,
    });
  };


  render() {
    const { clickIndex } = this.state;
    return (
      <div className="search-content">
        <div className="search-content-main">
          <SearchContentTop {...this.props}/>
          <SearchContentCenter
            handlerIndex={this.handlerIndex}
            clickIndex={clickIndex}
            {...this.props}
          />
          <SearchContentQuery
            handlerIndex={this.handlerIndex}
            clickIndex={clickIndex}
            {...this.props}
          />
          <SearchContentCheck {...this.props}/>
        </div>
      </div>
    );
  }
}

export default SearchContent;
