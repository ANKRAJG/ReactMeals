import React from 'react';

import classes from './Input.module.scss';
import { InputProps } from '../../../models/inputProps';

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    return (
        <div className={classes.input}>
            <label htmlFor={props.input.id}>{ props.label }</label>
            <input ref={ref} {...props.input} />
        </div>
    );
});

export default Input;