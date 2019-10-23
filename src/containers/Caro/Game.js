import {connect} from "react-redux";
import * as actions from "../../actions/Caro";
import "./Game.css";
import Game from "../../component/Caro/Game";

const mapStateToProps = state => ({
  Game: state.gameReducer,
});
const mapDispatchToProps = dispatch => ({
  handleClick: i => {
    dispatch(actions.handleClick(i));
  },
  playAgain: () => {
    dispatch(actions.playAgain());
  },
  jumpTo: move => {
    dispatch(actions.jumpTo(move));
  },
  sort: () => {
    dispatch(actions.sort());
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);
