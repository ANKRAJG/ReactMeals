import { FormEvent, useRef, useState } from 'react';

import Input from '../../UI/Input/Input';
import classes from './MealItemForm.module.scss';

const MealItemForm = (props: {id: string, onAddToCart: (amount: number) => void}) => {
    const [amountIsValid, setAmountIsValid] = useState<boolean>(true);
    const amountInputRef = useRef<HTMLInputElement>(null);

    const submitHandler = (event: FormEvent) => {
        event.preventDefault();

        const enteredAmount = amountInputRef.current!.value;
        const enteredAmountNumber = +enteredAmount;

        if(enteredAmount.trim().length===0 || enteredAmountNumber<1 || enteredAmountNumber>5) {
            setAmountIsValid(false);
            return;
        }

        props.onAddToCart(enteredAmountNumber);
    }

    const inputProps = {
        label: 'Amount',
        input: {
            id: 'amount_' + props.id,
            type: 'number',
            min: '1',
            max: '5',
            step: '1',
            defaultValue: '1'
        }
    }

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <Input ref={amountInputRef} {...inputProps} />
            <button>+ Add</button>
            {!amountIsValid && <p>Please enter valid amount (1-5)</p>}
        </form>
    );
};

export default MealItemForm;