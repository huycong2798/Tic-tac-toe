/* eslint-disable  */
import React from "react";
import "antd/dist/antd.css";
import "../../containers/Register/Register.css";
import {Form, Input, Tooltip, Icon, Select, Checkbox, Button} from "antd";
import loading from "../../gif/loading.gif";

const {Option} = Select;

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        this.props.register(values);
      }
    });
  };

  handleConfirmBlur = e => {
    const {value} = e.target;
    this.setState({confirmDirty: this.state.confirmDirty || !!value});
  };

  compareToFirstPassword = (rule, value, callback) => {
    const {form} = this.props;
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const {form} = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], {force: true});
    }
    callback();
  };

  render() {
    const prop = this.props;
    const {registering} = prop.registerComponent;

    const {getFieldDecorator} = this.props.form;
    const prefixSelector = getFieldDecorator("prefix", {
      initialValue: "84",
    })(
      <Select style={{width: 70}}>
        <Option value="84">+84</Option>
      </Select>
    );

    return (
      <div>
        <h1>Register</h1>
        <Form className="register-form " onSubmit={this.handleSubmit}>
          <Form.Item label="E-mail">
            {getFieldDecorator("email", {
              rules: [
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="Password" hasFeedback>
            {getFieldDecorator("password", {
              rules: [
                {
                  required: true,
                  message: "Please input your password!",
                },
                {
                  validator: this.validateToNextPassword,
                },
              ],
            })(<Input.Password />)}
          </Form.Item>
          <Form.Item label="Confirm Password" hasFeedback>
            {getFieldDecorator("confirm", {
              rules: [
                {
                  // required: true,
                  message: "Please confirm your password!",
                },
                {
                  validator: this.compareToFirstPassword,
                },
              ],
            })(<Input.Password onBlur={this.handleConfirmBlur} />)}
          </Form.Item>
          <Form.Item
          // label={
          //   <span>
          //     Nickname&nbsp;
          //     <Tooltip title="What do you want others to call you?">
          //       <Icon type="question-circle-o" />
          //     </Tooltip>
          //   </span>
          // }
          >
            {getFieldDecorator("nickname", {
              rules: [
                {
                  //   required: true,
                  message: "Please input your nickname!",
                  whitespace: true,
                },
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="Phone Number">
            {getFieldDecorator("phone", {
              rules: [{message: "Please input your phone number!"}],
            })(<Input addonBefore={prefixSelector} style={{width: "100%"}} />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("agreement", {
              valuePropName: "checked",
            })(
              <Checkbox>
                I have read the <a href="">agreement</a>
              </Checkbox>
            )}
          </Form.Item>
          <Form.Item>
            {registering && <img src={loading} />}
            <Button
              type="primary"
              disabled={registering}
              htmlType="submit"
              className="register-form-button"
            >
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const registerComponent = Form.create({name: "register"})(RegistrationForm);

export default registerComponent;
