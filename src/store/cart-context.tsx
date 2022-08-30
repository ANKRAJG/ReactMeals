import React from 'react';
import { CartContextObj } from '../models/cartContextObj';

const CartContext = React.createContext<CartContextObj>({
    items: [],
    totalAmount: 0,
    addItem: (item) => {},
    removeItem: (id) => {}
});

export default CartContext;