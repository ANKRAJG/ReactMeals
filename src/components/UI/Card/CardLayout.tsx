import React from 'react';
import classes from './CardLayout.module.scss';


const CardLayout: React.FC<{children: React.ReactNode}> = (props) => {
    return (
        <section className={classes['card-outer']}>
            {props.children}
        </section>
    )
};

export default CardLayout;