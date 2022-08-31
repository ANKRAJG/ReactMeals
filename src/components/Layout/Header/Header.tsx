import { Fragment } from 'react';

import HeaderCartButton from '../HeaderCartButton/HeaderCartButton';
import Navigation from './Navigation';
import classes from './Header.module.scss';
import mealsImg from '../../../assets/meals.jpeg';


interface HeaderProps {
    onToggleCart: (flag: boolean) => void;
    isAuthenticated: boolean;
    onLogout: () => void;
}

const Header: React.FC<HeaderProps> = (props) => {

    return (
        <Fragment>
            <header className={classes.header}>
                <h1>React Meals</h1>
                {!props.isAuthenticated && <HeaderCartButton onOpen={props.onToggleCart} />}
                <Navigation isLoggedIn={props.isAuthenticated} onLogout={props.onLogout} />
            </header>
            <div className={classes['main-image']}>
                <img src={mealsImg} alt="Food meals!" />
            </div>
        </Fragment>
    );
};

export default Header;