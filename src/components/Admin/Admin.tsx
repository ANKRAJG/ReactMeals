import { ChangeEvent, FormEvent, useState } from "react";
import useInput from "../../hooks/use-input";
import Button, { ButtonTypes } from "../UI/Button/Button";
import FormCard from "../UI/Form/FormCard/FormCard";
import FormInput from "../UI/Form/FormInput/FormInput";
import classes from "./Admin.module.scss";

const Admin = () => {
    const validateEmpty = (value: string) => {
        return value.trim() !== '';
    }

    const { 
        value: enteredName, 
        isValid: enteredNameIsValid,
        hasError: nameHasError, 
        valueChangeHandler: nameChangeHandler, 
        inputBlurHandler: nameBlurHandler,
        reset: nameReset
    } = useInput(value => value.trim() !== '');

    const {
        value: enteredDescription, 
        isValid: enteredDescIsValid,
        hasError: descriptionHasError, 
        valueChangeHandler: descriptionChangeHandler, 
        inputBlurHandler: descriptionBlurHandler,
        reset: descriptionReset
    } = useInput(validateEmpty);

    const {
        value: enteredPrice, 
        isValid: enteredPriceIsValid,
        hasError: priceHasError, 
        valueChangeHandler: priceChangeHandler, 
        inputBlurHandler: priceBlurHandler,
        reset: priceReset
    } = useInput(validateEmpty);

    let formIsValid = false;
    if(enteredNameIsValid && enteredDescIsValid && enteredPriceIsValid) {
        formIsValid = true;
    }

    const submitHandler = (event: FormEvent) => {
        event.preventDefault();

        if(!formIsValid) {
            return;
        }

        fetch('https://react-meals-9cfa2-default-rtdb.firebaseio.com/meals.json', {
            method: 'POST',
            body: JSON.stringify({
                name: enteredName,
                description: enteredDescription,
                price: +enteredPrice
            })
        });

        nameReset();
        descriptionReset();
        priceReset();
    }


    const nameInputProps = {
        label: 'Name',
        isValid: !nameHasError,
        input: { id: 'name', type: 'text', value: enteredName, onChange: nameChangeHandler, onBlur: nameBlurHandler }
    }

    const descriptionInputProps = {
        label: 'Description',
        isValid: !descriptionHasError,
        input: { id: 'description', type: 'text', value: enteredDescription, onChange: descriptionChangeHandler, onBlur: descriptionBlurHandler }
    }

    const priceInputProps = {
        label: 'Price',
        isValid: !priceHasError,
        input: { id: 'price', type: 'number', value: enteredPrice, onChange: priceChangeHandler, onBlur: priceBlurHandler, min: '0' }
    }

    return (
        <FormCard className={classes.admin}>
            <form onSubmit={submitHandler}>
                <FormInput {...nameInputProps} />
                <FormInput {...descriptionInputProps} />
                <FormInput {...priceInputProps} />
                <div className={classes.actions}>
                <Button type={ButtonTypes.SUBMIT} className={classes.btn} disabled={!formIsValid}>
                    Add New Meal
                </Button>
                </div>
            </form>
        </FormCard>
    );
}

export default Admin;