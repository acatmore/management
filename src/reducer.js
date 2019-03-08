import {
  RECEIVE_TOP_GAMES,
  UPDATE_GAME_VIEWERS
} from "./actions/twitchActions";
const DEFAULT_STATE = { games: {} };

export default function reducer(state = DEFAULT_STATE, action) {
  if (action.type === RECEIVE_TOP_GAMES) {
    return {
      ...state,
      //we want to overwrite old game data
      games: action.games
    };
  }
  if (action.type === UPDATE_GAME_VIEWERS) {
    const game = action.game;
    const gameId = action.game.id;
    return {
      ...state,
      games: { ...state.games, [gameId]: { ...game, viewers: action.viewers } }
    };
  }
  return state;
}
