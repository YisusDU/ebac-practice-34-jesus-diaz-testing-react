import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { FAILED, IDLE, LOADING, SUCCEDED } from "./status";

//función para manejar la asincronía
export const fetchProducts = createAsyncThunk('products/fetchProducts', 
    async () => {
        try{
            const response = await axios.get('https://fakestoreapi.com/products');
            return response.data;
        } catch(error){
            console.error('Error Fetching' , error);
            throw error;
        }
})

// Función para actualizar la cantidad de items en el carrito
const updateItems = (items, item, quantityChange) => {
    const index = items.findIndex(i => i.id === item.id);
    if (index >= 0) {
        const updatedItems = [...items];
        updatedItems[index] = { ...updatedItems[index], quantity: updatedItems[index].quantity + quantityChange };
        return updatedItems[index].quantity === 0 ? updatedItems.filter(i => i.id !== item.id) : updatedItems;
    }
    return [...items, { ...item, quantity: 1 }];
};

//function to switch the cart
const switchCart = (state, payload) => {
    return payload !== undefined ? payload : !state;
}

const productsSlice = createSlice({
    //nombre del Slice y estado inicial del contenedor de productos y el carrito cerrado
    name: 'products',
    initialState: {
        isOpen: false,
        products: [],
        stock: [],
        status: IDLE
    },
    reducers: {
        addProduct: (state, action) => {
            state.products = updateItems(state.products, action.payload, 1);
        },
        removeProduct: (state, action) => {
            state.products = updateItems(state.products, { id: action.payload }, -1);
        },
        toggleCart: (state, action) => {
            state.isOpen = switchCart(state.isOpen, action.payload);
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
            state.status = SUCCEDED;
        })
        .addCase(fetchProducts.rejected, (state, action) => {
            console.log("rejected:", action);
            state.status = FAILED;
        })
    }
});

//vamos a exportar los reducers y los actions
export const { addProduct, removeProduct, toggleCart} = productsSlice.actions;
//Hacemos un destructury:
const {reducer: productsReducer} = productsSlice;
export default productsReducer;