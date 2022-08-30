import React, { useContext } from 'react';
import { CartContextObj } from '../../models/cartContextObj';
import { Meal } from '../../models/meal';
import CartContext from '../../store/cart-context';
import Modal from '../UI/Modals/Modal';
import classes from './Cart.module.scss';
import CartItem from './CartItem';


export interface CartProps {
    onCloseCart: (flag: boolean) => void;
}

const Cart = (props: CartProps) => {
    const cartCtx = useContext<CartContextObj>(CartContext);
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length>0;

    const onAddCartHandler = (item: Meal) => {
        cartCtx.addItem({...item, amount: 1});
    };

    const onRemoveCartHandler = (id: string) => {
        cartCtx.removeItem(id);
    }

    const cartItems = <ul className={classes['cart-items']}>{cartCtx.items.map(item => 
            <CartItem 
                key={item.id} 
                id={item.id} 
                name={item.name} 
                amount={item.amount} 
                price={item.price} 
                onAdd={onAddCartHandler.bind(null, item)}
                onRemove={onRemoveCartHandler.bind(null, item.id)}
            />
        )
    }</ul>;

    return (
        <Modal onClose={props.onCloseCart}>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={props.onCloseCart.bind(null, false)}>Close</button>
                {hasItems && <button className={classes.button}>Order</button>}
            </div>
        </Modal>
    );
};

export default Cart;