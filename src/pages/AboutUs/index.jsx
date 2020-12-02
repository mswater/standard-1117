import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import "./index.css";
import Header from "../../components/Common/Header/header.jsx";
import Nav from "../../components/Common/Nav/nav.jsx";

import {changeMenuItem,} from "../../store/action/AboutUsAction.js";

class AboutUs extends React.Component{
  constructor(props) {
    super(props);
    this.state = {};
  }

  changeItem(params){
    const {
      changeMenuItem,
    } = this.props;
    changeMenuItem(params);
  }

  render() {
    const {
      aboutus : {
        selectedMenuItem,
      }
    } = this.props;
    return (
      <div>
        <Header />
        <Nav />
        <div className="normal-main-with-bg clear">
          <div className="normal-main-con">
            <div className="left-menu fl">
              <h1>-&nbsp;关于我们&nbsp;-</h1>
              <ul>
                <li>
                  <a
                    className={selectedMenuItem === "1" ? "current" : ""}
                    onClick={() => this.changeItem("1")}
                  >
                    系统说明
                  </a>
                </li>
                <li>
                  <a
                    className={selectedMenuItem === "2" ? "current" : ""}
                    onClick={() => this.changeItem("2")}
                  >
                    版权声明
                  </a>
                </li>
                <li>
                  <a
                    className={selectedMenuItem === "3" ? "current" : ""}
                    onClick={() => this.changeItem("3")}
                  >
                    联系我们
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
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
    changeMenuItem,
  },
)(withRouter(AboutUs));
