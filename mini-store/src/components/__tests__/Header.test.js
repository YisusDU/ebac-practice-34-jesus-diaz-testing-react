import React, { useSelector} from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Header from "../header/index.js";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { prettyDOM } from "@testing-library/dom";
import * as redux from 'react-redux';

// Mock the entire react-redux module
jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: jest.fn(),
}));

describe("Header", () => {
    let mockStore;
    let component;
    let toggleCart;
    beforeEach(()=> {
        mockStore = createStore(() => ({
            cart: { products: [{ id: 1, quantity: 1 }, { id: 2, quantity: 1 }] }
        }));
        toggleCart = jest.fn();
        redux.useDispatch.mockReturnValue(toggleCart); // Mock useDispatch to return toggleCart
        
        component = render(
            <Provider store={mockStore}>
                <Header />
            </Provider>
        );
    })

    it("renders the header", () => {
        
        // Variable that renders the header title
        const title = screen.getByText("Mini-Store -- v 2.0");

        // Rendering the header title
        expect(title).toBeInTheDocument();
    });

    it("should contain the svg ", () => {
        
        // Set up mock function for toggleCart and log dispatch
        //console.log("Setting up mock for useDispatch");

        const toggleCart = jest.fn();
        redux.useDispatch.mockReturnValue(toggleCart); // Mock useDispatch to return toggleCart

        // Variable that contains the cart icon
        const cartIcon = screen.getByRole("img");

        // Check if the cart icon is in the header
        expect(cartIcon).toBeInTheDocument();
    });

    it("should call the toggleCart function when the cart icon is clicked", () => {
        // Set up mock function for toggleCart and log dispatch
        //console.log("Setting up mock for useDispatch");

        // Variable that contains the cart icon
        const cartIcon = screen.getByRole("img");

        // Click the cart icon
        fireEvent.click(cartIcon);

        // Check if the toggleCart function was called
        expect(toggleCart).toHaveBeenCalled();
        expect(toggleCart).toHaveBeenCalledTimes(1);
    });

    it("should display the correct number of items in the cart", () => {

        const span = component.container.querySelector("span");
        const cartCount = screen.getByRole("button");
        //console.log(prettyDOM(span));
        
        expect(span).toBeInTheDocument();
        expect(cartCount).toHaveTextContent("2");
        
    }); 

    
    it("should display '0' when the cart is empty", () => {
        mockStore = createStore(() => ({
            cart: { products: [] }
        }));
        component = render(
            <Provider store={mockStore}>
                <Header />
            </Provider>
        );
        const cartCount = screen.getAllByRole("button");
        expect(cartCount[1]).toHaveTextContent("0");
    });

    it("should display '1' when there is one item in the cart", () => {
        mockStore = createStore(() => ({
            cart: { products: [{ id: 1, quantity: 1 }] }
        }));
        component = render(
            <Provider store={mockStore}>
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
        expect(cartButton).toHaveAttribute("aria-label", "Cart");
    });
});




