import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Header from "../../components/Common/Header/header.jsx";
import Nav from "../../components/Common/Nav/nav.jsx";
import SubFooter from "../../components/Common/SubFooter/subFooter.jsx";
import BackTop from "../../components/Common/BackTop/BackTop.jsx";

import "./index.css";
import StatContent from "../../components/Stat/StatContent/statContent.jsx";
import {
  fetchStatCollectionSource,
  fetchKeySource
} from "../../store/action/StatAction";


class Stat extends React.Component{
  constructor(props) {
    super(props);
    this.state={};
  }

  componentDidMount() {
    this.node.scrollIntoView();
    const {
      props: {
        fetchStatCollectionSource,
        fetchKeySource
      },
    } = this;
    fetchStatCollectionSource();
    fetchKeySource();
  }

  render() {
    return (
      <div className="stat" ref={node => this.node = node}>
        <Header />
        <Nav />
        <StatContent {...this.props}/>
        <SubFooter />
        <BackTop />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    stat:state.stat,
  };
};

export default connect(
  mapStateToProps,
  {
    fetchStatCollectionSource,
    fetchKeySource
  },
)(withRouter(Stat));

