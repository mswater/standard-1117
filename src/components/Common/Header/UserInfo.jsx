import React from "react";

class UserInfo extends React.Component{
  constructor(props) {
    super(props);
    this.state = {};
  }

  loginLinkFunc = () => {
    /* eslint-disable no-restricted-globals */
    const { history,fetchGetExit } = this.props;
    const mesFlag = confirm("确定退出吗?");
    if(mesFlag === true){
      history.push("/login");
      fetchGetExit(history);
    }
  };

  render() {
    const token = localStorage.getItem("token");
    const realName = localStorage.getItem("realName");
    const roleName = localStorage.getItem("roleName");
    return (
      <div className="top-r">
        <div className="user-info">
          <span>欢迎您！
            <a
              rel="noopener noreferrer"
              href={`/managecenter/user/editUser/1?uid=${token}`}
              target="_blank"
            >
              {realName}
            </a>
          </span>
          <button type="button" onClick={() => this.loginLinkFunc()}>
            退出
          </button>
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
          <a
            className="backstage"
            rel="noopener noreferrer"
            href={`/managecenter/center/list?uid=${token}`}
            target="_blank"
          >
            {roleName === "管理员" ? "|管理中心" : ""}
          </a>
        </div>
      </div>
    );
  }
}

export default UserInfo;
