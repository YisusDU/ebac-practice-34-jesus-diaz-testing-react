import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Cart from "../cart/index.js";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { prettyDOM } from "@testing-library/dom";
import * as redux from 'react-redux';

// Mock the entire react-redux module
jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: jest.fn(),
}));

describe("cart", () => {
    let mockStore;
    let component;
    let handleRemove;
    let toggleCart;
    let mockDispatch;

    beforeEach(() => {
        mockStore = createStore(() => ({
            cart: {
                isOpen: false,
                products: [
                    { id: 1, quantity: 1, price: 10, name: "Product 1" },
                    { id: 1, quantity: 1, price: 10, name: "Product 2" },
                ]
            }
        }));

        //mock the removeProduct function
        handleRemove = jest.fn();

        //mock the toggleCart function
        toggleCart = jest.fn();


       // Mock the dispatch function
       mockDispatch = jest.fn((action) => {
        console.log("Dispatching action:", action); // Added log
        if (action.type === 'products/removeProduct') {
            return handleRemove(action);
        } if (action.type === 'products/toggleCart') {
            return toggleCart(action);
        }
    });

    // Mock useDispatch to return mockDispatch
    redux.useDispatch.mockReturnValue(mockDispatch);

        component = render(
            <Provider store={mockStore}>
                <Cart />
            </Provider>
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should render the cart", () => {
        //variable that must contain the text "Your Cart"
        const title = screen.getByText("Your Cart");
        //render the title
        expect(title).toBeInTheDocument();
    })

    it('should render the close button', () => {
        const closeButton = screen.getByRole('close');
        expect(closeButton).toBeInTheDocument();
    });

    it("should to display that cart is empty", () => {
        mockStore = createStore(() => ({
            cart: { products: [] }
        }));
        component = render(
            <Provider store={mockStore}>
                <Cart />
            </Provider>
        );
        //variable that must contain the text "No items in the cart."
        const emptyCart = screen.getByText("No items in the cart.");
        //render the text
        expect(emptyCart).toBeInTheDocument();
    })

    it("should display the correct number of items in the cart", () => {
        //We get the initial state of the store
        const state = mockStore.getState();
        console.log(state.cart.products);
        //check the long of the products in the store
        expect(state.cart.products.length).toBe(2);
    });

    it("should to call the removeProduct function", () => {

        const buttonRemove = screen.getAllByRole("button", { name: "Remove-Item" });
        console.log(prettyDOM(buttonRemove[0])); // Check if the button is rendered

        //simulate the click event on the button
        fireEvent.click(buttonRemove[0]);

        //check if the function was called
        expect(handleRemove).toHaveBeenCalled();
        expect(handleRemove).toHaveBeenCalledTimes(1);
    })


    it("should call the toggleCart function when the close icon is clicked", () => {


            // Variable that contains the cart icon
            const closeIcon = screen.getByRole("close");

            // Click the cart icon
            fireEvent.click(closeIcon);

            // Check if the toggleCart function was called
            expect(toggleCart).toHaveBeenCalled();
            expect(toggleCart).toHaveBeenCalledTimes(1);
        });

    it("should to check if the cart is open or closed", () => {
        //entering the store state
        let state = mockStore.getState();
        // console.log(`isOpen:  ${state.cart.isOpen}`);

        //check if the cart is closed
        expect(state.cart.isOpen).toBe(false);

        //simulate the click event on the button
        const closeIcon = screen.getByRole("close");
        // console.log(prettyDOM(closeIcon));
        fireEvent.click(closeIcon);

        //check if the function was called
        expect(toggleCart).toHaveBeenCalled();
        expect(mockDispatch).toHaveBeenCalledWith({
            type: 'products/toggleCart',
            payload: undefined
        });


        // expect(handleToggleCart).toHaveBeenCalledTimes(1);


        //simulate the change in the state of the store
        mockStore = createStore(() => ({
            cart: {
                isOpen: true, // Cambiar el estado a abierto
                products: [
                    { id: 1, quantity: 1, price: 10, name: "Product 1" },
                ]
            }
        }));

        //render the cart
        component = render(
            <Provider store={mockStore}>
                <Cart />
            </Provider>
        );

        state = mockStore.getState();
        //check if the cart is closed
        // console.log(`isOpen:  ${state.cart.isOpen}`);
        expect(state.cart.isOpen).toBe(true); 
        
    });


    it('should have accessible roles and attributes', () => {
        const closeButton = screen.getByRole('close');
        expect(closeButton).toHaveAttribute('aria-label', 'Close-Cart');
        const removeButtons = screen.getAllByText('Remove');
        removeButtons.forEach(button => {
            expect(button).toHaveAttribute('aria-label', 'Remove-Item');
        });
    });
});
