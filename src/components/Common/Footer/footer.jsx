import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Select } from "antd";
import "./index.css";
import { getMenuCode, } from "../../../lib/tools/utils.js";

const { Option } = Select;

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  navLinkFunc = (href) => {
    // 记录从首页底部导航进入会议列表页
    if(href === "/meeting"){
      localStorage.setItem("meetingFrom", "menu");
    }
    const { history } = this.props;
    history.push(href);
  };

  handleChange(value) {
    window.open(value,"_blank");
  }

  render() {
    const headerRouter = getMenuCode();
    return (
      <footer>
        <div className="footer-con">
          <div className="clear">
            <ul className="fl">
              <li
                className={headerRouter === "" ? "current" : ""}
              >
                <a onClick={() => this.navLinkFunc("/")}>
                  首页
                </a>
              </li>
              <li
                className={(headerRouter === "hot") ? "current" : ""}
              >
                <a onClick={() => this.navLinkFunc("/hot")}>
                  行业动态
                </a>
              </li>
              <li
                className={headerRouter === "meeting" ? "current" : ""}
              >
                <a onClick={() => this.navLinkFunc("/meeting")}>
                  会议信息
                </a>
              </li>
              <li
                className={headerRouter === "subject" ? "current" : ""}
              >
                <a onClick={() => this.navLinkFunc("/subject")}>
                  学科专题
                </a>
              </li>
              <li
                className={headerRouter === "report" ? "current" : ""}
              >
                <a onClick={() => this.navLinkFunc("/report")}>
                  学科快讯
                </a>
              </li>
              <li
                className={headerRouter === "literature" ? "current" : ""}
              >
                <a onClick={() => this.navLinkFunc("/literature")}>
                  资料共享
                </a>
              </li>
              <li
                className={headerRouter === "aboutus" ? "current" : ""}
              >
                <a onClick={() => this.navLinkFunc("/aboutus")}>
                  关于我们
                </a>
              </li>
            </ul>
            <div className="relation-link fr">
              <Select defaultValue="友情链接" style={{ width: 300 }} onChange={this.handleChange}>
                <Option value="http://agri.ckcest.cn/">农业专业知识服务系统</Option>
                <Option value="http://agrisearch.cn/home.htm">农科联盟资源共建共享平台</Option>
                <Option value="http://www.nais.net.cn/publish/default/">中国农业科技文献信息服务平台</Option>
                <Option value="http://www.nstl.gov.cn/">国家科技图书文献中心</Option>
                <Option value="http://www.agridata.cn/">国家农业科学数据共享中心</Option>
                <Option value="http://www.caas.net.cn/">中国农业科学院</Option>
                <Option value="http://www.cast.net.cn/">中国农业科技信息网</Option>
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
