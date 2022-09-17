import { FormEvent, Fragment, useState } from "react";
import { Prompt, useHistory } from "react-router-dom";
import useHttp from "../../../hooks/use-http";
import useInput from "../../../hooks/use-input";
import Button, { ButtonTypes } from "../../UI/Button/Button";
import CardLayout from "../../UI/Card/CardLayout";
import FormCard from "../../UI/Form/FormCard/FormCard";
import FormInput from "../../UI/Form/FormInput/FormInput";
import classes from "./AdminNewMeal.module.scss";

const AdminNewMeal = () => {
    const { isLoading, sendRequest: addNewMeal } = useHttp();
    const history = useHistory<string>();
    const [isEntering, setIsEntering] = useState<boolean>(false);

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

    const postSaveData = () => {
        nameReset();
            descriptionReset();
            priceReset();
            history.push('/admin/meals');
    }

    const submitHandler = (event: FormEvent) => {
        event.preventDefault();

        if(!formIsValid) {
            return;
        }

        const mealData = {
            name: enteredName,
            description: enteredDescription,
            price: +enteredPrice
        }

        addNewMeal(
            {
                url: 'https://react-meals-9cfa2-default-rtdb.firebaseio.com/meals.json',
                method: 'POST',
                body: mealData
            },
            postSaveData
        );
    }

    const formFocusHandler = () => {
        console.log('Focus Form');
        setIsEntering(true);
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
        <Fragment>
            <Prompt when={isEntering} message={(location) => 'Are you sure you want to leave?'} />
            <CardLayout>
                {!isLoading && <FormCard className={classes['admin-form']}>
                    <h2>Add new Meal</h2>
                    <form onFocus={formFocusHandler} onSubmit={submitHandler}>
                        <FormInput {...nameInputProps} />
                        <FormInput {...descriptionInputProps} />
                        <FormInput {...priceInputProps} />
                        <div className={classes.actions}>
                        <Button type={ButtonTypes.SUBMIT} className={classes.btn} disabled={!formIsValid}>
                            Save
                        </Button>
                        </div>
                    </form>
                </FormCard>}
                {isLoading && <p className={classes.mealsLoading}><b>Loading Meals...</b></p>}
            </CardLayout>
        </Fragment>
    )
};

export default AdminNewMeal;