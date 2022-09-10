import { ChangeEvent } from 'react';
import classes from './FormInput.module.scss';

interface FormInputAttr {
    id: string;
    type: string;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onBlur: () => void;
}

interface FormInputProps {
    label: string;
    isValid: boolean | null;
    input: FormInputAttr;
}

const FormInput: React.FC<FormInputProps> = (props) => {
    return (
        <div
          className={`${classes.control} ${
            props.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor={props.input.id}>{props.label}</label>
          <input {...props.input} />
        </div>
    )
};

export default FormInput;