import React, { Component } from "react";
import styled from "styled-components";

const TitleContainer = styled.div`
  z-index: 1;
  max-width: 200px;
  height: 50px;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  animation: color-me-in 5s;
  background: black;
  @keyframes color-me-in {
    0% {
      background: orange;
    }
    100% {
      background: black;
    }
  }
`;
const TitleText = styled.h1`
  color: white;
  font-size: 24px;
  margin: 0;
  opacity: 1;
`;

class Splash extends Component {
  render() {
    return (
      <TitleContainer>
        <TitleText>Alex Atmore</TitleText>
      </TitleContainer>
    );
  }
}

export default Splash;
