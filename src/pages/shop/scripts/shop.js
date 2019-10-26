import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled from "styled-components";

import { ShopifyProvider } from "./services/shopify";

import Checkout from "./components/Checkout";
import ProductsPage from "./scenes/ProductsPage";
import Player from "./components/Player";
import ProductPage from "./scenes/ProductPage";
import { useAudio } from "./services/audio";

const Background = styled.div`
  background-image: url("https://d369ls1rsdbvlu.cloudfront.net/pictures/stars.png");
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
`;

const Container = styled.div`
  height: 100%;
  overflow-y: auto;
`;

const Shop = () => {
  const audio = useAudio();

  return (
    <Container>
      <Background />
      <ShopifyProvider>
        <Router>
          <div onClick={audio.firstPlay}>
            <Player audio={audio} />
            <Checkout />
            <div>
              <Switch>
                <Route exact path="/shop/" component={ProductsPage} />
                <Route path="/shop/:id" component={ProductPage} />
              </Switch>
            </div>
          </div>
        </Router>
      </ShopifyProvider>
    </Container>
  );
};

const domContainer = document.querySelector("#shop-page");
ReactDOM.render(<Shop />, domContainer);
