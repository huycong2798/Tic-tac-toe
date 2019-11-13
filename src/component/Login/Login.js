/* eslint-disable  */

import React from "react";
import {Link} from "react-router-dom";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";
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
    const responseFacebook = response => {
      console.log("fb--", response);
      const {email, name, picture} = response;

      const user = {};
      user.password = "thisissecret";
      user.email = email;
      user.name = name;
      user.urlAvatar = picture.data.url;
      this.props.register(user, true);
    };

    const responseGoogle = response => {
      try {
        console.log("fb--", response);
        const {email, name, imageUrl} = response.profileObj;
        const user = {};
        user.password = "thisissecret";
        user.email = email;
        user.name = name;
        user.urlAvatar = imageUrl;
        this.props.register(user, true);
      } catch (e) {
        console.log(e);
      }
    };
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
            <div className="btnSocial">
              <GoogleLogin
                className="ggBtnLogin"
                clientId="8719741269-j1nbufatfvl1067ghl99cjd4qv5ug796.apps.googleusercontent.com"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
              />
            </div>
            <div>
              <FacebookLogin
                cssClass="fBtnLogin"
                appId="875658396161898"
                fields="name,email,picture"
                icon="fa-facebook"
                callback={responseFacebook}
              />
            </div>
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
