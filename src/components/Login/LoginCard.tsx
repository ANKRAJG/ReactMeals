import React from 'react';

import classes from './LoginCard.module.scss';

const LoginCard: React.FC<{children: React.ReactNode, className: string}> = (props) => {
  return (
    <div className={`${classes.card} ${props.className}`}>{props.children}</div>
  );
};

export default LoginCard;
