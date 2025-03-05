import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HeaderContainer, HeaderTitle, HeaderCart } from './styles';
import { toggleCart } from '../../state/products.slice';
import SVGComponent from './svgHeader';

const ProductHeader = ({handleToggleCart}) => {
    const products = useSelector((state) => state.cart.products);
    const dispatch = useDispatch();
    const cartItemsCount = products.reduce((total, item) => total + item.quantity, 0);

    const handleCloseClick = () => {
            handleToggleCart();
            dispatch(toggleCart());
        };

    return (
        <HeaderContainer>
            <HeaderTitle>Mini-Store -- v 2.0</HeaderTitle>
            <HeaderCart onClick={handleCloseClick}>
                <SVGComponent alt="cart-icon"/>
                <span role="button" aria-label='Cart-Count'>{cartItemsCount}</span>
            </HeaderCart>
        </HeaderContainer>
    );
};

export default ProductHeader;