import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopifyContext } from "../services/shopify";

export default function Nav(props) {
  const { toHome, toShop } = props;

  const { setCheckoutOpen } = useContext(ShopifyContext);

  return (
    <div className="nav">
      {toShop && (
        <Link to="/shop/" className="return">
          <button className="return">return</button>
        </Link>
      )}
      {toHome && (
        <a href="/" className="return">
          return
        </a>
      )}
      <img
        className="cart"
        onClick={() => setCheckoutOpen("true")}
        src={"../assets/pictures/svg/cart-white.svg"}
      />
    </div>
  );
}
