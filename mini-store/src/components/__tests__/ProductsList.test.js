import React from "react";
import { fireEvent, prettyDOM, render, screen } from "@testing-library/react";
import ProductsList from "../productsList/index.js";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import productsReducer from '../../state/products.slice';
import { LOADING, SUCCEDED, FAILED } from '../../state/status';

describe("ProductsList", () => {
    let store;

    const renderWithState = (initialState, handleAddToCart) => {

        //simulate the store
        store = configureStore({
            reducer: {
                cart: productsReducer,
            },
            preloadedState: {
                cart: initialState,
            },
        });

        return render(
            <Provider store={store}>
                <ProductsList handleAddToCart={handleAddToCart}/>
            </Provider>
        );
    };

    it("should render loading state", () => {
        renderWithState({ stock: [], status: LOADING });
        expect(screen.getByText(/Loading/)).toBeInTheDocument();
    });

    it("should render error State", () => {
        renderWithState({ stock: [], status: FAILED });
        expect(screen.getByText(/There was an error loading the products./)).toBeInTheDocument();
    });
    it("should render products", () => {
        const products = [
            {
                id: 1,
                title: "Product 1",
                price: 10,
                image: "https://via.placeholder.com/150",
            },
            {
                id: 2,
                title: "Product 2",
                price: 20,
                image: "https://via.placeholder.com/150",
            },
        ]

        renderWithState({ stock: products, status: SUCCEDED });
        expect(screen.getByText(`${products[0].title}`)).toBeInTheDocument();
        expect(screen.getByText(`${products[1].title}`)).toBeInTheDocument();
    });

    it("should render the button Add to cart", () => {
        const products = [
            {
                id: 1,
                title: "Product 1",
                price: 10,
                image: "https://via.placeholder.com/150",
            },
        ]

        renderWithState({ stock: products, status: SUCCEDED });
        const button = screen.getByText("Add to Cart");
        expect(button).toBeInTheDocument();
    });

    it("should call handleAddToCart when the button is clicked", () => {    
        const products = [
            {
                id: 1,
                title: "Product 1",
                price: 10,
                image: "https://via.placeholder.com/150",
            },
        ];
        const handleAddToCart = jest.fn();
        renderWithState({ stock: products, status: SUCCEDED }, handleAddToCart);
        const button = screen.getByText("Add to Cart");
        fireEvent.click(button);
        console.log(prettyDOM(button));
        expect(handleAddToCart).toHaveBeenCalled();
        expect(handleAddToCart).toHaveBeenCalledWith(products[0]);
        expect(handleAddToCart).toHaveBeenCalledTimes(1);
        fireEvent.click(button);
        fireEvent.click(button);
        fireEvent.click(button);
        fireEvent.click(button);

        expect(handleAddToCart).toHaveBeenCalledTimes(5);

    });

});
