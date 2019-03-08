import React, { Component } from "react";
import styled from "styled-components";
import Splash from "./components/Splash";
import images from "./assets/images";
import River from "./components/River";
import Chart from "./components/Chart";
import { Provider } from "react-redux";
import store from "./store";

const BackgroundImage = styled.div`
  width: 100vw;
  height: 100vh;
  margin: 0;
  top: 0;
  right: 0;
  background-image: url(${images.background});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  z-index: -1;
`;
const Background = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: space-between;
  background-color: #10171e;
`;

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Background>
          {/* <River position={"top"} /> */}
          {/* <River position={"bottom"} /> */}
          <Chart />
        </Background>
      </Provider>
    );
  }
}

export default App;
