import React from "react";
import styled from "styled-components";
import Card from "./Card";
import { connect } from "react-redux";

const River = props => {
  if (props.games) {
    return (
      <div style={{ display: "flex" }}>
        {Object.entries(props.games).map((game, index) => (
          <Card data={game[1]} key={index} />
        ))}
      </div>
    );
  }
};

const mapStateToProps = state => ({
  games: state.games
});

export default connect(mapStateToProps)(River);
