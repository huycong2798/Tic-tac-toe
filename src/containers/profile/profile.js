import {connect} from "react-redux";
import {userActions} from "../../actions/Account";
import profileComponent from "../../component/Profile/profile";

const mapStateToProps = state => ({
  userReducer: state.userReducer,
  profileReducer: state.profileReducer,
});
const mapDispatchToProps = {
  getMe: userActions.getMe,
  edit: userActions.edit,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(profileComponent);
