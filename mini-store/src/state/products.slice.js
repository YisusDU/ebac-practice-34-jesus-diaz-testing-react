import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { FAILED, IDLE, LOADING, SUCCEEDED } from "./status";

// Function to handle asynchronous operations

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    try {
        const response = await axios.get('https://fakestoreapi.com/products');
        return response.data;
    } catch (error) {
        console.error('Error Fetching', error);
        throw error; // Asegúrate de lanzar el error de nuevo
    }
});

// Function to update the quantity of items in the cart

export const updateItems = (items = [], item, quantityChange) => {
    const index = items.findIndex(i => i.id === item.id);

    if (index >= 0) {
        const updatedItems = [...items];
        updatedItems[index] = { ...updatedItems[index], quantity: updatedItems[index].quantity + quantityChange };
        return updatedItems[index].quantity === 0 ? updatedItems.filter(i => i.id !== item.id) : updatedItems;
    }
    return [...items, { ...item, quantity: 1 }];
};


const productsSlice = createSlice({
// Name of the Slice and initial state of the products container and the cart closed

    name: 'products',
    initialState: {
        products: [],
        stock: [],
        status: IDLE,
        isOpen: false,
    },

    reducers: {
        addProduct: (state, action) => {
            state.products = updateItems(state.products, action.payload, 1);
        },
        removeProduct: (state, action) => {
            state.products = updateItems(state.products, { id: action.payload }, -1);
        },
        toggleCart: (state) => {
            state.isOpen = !state.isOpen;
        }
    },
    extraReducers: builder => {
        builder
        .addCase(fetchProducts.pending, (state, action) => {
            console.log("pending:", action);
            state.status = LOADING;
        })
        .addCase(fetchProducts.fulfilled, (state, action) => {
            console.log("fuldilled:", action)
            state.stock = action.payload;
            state.status = SUCCEEDED;
        })
        .addCase(fetchProducts.rejected, (state, action) => {
            console.log("rejected:", action);
            state.status = FAILED;
        })
    }
});

// We are going to export the reducers and the actions

export const { addProduct, removeProduct, toggleCart} = productsSlice.actions;
//Hacemos un destructury:
const {reducer: productsReducer} = productsSlice;
export default productsReducer;
