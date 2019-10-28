/* eslint-disable  */

import React from "react";
import {Link} from "react-router-dom";
import "antd/dist/antd.css";
import "../../containers/Login/Login.css";
import {Form, Icon, Input, Button, Checkbox} from "antd";
import loading from "../../gif/loading.gif";

class NormalLoginForm extends React.PureComponent {
  componentDidMount() {
    const prop = this.props;
    prop.logout();
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        this.props.login(values.email, values.password);
      }
    });
  };

  render() {
    const {isLogging} = this.props.LoginComponent;
    const {getFieldDecorator} = this.props.form;
    return (
      <div>
        <h1>Login</h1>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator("email", {
              rules: [{required: true, message: "Please input your email!"}],
            })(<Input type="email" placeholder="Email" />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("password", {
              rules: [{required: true, message: "Please input your Password!"}],
            })(<Input type="password" placeholder="Password" />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("remember", {
              valuePropName: "checked",
              initialValue: true,
            })(<Checkbox>Remember me</Checkbox>)}
            <a className="login-form-forgot" href="">
              Forgot password
            </a>
            {isLogging && <img src={loading} />}
            <Button
              type="primary"
              disabled={isLogging}
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
            Or
            <Link to="/register"> Register now!</Link>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const LoginComponent = Form.create({name: "normal_login"})(NormalLoginForm);
export default LoginComponent;
