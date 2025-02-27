import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeProduct, toggleCart } from '../../state/products.slice';
import { CartContainer, CartItem, RemoveButton, CloseButton } from './styles';

const Cart = () => {
    const isOpen = useSelector(state => state.cart.isOpen);
    const items = useSelector(state => state.cart.products);
    const dispatch = useDispatch();

    //Remover producto
    const handleRemove = (id) => {
        dispatch(removeProduct(id));
    };

    //Abrir o cerrar carrito
    const handleToggleCart = () => {
        dispatch(toggleCart());
    }

    return (
        <CartContainer isOpen={isOpen}>
            <CloseButton onClick={handleToggleCart}>X</CloseButton>
            <h2>Your Cart</h2>
            {items.length === 0 ? (
                <p>No items in the cart.</p>
            ) : (
                <ul>
                    {items.map(item => (
                        <CartItem key={item.id}>
                            <img src={item.image} alt={item.name} style={{ width: '50px', height: '50px' }} />
                            {item.name}  ${item.price} x {item.quantity}
                            <RemoveButton onClick={() => handleRemove(item.id)}>Remove</RemoveButton>
                        </CartItem>
                    ))}
                </ul>
            )}
        </CartContainer>
    );
};

export default Cart;