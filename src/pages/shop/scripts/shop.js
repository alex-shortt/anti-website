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
import { useHash } from "./services/hash";

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
  const { hash, validHash } = useHash();

  return (
    <Container onClick={audio.firstPlay}>
      <Background />
      <ShopifyProvider>
        <Router>
          <Player audio={audio} />
          <Checkout />
          <Switch>
            <Route
              path="/shop"
              component={validHash ? ProductPage : ProductsPage}
              hash={hash}
            />
            {/*<Route path="/shop/:handle" component={ProductPage} />*/}
          </Switch>
        </Router>
      </ShopifyProvider>
    </Container>
  );
};

const domContainer = document.querySelector("#shop-page");
ReactDOM.render(<Shop />, domContainer);
