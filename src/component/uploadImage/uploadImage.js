// import React from "react";
// import {Upload, Button, message} from "antd";
// import "antd/dist/antd.css";
// import "../../containers/uploadImage/uploadImage.css";
// import storage from "../../firebase/index";

// function getBase64(img, callback) {
//   const reader = new FileReader();
//   reader.addEventListener("load", () => callback(reader.result));
//   reader.readAsDataURL(img);
// }

// function beforeUpload(file) {
//   const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
//   if (!isJpgOrPng) {
//     message.error("You can only upload JPG/PNG file!");
//   }
//   const isLt3M = file.size / 1024 / 1024 < 3;
//   if (!isLt3M) {
//     message.error("Image must smaller than 3MB!");
//   }
//   return isJpgOrPng && isLt3M;
// }

// class uploadImageComponent extends React.Component {
//   state = {
//     loading: false,
//     uploadNew: false,
//   };

//   handleChange = info => {
//     if (info.file.status === "uploading") {
//       this.setState({loading: true});
//       return;
//     }
//     if (info.file.status === "done") {
//       // Get this url from response in real world.
//       getBase64(info.file.originFileObj, imageUrl =>
//         this.setState({
//           imageUrl,
//           loading: false,
//           image: info.file,
//           uploadNew: true,
//         })
//       );
//       console.log("info-----", info.file);
//     }
//   };

//   handleUpload = () => {
//     const {image} = this.state;
//     console.log(image.name);
//     const uploadTask = storage.ref(`images/${image.name}`).put(image);
//     uploadTask.on(
//       "state_changed",
//       snapshot => {
//         // progrss function ....
//         const progress = Math.round(
//           (snapshot.bytesTransferred / snapshot.totalBytes) * 100
//         );
//         this.setState({progress});
//       },
//       error => {
//         // error function ....
//         console.log(error);
//       },
//       () => {
//         // complete function ....
//         storage
//           .ref("images")
//           .child(image.name)
//           .getDownloadURL()
//           .then(url => {
//             console.log(url);
//             this.setState({url});
//           });
//       }
//     );
//   };
//   // handleChangei = e => {
//   //   if (e.target.files[0]) {
//   //     const image = e.target.files[0];
//   //     console.log("info-----input", image);
//   //    // this.setState(() => ({image}));
//   //   }
//   // }

//   render() {
//     const {imageUrl} = this.state;
//     console.log("upload prop---", this.state);
//     return (
//       <div>
//         <Upload
//           name="avatar"
//           listType="picture-card"
//           className="avatar-uploader"
//           showUploadList={false}
//           action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
//           beforeUpload={beforeUpload}
//           onChange={this.handleChange}
//         >
//           {imageUrl ? (
//             <img src={imageUrl} alt="avatar" style={{width: "100%", height: "100%"}} />
//           ) : (
//             <img style={{width: "100%", height: "100%"}} src={this.props.urlAvatar} />
//           )}
//         </Upload>
//         <Button disabled={!this.state.uploadNew} onClick={this.handleUpload}>
//           Upload
//         </Button>
//       </div>
//     );
//   }
// }
// export default uploadImageComponent;
