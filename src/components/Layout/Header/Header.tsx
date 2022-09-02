import { Fragment, useContext } from 'react';

import HeaderCartButton from '../HeaderCartButton/HeaderCartButton';
import Navigation from './Navigation';
import classes from './Header.module.scss';
import mealsImg from '../../../assets/meals.jpeg';
import AuthContext, { AuthCtxObj } from '../../../store/auth-context';


interface HeaderProps {
    onToggleCart: (flag: boolean) => void;
}

const Header: React.FC<HeaderProps> = (props) => {
    const authCtx = useContext<AuthCtxObj>(AuthContext);

    return (
        <Fragment>
            <header className={classes.header}>
                <h1>React Meals</h1>
                {authCtx.isLoggedIn && <HeaderCartButton onOpen={props.onToggleCart} />}
                <Navigation />
            </header>
            <div className={classes['main-image']}>
                <img src={mealsImg} alt="Food meals!" />
            </div>
        </Fragment>
    );
};

export default Header;