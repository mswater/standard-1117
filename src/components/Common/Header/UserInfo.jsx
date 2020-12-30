import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Modal, Tooltip, Button} from "antd";
import { fetchGetExit } from "../../../store/action/LoginAction.js";
import tipsImg from "../../../images/tips.png";

const { confirm } = Modal;

class UserInfo extends React.Component{
  constructor(props) {
    super(props);
    this.state = {};
  }

  showConfirm() {
    const {history, fetchGetExit} = this.props;
    confirm({
      title: "确定要退出吗?",
      content: "",
      onOk() {
        fetchGetExit(history);
      },
      onCancel() {
        console.log("Cancel Exit");
      },
    });
  }

  showLogin(){
    const {history} = this.props;
    history.push("/login");
  }

  render() {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const realName = localStorage.getItem("realName");
    const roleName = localStorage.getItem("roleName");
    const tips = () => {
      return (
        <div className="header-guest-tips">
          <p>尊敬的游客，</p>
          <p>您目前正在以游客身份访问本系统，浏览权限将受到部分限制：</p>
          <p>1、资料共享页面需登录后可进行访问；</p>
          <p>2、国内文献、海外文献浏览数量限制为500篇，如需浏览更多，请进行登录</p>
          <p>如需申请正式账号，请邮箱联系：agrihotspot@caas.cn</p>
        </div>
      );
    };
    return (
      <div className="top-r">
        <div className="user-info">
          {
            username === "guest" ?
              (
                <Tooltip placement="bottom" title={tips}>
                  欢迎您！<span className="name">{realName}</span><img alt="tips" src={tipsImg} />
                </Tooltip>
              ) :
              (
                <span>
                  欢迎您！
                  <a
                    className="name"
                    rel="noopener noreferrer"
                    href={`/managecenter/user/editUser/1?uid=${token}`}
                    target="_blank"
                  >
                    {realName}
                  </a>
                </span>
              )
          }
          {(username && username !== "guest") ?
            (
              <button
                type="button"
                className="ant-btn"
                onClick={() => this.showConfirm()}
              >
                <span>退出</span>
              </button>
            ) : (
              <Button className="btn-with-mr" onClick={() => this.showLogin()}>登录</Button>
            )}
        </div>
        <div>
          {(username && username !== "guest") ?
            (
              <a
                className="personal-index"
                rel="noopener noreferrer"
                href={`/managecenter/homepage?uid=${token}`}
                target="_blank"
              >
                个人主页
              </a>
            ) : ""}
          {(roleName && roleName.indexOf("管理员") !== -1) ? "|" : ""}
          {(roleName && roleName.indexOf("管理员") !== -1) ?
            (
              <a
                className="backstage"
                rel="noopener noreferrer"
                href={`/managecenter/center/list?uid=${token}`}
                target="_blank"
              >
                管理中心
              </a>
            ) : ""}
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
    fetchGetExit,
  },
)(withRouter(UserInfo));
