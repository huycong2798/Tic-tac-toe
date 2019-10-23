import {connect} from "react-redux";
import {userActions} from "../../actions/Account";
import registerComponent from "../../component/Register/register";

const mapStateToProps = state => ({
  registerComponent: state.registerReducer,
});
const mapDispatchToProps = {
  register: userActions.register,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(registerComponent);
