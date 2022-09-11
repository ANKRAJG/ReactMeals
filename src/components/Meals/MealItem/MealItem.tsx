import React, { useContext } from 'react';

import MealItemForm from './MealItemForm';
import { Meal } from '../../../models/meal';

import classes from './MealItem.module.scss'; 
import CartContext from '../../../store/cart-context';
import { CartContextObj } from '../../../models/cartContextObj';

const MealItem = (props: Meal) => {
    const cartCtx = useContext<CartContextObj>(CartContext);
    const price = `Rs. ${props.price.toFixed(2)}`;

    const onAddToCardHandler = (amount: number) => {
        cartCtx.addItem({...props, amount: amount});
    }

    return (
        <li className={classes.meal}>
            <div>
                <h3>{props.name}</h3>
                <div className={classes.description}>{props.description}</div>
                <div className={classes.price}>{price}</div>
            </div>
            <div>
                <MealItemForm id={props.id} onAddToCart={onAddToCardHandler} />
            </div>
        </li>
    );
};

export default MealItem;