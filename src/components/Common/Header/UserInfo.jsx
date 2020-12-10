import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Modal, Button} from "antd";
import { fetchGetExit, fetchGuestLogin } from "../../../store/action/LoginAction.js";

const { confirm } = Modal;

class UserInfo extends React.Component{
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    const {fetchGuestLogin} = this.props;
    // 静默登录
    fetchGuestLogin();
  }

  showConfirm() {
    const {history, fetchGetExit} = this.props;
    confirm({
      title: "确定要退出吗?",
      content: "",
      onOk() {
        fetchGetExit();
        history.push("/");
      },
      onCancel() {
        console.log("Cancel Exit");
      },
    });
  }

  render() {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const realName = localStorage.getItem("realName");
    const roleName = localStorage.getItem("roleName");
    return (
      <div className="top-r">
        <div className="user-info">
          <span>欢迎您！
            {
              username === "guest" ? "游客" :
                (
                  <a
                    rel="noopener noreferrer"
                    href={`/managecenter/user/editUser/1?uid=${token}`}
                    target="_blank"
                  >
                    {realName}
                  </a>
                )
            }
          </span>
          {(username && username !== "guest") ?
            (
              <Button onClick={() => this.showConfirm()}>退出</Button>
            ) : ""}
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
          {roleName === "管理员" ?
            (
              <a
                className="backstage"
                rel="noopener noreferrer"
                href={`/managecenter/center/list?uid=${token}`}
                target="_blank"
              >
                |&emsp;管理中心
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
    fetchGuestLogin,
  },
)(withRouter(UserInfo));
