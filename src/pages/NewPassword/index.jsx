import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import {
  Form, Input, Button, Icon,message
} from "antd";


import "./index.css";
import {
  fetchGetResetPassword,
  fetchPhoneNum
} from "./../../store/action/LoginAction.js";

class NewPassword extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      confirmDirty: false,
    };
  }

  componentDidMount() {
    message.config({
      top: 300,
      duration:1
    });
  }

  handleConfirmBlur = e => {
    const { value } = e.target;
    const {confirmDirty} = this.state;
    this.setState({ confirmDirty: confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue("password")) {
      callback("您输入的两个密码不一致!");
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    const {confirmDirty} = this.state;
    if (value && confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const {
      form,
      fetchGetResetPassword,
      history,
      login:{
        phoneNum
      }
    } =this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const { confirm } = fieldsValue;
      const params ={
        number:phoneNum,
        newPass:confirm
      };
      fetchGetResetPassword(params,history);
    });
  };

  toLogin = () => {
    const { props } = this;
    props.history.push("/login");
  };


  render() {
    const { form : { getFieldDecorator } } = this.props;
    return (
      <div className="forgot-box">
        <div className="forgot-content">
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              <div className="forgot-title">
                农业科技热点监测系统
              </div>
            </Form.Item>
            <Form.Item label="新密码" labelCol={{ span: 5 }} wrapperCol={{ span: 19 }}>
              {getFieldDecorator("password", {
                rules: [
                  {
                    required: true,
                    message: "请您输入新密码",
                  },
                  {
                    validator: this.validateToNextPassword,
                  },
                ],
              })(
                <Input.Password
                  prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }}/>}
                  placeholder="请您输入新密码"
                />,
              )}
            </Form.Item>
            <Form.Item
              label="确认密码"
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 19 }}
            >
              {getFieldDecorator("confirm", {
                rules: [
                  {
                    required: true,
                    message: "请您再次输入密码",
                  },
                  {
                    validator: this.compareToFirstPassword,
                  },
                ],
              })(
                <Input.Password
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }}/>
                  }
                  placeholder="请您再次输入密码"
                  onBlur={this.handleConfirmBlur}
                />,
              )}
            </Form.Item>
            <div className="login-form-forgot-box clear" style={{marginBottom: 0}}>
              <a
                className="fr"
                onClick={() => {return this.toLogin();}}
              >
                去登录
              </a>
            </div>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                确定
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
    login: state.login,
  };
};


export default connect(
  mapStateToProps,
  {
    fetchGetResetPassword,
    fetchPhoneNum
  },
)(withRouter(Form.create()(NewPassword)));

