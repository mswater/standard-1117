import React from "react";
import {
  Form, Input, Button, Checkbox, Icon, message,
} from "antd";
import "./index.css";
import { DownOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import {
  fetchGetLogin
} from "./../../store/action/LoginAction.js";


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    message.config({
      top: 300,
      duration:0.1
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { form, fetchGetLogin,history} =this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const { username, password } = fieldsValue;
      const params = {
        username,
        password
      };
      fetchGetLogin(params,history);
    });
  };

  forgotPassword = () => {
    const { props } = this;
    props.history.push("/forgot");
  };

  goHome(){
    const { props } = this;
    props.history.push("/");
  }

  render() {
    const { form : { getFieldDecorator }, fetchGetLoginLoading } = this.props;
    return (
      <div className="login-box">
        <div className="login-content">
          <div className="login-form-con">
            <Form onSubmit={this.handleSubmit} className="login-form clear">
              <Form.Item>
                <div className="login-title">
                  农业科技热点监测系统
                </div>
              </Form.Item>
              <Form.Item label="账号" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
                {getFieldDecorator("username", {
                  rules: [{ required: true, message: "请您输入账号" }],
                })(
                  <Input
                    prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }}/>}
                    placeholder="请您输入账号"
                  />,
                )}
              </Form.Item>
              <Form.Item label="密码" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
                {getFieldDecorator("password", {
                  rules: [{ required: true, message: "请您输入密码" }],
                })(
                  <Input
                    type="password"
                    prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }}/>}
                    placeholder="请您输入密码"
                  />,
                )}
              </Form.Item>
              <Form.Item className="small-item">
                {getFieldDecorator("remember", {
                  valuePropName: "checked",
                  initialValue: false,
                })(
                  <Checkbox>下次自动登录</Checkbox>,
                )}
                <a
                  className="login-form-forgot"
                  onClick={() => {return this.forgotPassword();}}
                >
                  忘记密码
                </a>
                <div className="clear">
                  <Button
                    className="back-btn"
                    onClick={() => {return this.goHome();}}
                  >
                    返回首页
                  </Button>
                  <Button
                    loading={fetchGetLoginLoading}
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                  >
                    登录
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </div>
          <div className="login-guest-tips">
            <p>尊敬的访客，如不进行登录，您将以游客身份访问本系统，浏览权限将受到部分限制：</p>
            <p>1、资料共享页面需登录后可进行访问；</p>
            <p>2、国内文献、海外文献浏览数量限制为500篇，如需浏览更多，请进行登录</p>
            <p>如需申请正式账号，请邮箱联系：jinhuimin@caas.cn</p>
            <DownOutlined />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    fetchGetLoginLoading: state.login.fetchGetLoginLoading
  };
};

export default connect(
  mapStateToProps,
  {
    fetchGetLogin
  },
)(withRouter(Form.create()(Login)));
