import React from "react";
import {
  Form, Input, Button, Checkbox, Icon, message,
} from "antd";
import "./index.css";
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

  render() {
    const { form : { getFieldDecorator }, fetchGetLoginLoading } = this.props;
    return (
      <div className="login-box">
        <div className="login-content">
          <Form onSubmit={this.handleSubmit} className="login-form">
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
              <Button
                loading={fetchGetLoginLoading}
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                登录
              </Button>
            </Form.Item>
          </Form>
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
