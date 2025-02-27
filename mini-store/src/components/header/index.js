import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HeaderContainer, HeaderTitle, HeaderCart } from './styles';
import { toggleCart } from '../../state/products.slice';

const ProductHeader = () => {
    const products = useSelector((state) => state.cart.products);
    const dispatch = useDispatch();
    const cartItemsCount = products.reduce((total, item) => total + item.quantity, 0);

    return (
        <HeaderContainer>
            <HeaderTitle>Mini-Store -- v 2.0</HeaderTitle>
            <HeaderCart onClick={() => dispatch(toggleCart())}>
                <svg role='img' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#fff"><g stroke-width="0"/><g stroke-linecap="round" stroke-linejoin="round"/><path d="M6.3 5H21l-2 7H7.377M20 16H8L6 3H3m6 17a1 1 0 1 1-2 0 1 1 0 0 1 2 0m11 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                <span role="button">{cartItemsCount}</span>
            </HeaderCart>
        </HeaderContainer>
    );
};

export default ProductHeader;