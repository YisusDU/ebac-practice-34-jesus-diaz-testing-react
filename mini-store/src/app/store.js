import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../state/products.slice"

//no es necesario utilizar combineReducer, pues toolkit lo hacer por default 

const store = configureStore({
    reducer: {
        cart: productsReducer
    }
});

export default store;