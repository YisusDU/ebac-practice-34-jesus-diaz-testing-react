import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeProduct, toggleCart } from '../../state/products.slice';
import { CartContainer, CartItem, RemoveButton, CloseButton } from './styles';

const Cart = ({ handleRemove, handleToggleCart, isOpen }) => {


    const dispatch = useDispatch();
    const items = useSelector(state => state.cart.products);

    const handleCloseClick = () => {
        handleToggleCart();
        dispatch(toggleCart());
    };


    return (
        <CartContainer style={{ right: isOpen ? '20px' : '-100%' }}>

            <CloseButton role='check-box' onClick={handleCloseClick} aria-label='Close-Cart'>X</CloseButton>


            <h2>Your Cart</h2>
            {items.length === 0 ? (
                <p>No items in the cart.</p>
            ) : (
                <ul>
                    {items.map(item => (
                        <CartItem key={item.id} role='listitem'>
                            <img src={item.image} alt={item.name} style={{ width: '50px', height: '50px' }} />
                            {item.name}  ${item.price} &times; {item.quantity} 
                            <RemoveButton onClick={() => handleRemove(item.id)} aria-label='Remove-Item' role='button'>Remove</RemoveButton>
                        </CartItem>
                    ))}
                </ul>
            )}
        </CartContainer>
    );
};

export default Cart;
