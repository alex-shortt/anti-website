import React from "react";
import ReactDOM from "react-dom"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

const history = History.createBrowserHistory();

import { ShopifyProvider } from "./services/shopify";

import Checkout from "./components/Checkout";
import TubeHologram from "./scenes/TubeHologram";
import Player from "./components/Player";
import ProductPage from "./scenes/ProductPage";
import { useAudio } from "./services/audio";

const Shop = () => {
  const audio = useAudio();

  return (
    <ShopifyProvider>
      <Router history={history}>
        <div
          style={{
            width: "100%",
            height: "100%",
            overflowY: "auto",
            overflowX: "hidden"
          }}
          onClick={audio.firstPlay}
        >
          <Player audio={audio} />
          <Checkout />
          <div>
            <Switch>
              <Route exact path="/" render={TubeHologram} />
              {/*<Route path="/:id" render={ProductPage} />*/}
            </Switch>
          </div>
        </div>
      </Router>
    </ShopifyProvider>
  );
};

const domContainer = document.querySelector("#shop-page");
ReactDOM.render(<Shop />, domContainer);
