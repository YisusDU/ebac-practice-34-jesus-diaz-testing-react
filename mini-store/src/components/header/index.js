import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HeaderContainer, HeaderTitle, HeaderCart } from './styles';
import { toggleCart } from '../../state/products.slice';
import SVGComponent from './svgHeader';

const ProductHeader = () => {
    const products = useSelector((state) => state.cart.products);
    const dispatch = useDispatch();
    const cartItemsCount = products.reduce((total, item) => total + item.quantity, 0);

    return (
        <HeaderContainer>
            <HeaderTitle>Mini-Store -- v 2.0</HeaderTitle>
            <HeaderCart onClick={() => dispatch(toggleCart())}>
                <SVGComponent alt="cart-icon"/>
                <span role="button" aria-label='Cart'>{cartItemsCount}</span>
            </HeaderCart>
        </HeaderContainer>
    );
};

export default ProductHeader;