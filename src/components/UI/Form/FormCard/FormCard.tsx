import React from 'react';

import classes from './FormCard.module.scss';

const FormCard: React.FC<{children: React.ReactNode, className: string}> = (props) => {
  return (
    <div className={`${classes.card} ${props.className}`}>{props.children}</div>
  );
};

export default FormCard;
