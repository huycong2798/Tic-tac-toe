/* eslint-disable  */

import React from "react";
import "antd/dist/antd.css";
import "../../containers/Login/Login.css";
import {Form, Icon, Input, Button, Checkbox} from "antd";

class NormalLoginForm extends React.PureComponent {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <div>
        <h1>Login</h1>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator("username", {
              rules: [{required: true, message: "Please input your username!"}],
            })(
              <Input
              // prefix={<Icon type="user" style={{color: "rgba(0,0,0,.25)"}} />}
              // type="email"
              // placeholder="Username"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("password", {
              rules: [{required: true, message: "Please input your Password!"}],
            })(
              <Input
              // prefix={<Icon type="lock" style={{color: "rgba(0,0,0,.25)"}} />}
              // type="password"
              // placeholder="Password"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("remember", {
              valuePropName: "checked",
              initialValue: true,
            })(<Checkbox>Remember me</Checkbox>)}
            <a className="login-form-forgot" href="">
              Forgot password
            </a>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
            Or <a href="/register">register now!</a>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const Login = Form.create({name: "normal_login"})(NormalLoginForm);
export default Login;
