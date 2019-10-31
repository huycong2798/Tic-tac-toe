/* eslint-disable */
import React from "react";
import {Link} from "react-router-dom";
import "antd/dist/antd.css";
import "../../containers/Register/Register.css";
import {Form, Input, Select, Button} from "antd";
import loading from "../../gif/loading.gif";

const {Option} = Select;

class profileForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        this.props.edit(values);
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

    const {isUpdating} = prop.profileReducer;
    const {info, isLogged} = prop.userReducer;
    const profileUser = isLogged ? info.user : null;
    console.log("prop-----pròile", prop);
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
        <h1>Profile</h1>
        {isLogged && (
          <Form className="register-form " onSubmit={this.handleSubmit}>
            <Form.Item label="E-mail">
              <Input disabled value={profileUser.email} />
            </Form.Item>
            <Form.Item label="Name">
              {getFieldDecorator("name", {
                rules: [
                  {
                    required: true,
                    message: "Please input your Name!",
                    whitespace: true,
                  },
                ],
                initialValue: profileUser.name,
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Phone Number">
              {getFieldDecorator("p_number", {
                rules: [{required: true, message: "Please input your phone number!"}],
                initialValue: profileUser.p_number,
              })(<Input addonBefore={prefixSelector} style={{width: "100%"}} />)}
            </Form.Item>
            <Form.Item>
              {isUpdating && <img src={loading} />}
              <Button
                type="primary"
                disabled={isUpdating}
                htmlType="submit"
                className="register-form-button"
              >
                Edit
              </Button>
              <Link className="Link" to="/">
                Cancel
              </Link>
            </Form.Item>
          </Form>
        )}
      </div>
    );
  }
}

const profileComponent = Form.create({name: "profile"})(profileForm);

export default profileComponent;
