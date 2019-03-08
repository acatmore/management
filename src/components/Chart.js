import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { getTopGames } from "../actions/twitchActions";
import River from "./River";

class Chart extends Component {
  render() {
    return (
      <div>
        <button
          style={{ margin: 10 }}
          type="button"
          onClick={() => this.props.getData()}
        >
          Get Top Streams
        </button>
        <River />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  games: state.games
});
const mapDispatchToProps = dispatch => ({
  getData: () => {
    return dispatch(getTopGames());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chart);
