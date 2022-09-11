import React from 'react';
import classes from './CardOuter.module.scss';


const CardOuter: React.FC<{children: React.ReactNode}> = (props) => {
    return (
        <section className={classes['card-outer']}>
            {props.children}
        </section>
    )
};

export default CardOuter;