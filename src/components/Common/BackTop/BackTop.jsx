/* eslint-disable react/prefer-stateless-function */
import React, { Component } from "react";
import subTopImg from "../../../images/top-sub.png";

import "./BackTop.css";

export default class BackTop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowTop: false
    };
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentWillMount() {
    window.addEventListener("scroll", this.handleScroll,true);
  }

  componentWillUnmount () {
    window.removeEventListener("scroll", this.handleScroll,true);
  }

  backTop = () =>{
    document.body.scrollTop = 0;
    this.setState({
      isShowTop: false
    });
  };


  handleScroll = () =>{
    // 变量
    const { isShowTop } = this.state;
    const { scrollTop } = document.body;
    if (scrollTop < 600 && isShowTop) {
      this.setState({
        isShowTop: false
      });
    }
    if (scrollTop > 600 && !isShowTop) {
      this.setState({
        isShowTop: true
      });
    }
  };

  render() {
    const { isShowTop } = this.state;
    return (
      <div
        onClick={this.backTop}
        className={isShowTop ? "back-top-show" : "back-top-none"}
      >
        <img src={subTopImg} alt=""/>
      </div>
    );
  }
}

