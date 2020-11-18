import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import {
  Form, Input, Button, Row, Col, Icon,message
} from "antd";


import "./index.css";
import {
  fetchGetSendMessage,
  fetchPhoneNum,
  fetchCodeNum,
  fetchGetVerCode,
} from "./../../store/action/LoginAction.js";

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    message.config({
      top: 300,
      duration:0.1
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {
      form,
      fetchGetVerCode,
      history,
    } =this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const { verification, phone } = fieldsValue;
      const params ={
        number:phone,
        verCode:verification
      };
      fetchGetVerCode(params,history);
    });
  };

  toLogin = () => {
    const { props } = this;
    props.history.push("/login");
  };

  valueChange = (e) => {
    const {
      fetchPhoneNum,
    } = this.props;
    fetchPhoneNum(e.target.value);;
  };

  codeChange = (e) => {
    const {
      fetchCodeNum,
    } = this.props;
    fetchCodeNum(e.target.value);;
  };

  verificationCode = () => {
    const {
      history,
      fetchGetSendMessage,
      login:{
        phoneNum
      }
    } = this.props;
    const params ={
      type:1,
      number:phoneNum
    };
    fetchGetSendMessage(params,history);
  };


  render() {
    const { form : { getFieldDecorator } } = this.props;
    return (
      <div className="forgot-box">
        <div className="forgot-content">
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              <div className="forgot-title">
                行业信息监测与分析系统
              </div>
            </Form.Item>
            <div className="forgot-info">
              请输入手机号进行验证
            </div>
            <Form.Item label="手机号" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
              {getFieldDecorator("phone", {
                rules: [{ required: true, message: "请您输入手机号" }],
              })(
                <Input
                  prefix={<Icon type="phone" style={{ color: "rgba(0,0,0,.25)" }}/>}
                  placeholder="请您输入手机号"
                  onChange={this.valueChange}
                />,
              )}
            </Form.Item>
            <Form.Item
              label="验证码"
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 20 }}
            >
              <Row gutter={8}>
                <Col span={16}>
                  {getFieldDecorator("verification", {
                    rules: [{ required: true, message: "请您输入验证码" }],
                  })(
                    <Input
                      prefix={
                        <Icon type="safety-certificate" style={{ color: "rgba(0,0,0,.25)" }}/>
                      }
                      placeholder="请您输入验证码"
                      onChange={this.codeChange}
                    />,
                  )}
                </Col>
                <Col span={8}>
                  <Button
                    type="primary"
                    style={{width: "100%"}}
                    onClick={() => {return this.verificationCode();}}
                  >
                    获取验证码
                  </Button>
                </Col>
              </Row>
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
    fetchGetLoginLoading: state.login.fetchGetLoginLoading
  };
};


export default connect(
  mapStateToProps,
  {
    fetchGetSendMessage,
    fetchPhoneNum,
    fetchCodeNum,
    fetchGetVerCode,
  },
)(withRouter(Form.create()(ForgotPassword)));

