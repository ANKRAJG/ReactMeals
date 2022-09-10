import { ChangeEvent, useState } from "react";

const useInput = (validateValue: (enteredVal: string) => boolean) => {
    const [enteredValue, setEnteredValue] = useState<string>('');
    const [isTouched, setIsTouched] = useState<boolean | null>(null);

    const valueIsValid = validateValue(enteredValue);
    const hasError = !valueIsValid && isTouched;

    const valueChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setEnteredValue(event.target.value);
    }

    const inputBlurHandler = () => {
        setIsTouched(true);
    }

    const reset = () => {
        setEnteredValue('');
        setIsTouched(false);
    }

    return {
        value: enteredValue, 
        isValid: valueIsValid,
        hasError,
        valueChangeHandler,
        inputBlurHandler,
        reset
    }
}

export default useInput;