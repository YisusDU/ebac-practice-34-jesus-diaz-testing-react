import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Header from "../header/index.js";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { prettyDOM } from "@testing-library/dom";
import productsReducer from "../../state/products.slice.js";



describe("Header", () => {
    let store;
    let toggleCart;
    beforeEach(() => {
        handleToggleCart = jest.fn();

        store = configureStore({
            reducer: {
                cart: productsReducer,
            },
            preloadedState: {
                isOpen: false,
                cart: {
                    products: [
                        { id: 1, quantity: 1, price: 10, name: "Product 1" },
                        { id: 2, quantity: 1, price: 10, name: "Product 2" },
                    ],
                },
            },
        });


        render(
            <Provider store={store}>
                <Header handleToggleCart={handleToggleCart} />
            </Provider>
        );
    })

    it("renders the header", () => {
        // Variable that renders the header title
        const title = screen.getByText("Mini-Store -- v 2.0");
        console.log("title of the header" + prettyDOM(title));

        // Rendering the header title
        expect(title).toBeInTheDocument();
    });

    it("should contain the svg ", () => {

        // Variable that contains the cart icon
        const cartIcon = screen.getByRole("img");

        // Check if the cart icon is in the header
        expect(cartIcon).toBeInTheDocument();
    });

    it("should call the toggleCart function when the cart icon is clicked", () => {

        // Variable that contains the cart icon
        const cartIcon = screen.getByRole("img");
        console.log("Header_cartIcon:" + prettyDOM(cartIcon));

        // Click the cart icon
        fireEvent.click(cartIcon);
        // Check if the toggleCart function was called
        expect(handleToggleCart).toHaveBeenCalled();
        expect(handleToggleCart).toHaveBeenCalledTimes(1);
    });

    it("should display the correct number of items in the cart", () => {

        let cartCount = screen.getByRole("button");
        console.log("Quantity of products:" + prettyDOM(cartCount));

        expect(cartCount).toBeInTheDocument();
        expect(cartCount).toHaveTextContent("2");

    });


    it("should display '0' when the cart is empty", () => {
        store = configureStore({
            reducer: {
                cart: productsReducer,
            },
            preloadedState: {
                isOpen: false,
                cart: {
                    products: [],
                },
            },
        });
        render(
            <Provider store={store}>
                <Header />
            </Provider>
        );
        const state = store.getState();
        const cartCount = screen.getAllByRole("button");
        console.log("button cart empty:" + prettyDOM(cartCount[1]));

        expect(cartCount[1]).toHaveTextContent("0");
        expect(state.cart.products.length).toBe(0);
    });

    it("should display '1' when there is one item in the cart", () => {
        store = configureStore({
            reducer: {
                cart: productsReducer,
            },
            preloadedState: {
                isOpen: false,
                cart: {
                    products: [
                        { id: 1, quantity: 1, price: 10, name: "Product 1" },
                    ],
                },
            },
        });
        render(
            <Provider store={store}>
                <Header />
            </Provider>
        );
        const cartCount = screen.getAllByRole("button");
        expect(cartCount[1]).toHaveTextContent("1");
    });

    it("should have accessible roles and attributes", () => {
        const cartIcon = screen.getByRole("img");
        expect(cartIcon).toHaveAttribute("alt", "cart-icon");
        const cartButton = screen.getByRole("button");
        expect(cartButton).toHaveAttribute("aria-label", "Cart-Count");
    }); 
});




