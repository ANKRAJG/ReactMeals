import React, { ChangeEvent, FormEvent, useReducer, useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import classes from './Login.module.scss';
import Button, { ButtonTypes } from '../UI/Button/Button';
import AuthContext, { AuthCtxObj } from '../../store/auth-context';
import FormCard from '../UI/Form/FormCard/FormCard';
import FormInput from '../UI/Form/FormInput/FormInput';
import CardLayout from '../UI/Card/CardLayout';


enum InputValidatorTypes {
  INPUT_CHANGE = 'INPUT_CHANGE',
  INPUT_BLUR = 'INPUT_BLUR'
}

interface InputStateProps {
  value: string;
  isValid: boolean | null;
}

interface ReducerAction {
  type: InputValidatorTypes;
  val?: string
}

const initialInputState = { value: '', isValid: null };

const emailReducer = (state: InputStateProps, action: ReducerAction) => {
  switch(action.type) {
    case InputValidatorTypes.INPUT_CHANGE: {
      const actionVal = action.val!;
      return { value: actionVal, isValid: actionVal.includes('@') };
    }
    case InputValidatorTypes.INPUT_BLUR: {
      return { value: state.value, isValid: state.value.includes('@') };
    }
    default: {
      return initialInputState;
    }
  }
};

const passwordReducer = (state: InputStateProps, action: ReducerAction) => {
  switch(action.type) {
    case InputValidatorTypes.INPUT_CHANGE: {
      const actionVal = action.val!;
      return { value: actionVal, isValid: actionVal.trim().length > 6 };
    }
    case InputValidatorTypes.INPUT_BLUR: {
      return { value: state.value, isValid: state.value.trim().length > 6 };
    }
    default: {
      return initialInputState;
    }
  }
};

const Login = () => {
  const authCtx = useContext<AuthCtxObj>(AuthContext);
  const [formIsValid, setFormIsValid] = useState<boolean | null>(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, initialInputState);
  const [passwordState, dispatchPassowrd] = useReducer(passwordReducer, initialInputState);

  const { isValid: emailIsValid } = emailState; // This is Object destructuring, and emailIsValid is an alias for isValid key
  const { isValid: passwordIsValid } = passwordState; // This is Object destructuring, and passwordIsValid is an alias for isValid key

  const history = useHistory<string>();

  useEffect(() => {
    // This is kind of debounce feature
    console.log('IN USE EFFECT');
    const timer = setTimeout(() => {
      console.log('RUN Validation');
      setFormIsValid(
        emailState.isValid && passwordState.isValid
      );
    }, 500);

    // This returns the cleanup function, its a built-in feature in React useEffect.
    // This cleanup function is called just before the useEffect function is called, except for the first time.
    // It also runs when component is unmounted.
    return () => {
      console.log('CLEAN UP');
      clearTimeout(timer);
    };
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    dispatchEmail({type: InputValidatorTypes.INPUT_CHANGE, val: event.target.value});

    // setFormIsValid(
    //   event.target.value.includes('@') && passwordState.isValid
    // );
  };

  const passwordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    dispatchPassowrd({type: InputValidatorTypes.INPUT_CHANGE, val: event.target.value});

    // setFormIsValid(
    //   emailState.isValid && event.target.value.trim().length > 6
    // );
  };

  const validateEmailHandler = () => {
    dispatchEmail({type: InputValidatorTypes.INPUT_BLUR});
  };

  const validatePasswordHandler = () => {
    dispatchPassowrd({type: InputValidatorTypes.INPUT_BLUR});
  };

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();
    authCtx.login(emailState.value, passwordState.value);
    history.push('/home');
  };

  const emailInputProps = {
    label: 'Email',
    isValid: emailState.isValid,
    input: { id: 'email', type: 'email', value: emailState.value, onChange: emailChangeHandler, onBlur: validateEmailHandler }
  }

  const passwordInputProps = {
    label: 'Password',
    isValid: passwordState.isValid,
    input: { id: 'password', type: 'password', value: passwordState.value, onChange: passwordChangeHandler, onBlur: validatePasswordHandler }
  }

  return (
    <CardLayout>
      <FormCard className={classes.login}>
        <form onSubmit={submitHandler}>
          <FormInput {...emailInputProps} />
          <FormInput {...passwordInputProps} />
          <div className={classes.actions}>
            <Button type={ButtonTypes.SUBMIT} className={classes.btn} disabled={!formIsValid}>
              Login
            </Button>
          </div>
        </form>
      </FormCard>
    </CardLayout>
  );
};

export default Login;
