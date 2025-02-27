import React from "react";
import ProductHeader from "../components/header/index";
import ProductsList from "../components/productsList/index"
import Cart from "../components/cart/index"

function App() {

  return (
    <>
      <ProductHeader />
      <ProductsList />
      <Cart />
    </>
  );
}

export default App;
