import {connect} from "react-redux";
import {userActions} from "../../actions/Account";
import navBarComponent from "../../component/navBar/navBar";

const mapStateToProps = state => ({
  navBarComponent: state.userReducer,
});
const mapDispatchToProps = {
  getMe: userActions.getMe,
  logout: userActions.logout,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(navBarComponent);
