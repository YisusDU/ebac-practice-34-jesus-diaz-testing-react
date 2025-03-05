import React from "react";
import ProductHeader from "../components/header/index";
import ProductsList from "../components/productsList/index"
import Cart from "../components/cart/index"
import { useDispatch, useSelector } from "react-redux";
import { addProduct, removeProduct, toggleCart } from "../state/products.slice";

function App() {
  const isOpen = useSelector(state => state.cart.isOpen);
  const dispatch = useDispatch();
  // Manejar la acción de agregar al carrito
  let handleAddToCart = (product) => {
    dispatch(addProduct({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image
    }));
    };
  // Manejar la acción de remover del carrito
  const handleRemove = (id) => {
    dispatch(removeProduct(id));
  };

  //Abrir o cerrar carrito
  let handleToggleCart = () => {
    dispatch(toggleCart());
}

  return (
    <>
      <ProductHeader handleAddToCart={handleAddToCart}/>
      <ProductsList handleAddToCart={handleAddToCart}/>
      <Cart handleRemove={handleRemove} handleToggleCart={handleToggleCart} isOpen={isOpen}/>
    </>
  );
}

export default App;
