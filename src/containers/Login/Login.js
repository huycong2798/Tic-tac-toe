import {connect} from "react-redux";
import {userActions} from "../../actions/Account";
import LoginComponent from "../../component/Login/Login";

const mapStateToProps = state => ({
  LoginComponent: state.loginReducer,
});
const mapDispatchToProps = {
  login: userActions.login,
  logout: userActions.logout,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginComponent);
