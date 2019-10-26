import React, { useEffect } from "react";
import ProductImages from "../components/ProductImages";
import Product from "../components/Product";

export default function ProductPage(props) {
  const {
    setOnProductPage,
    products,
    checkout,
    setCheckout,
    setCheckoutStatus,
    client,
    currentProduct,
    setCurrentProduct,
    selectedVariant,
    setProductVariants,
    setSelectedVariant,
    match
  } = props;

  useEffect(() => {
    setOnProductPage(true);
    products.map((p, i) => {
      if (p.id === match.params.id) {
        setCurrentProduct(p);
      }
    });
  }, []);

  return (
    <div className="shop-page__container-responsive-product">
      <ProductImages currentProduct={currentProduct} />
      <Product
        checkout={checkout}
        setCheckout={setCheckout}
        setCheckoutStatus={setCheckoutStatus}
        client={client}
        currentProduct={currentProduct}
        setCurrentProduct={setCurrentProduct}
        selectedVariant={selectedVariant}
        setSelectedVariant={setSelectedVariant}
      />
    </div>
  );
}
