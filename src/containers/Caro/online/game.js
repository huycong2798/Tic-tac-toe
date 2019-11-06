import {connect} from "react-redux";
import {userActions} from "../../../actions/Account";
import GameOnlineComponent from "../../../component/Caro/Online/Game";
import "./game.css";

const mapStateToProps = state => ({
  userReducer: state.userReducer,
});
const mapDispatchToProps = {
  getMe: userActions.getMe,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameOnlineComponent);
