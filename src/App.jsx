/* eslint-disable react/prefer-stateless-function */
import React, { Component } from "react";
import { ConfigProvider } from "antd";
import zhCn from "antd/lib/locale-provider/zh_CN";
import Router from "./routes/index.js";

export default class App extends Component {
  render() {
    return <ConfigProvider locale={zhCn}><Router key="routes" /></ConfigProvider>;
  }
}

