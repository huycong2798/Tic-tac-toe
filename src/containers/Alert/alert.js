import {connect} from "react-redux";
import {alertActions} from "../../actions/Account";
import AlertComponent from "../../component/Alert/alert";

const mapStateToProps = state => ({
  AlertComponent: state.alertReducer,
});
const mapDispatchToProps = {
  clearAlerts: alertActions.clear,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AlertComponent);
