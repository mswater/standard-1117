import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import "./index.css";
import Header from "../../components/Common/Header/header.jsx";
import Nav from "../../components/Common/Nav/nav.jsx";
import Footer from "../../components/Common/Footer/footer.jsx";

class Report extends React.Component{

  constructor(props){
    super(props);
    this.state = {};
  }

  render(){
    return (
      <div>
        <Header />
        <Nav />
        <div>
          学科快讯222
        </div>
        <Footer />
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    ...state
  };
};

export default connect(
  mapStateToProps,
  {
  },
)(withRouter(Report));

