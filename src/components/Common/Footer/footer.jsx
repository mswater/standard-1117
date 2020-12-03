import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Select } from "antd";
import "./index.css";

const { Option } = Select;

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // navToPersonal = (token) => {
  //   window.open(`/managecenter/homepage?uid=${token}`, "_self");
  // };
  //
  // navToBrief = (token) => {
  //   window.open(`/managecenter/brief?uid=${token}`, "_self");
  // };

  handleChange(value) {
    console.log(`selected ${value}`);
  }

  render() {
    // const token = localStorage.getItem("token");
    return (
      <footer>
        <div className="footer-con">
          <div className="clear">
            <ul className="fl">
              <li>
                <a>首页</a>
              </li>
              <li>
                <a>行业动态</a>
              </li>
              <li>
                <a>会议信息</a>
              </li>
              <li>
                <a>学科专题</a>
              </li>
              <li>
                <a>学科快讯</a>
              </li>
              <li>
                <a>资料共享</a>
              </li>
              <li>
                <a>关于我们</a>
              </li>
              <li>
                <a>个人主页</a>
              </li>
            </ul>
            <div className="relation-link fr">
              <Select defaultValue="友情链接" style={{ width: 300 }} onChange={this.handleChange}>
                <Option value="1">中科院</Option>
                <Option value="2">中科院</Option>
                <Option value="3">某大学</Option>
              </Select>
            </div>
          </div>
          <p className="company-info">主办单位：中国农业科学院农业信息研究所&emsp;&emsp;&emsp;技术支持：同方知网（北京）技术有限公司</p>
        </div>
      </footer>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    ...state
  };
};

export default connect(
  mapStateToProps,
  null
)(withRouter(Footer));
