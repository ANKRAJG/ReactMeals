import React, { useReducer } from "react";
import { CartContextObj } from "../models/cartContextObj";
import { Meal } from "../models/meal";
import CartContext from "./cart-context";

interface CartStateObj {
    items: Meal[];
    totalAmount: number;
};

enum OperationKind {
    ADD = 'ADD',
    REMOVE = 'REMOVE'
}

interface ActionObj {
    type: OperationKind;
    item?: Meal;
    id?: string;
}

const defaultCartState: CartStateObj = {
    items: [],
    totalAmount: 0
};

const cartReducer = (state: CartStateObj, action: ActionObj) => {
    switch(action.type) {
        case OperationKind.ADD: {
            var actionItem = action.item!;
            const existingCartItemIndex = state.items.findIndex(item => item.id === actionItem.id);
            const existingCartItem = state.items[existingCartItemIndex];

            let updatedItems: Meal[];  
            if(existingCartItem) {
                const updatedItem: Meal = {
                    ...existingCartItem,
                    amount: existingCartItem.amount + actionItem.amount
                }
                updatedItems = [...state.items];
                updatedItems[existingCartItemIndex] = updatedItem;
            } else {
                updatedItems = state.items.concat(actionItem);
            }

            const updatedTotalAmount = state.totalAmount + (actionItem.amount * actionItem.price);
            return {
                items: updatedItems,
                totalAmount: updatedTotalAmount
            }; 
        }
        case OperationKind.REMOVE: {
            const existingCartItemIndex = state.items.findIndex(item => item.id === action.id);
            const existingCartItem = state.items[existingCartItemIndex];
            const updatedTotalAmount = state.totalAmount - existingCartItem.price;
            let updatedItems: Meal[];
            if(existingCartItem.amount === 1) {
                updatedItems = state.items.filter(item => item.id !== action.id);
            } else {
                const updatedItem = { ...existingCartItem, amount: existingCartItem.amount-1 }
                updatedItems = [...state.items];
                updatedItems[existingCartItemIndex] = updatedItem;
            }

            return {
                items: updatedItems,
                totalAmount: updatedTotalAmount
            }
        }
        default: {
            return defaultCartState;
        }
    }
};

const CartProvider: React.FC<{children: React.ReactNode}> = (props) => {

    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    const addItemToCartHandler = (item: Meal) => {
        dispatchCartAction({type: OperationKind.ADD, item: item});
    };

    const removeItemFromCartHandler = (id: string) => {
        dispatchCartAction({type: OperationKind.REMOVE, id: id});
    };

    const cartContext: CartContextObj = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler
    };

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    );
}

export default CartProvider;