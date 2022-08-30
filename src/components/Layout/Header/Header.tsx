import { Fragment } from 'react';

import HeaderCartButton from '../HeaderCartButton/HeaderCartButton';
import classes from './Header.module.scss';
import mealsImg from '../../../assets/meals.jpeg';

const Header: React.FC<{onOpenCart: (flag: boolean) => void}> = (props) => {
    return (
        <Fragment>
            <header className={classes.header}>
                <h1>React Meals</h1>
                <HeaderCartButton onOpen={props.onOpenCart} />
            </header>
            <div className={classes['main-image']}>
                <img src={mealsImg} alt="Food meals!" />
            </div>
        </Fragment>
    );
};

export default Header;