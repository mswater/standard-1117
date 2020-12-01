import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Modal, Button} from "antd";
import { fetchGetExit } from "../../../store/action/LoginAction.js";

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
        history.push("/login");
        fetchGetExit(history);
      },
      onCancel() {
        console.log("Cancel Exit");
      },
    });
  }

  render() {
    const token = localStorage.getItem("token");
    const realName = localStorage.getItem("realName");
    const roleName = localStorage.getItem("roleName");
    return (
      <div className="top-r">
        <div className="user-info">
          <span>欢迎您！
            {realName ?
              (
                <a
                  rel="noopener noreferrer"
                  href={`/managecenter/user/editUser/1?uid=${token}`}
                  target="_blank"
                >
                  {realName}
                </a>
              ) : "游客"}
          </span>
          {realName ?
            (
              <Button onClick={() => this.showConfirm()}>退出</Button>
            ) : ""}
        </div>
        <div>
          <a
            className="personal-index"
            rel="noopener noreferrer"
            href={`/managecenter/homepage?uid=${token}`}
            target="_blank"
          >
            个人首页
          </a>
          |
          {roleName === "管理员" ?
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
