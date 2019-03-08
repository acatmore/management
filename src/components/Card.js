import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

const BorderContainer = styled.div`
  border: solid 1px white;
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 10vw;
  height: 50vh;
  justify-content: space-around;
  align-items: center;
`;
const TitleText = styled.h1`
  color: white;
  font-size: 1em;
  margin: 5;
  opacity: 1;
`;
const GameImg = styled.img``;
const LiveContainer = styled.div`
  height: 50px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  flex-wrap: nowrap;
`;
const Card = props => {
  const width = "100%";
  const height = "auto";
  if (props.data !== undefined) {
    return (
      <BorderContainer>
        <LiveContainer>
          <TitleText>{props.data.name}</TitleText>
          {props.data.viewers ? (
            <TitleText>Live: {props.data.viewers}</TitleText>
          ) : (
            <div />
          )}
        </LiveContainer>
        <GameImg
          src={`${props.data.box_art_url
            .replace("{width}", "200")
            .replace("{height}", "200")}`}
          alt="game img"
          width={width}
          height={height}
        />
      </BorderContainer>
    );
  } else {
    return <div />;
  }
};
const mapStateToProps = state => ({});

export default connect(mapStateToProps)(Card);
