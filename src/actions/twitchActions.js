import fetch from "isomorphic-fetch";
import qs from "qs";
import { authId } from "../secrets/twitchConfig";

export const REQUEST_TOP_GAMES = "REQUEST_TOP_GAMES";
export const requestTopGames = () => {
  return {
    type: REQUEST_TOP_GAMES
  };
};
export const RECEIVE_TOP_GAMES = "RECEIVE_TOP_GAMES";
export const receiveTopGames = json => {
  const gameData = {};
  for (let i = 0; i < 10; i++) {
    const game = json.data[i];
    gameData[game.id] = game;
  }
  return {
    type: RECEIVE_TOP_GAMES,
    games: gameData,
    recievedAt: Date.now()
  };
};
export const GET_TOP_GAMES_ATTEMPT = "GET_TOP_GAMES_ATTEMPT";
export const GET_TOP_GAMES_SUCCESS = "GET_TOP_GAMES_SUCCESS";
export const GET_TOP_GAMES_ERROR = "GET_TOP_GAMES_ERROR";
export const getTopGames = () => (dispatch, getState) => {
  //get top 20 game data
  dispatch(requestTopGames());
  return fetch(`https://api.twitch.tv/helix/games/top.json`, {
    method: "get",
    headers: {
      "Client-ID": `${authId}`
    }
  })
    .then(response => response.json())
    .then(json => {
      dispatch(receiveTopGames(json));
      //select game_ids
      const state = getState();
      for (const game of Object.values(state.games)) {
        dispatch(getStreamData(game));
      }
    });
};
export const GET_STREAMS_ATTEMPT = "GET_STREAMS_ATTEMPT";
export const GET_STREAMS_SUCCESS = "GET_STREAMS_SUCCESS";
export const GET_STREAMS_ERROR = "GET_STREAMS_ERROR";

export const UPDATE_GAME_VIEWERS = "UPDATE_GAME_VIEWERS";
export const updateGameViewers = (game, viewers) => {
  return {
    type: UPDATE_GAME_VIEWERS,
    viewers: viewers,
    game: game
  };
};

export const getStreamData = game => dispatch => {
  return fetch(
    `https://api.twitch.tv/helix/streams?game_id=${game.id}&first=20`,
    {
      method: "get",
      headers: {
        "Client-ID": `${authId}`
      }
    }
  )
    .then(response => response.json())
    .then(json => {
      let viewers = 0;
      for (let i = 0; i < json.data.length; i++) {
        viewers += json.data[i].viewer_count;
      }
      dispatch(updateGameViewers(game, viewers));
    });
};
