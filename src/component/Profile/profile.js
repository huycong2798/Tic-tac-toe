/* eslint-disable */
import React from "react";
import {Link} from "react-router-dom";
import "antd/dist/antd.css";
import "../../containers/profile/profile.css";
import {Form, Input, Select, Button, Upload} from "antd";
import loading from "../../gif/loading.gif";
import {storage} from "../../firebase";

const {Option} = Select;

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt3M = file.size / 1024 / 1024 < 3;
  if (!isLt3M) {
    message.error("Image must smaller than 3MB!");
  }
  return isJpgOrPng && isLt3M;
}
class profileForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      progress: 0,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const {urlImage} = this.state;
        values.urlAvatar = urlImage ? urlImage : values.urlAvatar;
        console.log("Received values of form: ", values);
        this.props.edit(values);
      }
    });
  };
  handleChange = info => {
    console.log("hereee", info.file);
    if (info.file.status === "done") {
      const image = info.file.originFileObj;
      console.log("yeahhhh", image.name);
      //this.setState(() => ({image}));
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      uploadTask.on(
        "state_changed",
        snapshot => {
          // progrss function ....
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          this.setState({progress});
        },
        error => {
          // error function ....
          console.log(error);
        },
        () => {
          // complete function ....
          storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then(urlImage => {
              console.log("urlImage", urlImage);
              this.setState({urlImage});
            });
        }
      );
    }
  };

  render() {
    const prop = this.props;

    const {isUpdating} = prop.profileReducer;
    const {info, isLogged} = prop.userReducer;
    ("");
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
    const urlAvatar = profileUser
      ? getFieldDecorator("urlAvatar", {
          initialValue: profileUser.urlAvatar,
        })
      : null;
    const {urlImage} = this.state;
    const style = {
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    };
    return (
      <div>
        <h1>Profile</h1>
        {isLogged && (
          <Form className="register-form " onSubmit={this.handleSubmit}>
            <Form.Item label="Avatar">
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
              >
                {urlImage ? (
                  <img
                    src={urlImage}
                    alt="avatar"
                    style={{width: "100%", height: "100%"}}
                  />
                ) : (
                  <img
                    style={{width: "100%", height: "100%"}}
                    src={profileUser.urlAvatar}
                  />
                )}
              </Upload>
              <progress value={this.state.progress} max="100" />
            </Form.Item>
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
