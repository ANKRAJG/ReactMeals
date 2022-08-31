import React from 'react';

import classes from './Button.module.scss';

export enum ButtonTypes {
  BUTTON = "button",
  SUBMIT = "submit",
  RESET = "reset"
}

interface BtnProps {
  type: ButtonTypes;
  className: string;
  disabled: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

const Button: React.FC<BtnProps> = (props) => {
  return (
    <button
      type={props.type || ButtonTypes.BUTTON}
      className={`${classes.button} ${props.className}`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
