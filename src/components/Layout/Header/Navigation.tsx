import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext, { AuthCtxObj } from '../../../store/auth-context';

import classes from './Navigation.module.scss';


const Navigation = () => {
  const authCtx = useContext<AuthCtxObj>(AuthContext);

  return (
    <nav className={classes.nav}>
      <ul>
        {authCtx.isLoggedIn && (
          <li>
            <NavLink to="/home" activeClassName={classes.active}>Home</NavLink>
          </li>
        )}
        {authCtx.isLoggedIn && (
          <li>
            <NavLink to="/admin" activeClassName={classes.active}>Admin</NavLink>
          </li>
        )}
        {authCtx.isLoggedIn && (
          <li>
            <button onClick={authCtx.logout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
