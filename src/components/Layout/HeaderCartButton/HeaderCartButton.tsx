import { useContext, useEffect, useState } from "react";
import { CartContextObj } from "../../../models/cartContextObj";
import CartContext from "../../../store/cart-context";
import CartIcon from "../../Cart/CartIcon";
import classes from "./HeaderCartButton.module.scss";

export interface CartProps {
    onOpen: (flag: boolean) => void;
}

const HeaderCartButton = (props: CartProps) => {
    const [isBtnHighlighted, setIsBtnHighlighted] = useState<boolean>(false);
    const cartCtx = useContext<CartContextObj>(CartContext);
    const { items } = cartCtx;

    const numberofCartItems = items.reduce((curNumber, item) => { 
        return curNumber + item.amount; 
    }, 0);

    const btnClasses = `${classes.button} ${isBtnHighlighted ? classes.bump : ''}`;

    useEffect(() => {
        if(items.length === 0) {
            return;
        }
        setIsBtnHighlighted(true);

        const timer = setTimeout(() => {
            setIsBtnHighlighted(false);
        }, 300);

        return (() => {
            clearTimeout(timer);
        });
    }, [items]);

    return (
        <button className={btnClasses} onClick={props.onOpen.bind(null, true)}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberofCartItems}</span>
        </button>
    );
}

export default HeaderCartButton;