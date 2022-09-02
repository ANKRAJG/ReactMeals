import React, { useContext } from 'react';
import AuthContext, { AuthCtxObj } from '../../../store/auth-context';

import classes from './Navigation.module.scss';


const Navigation = () => {
  const authCtx = useContext<AuthCtxObj>(AuthContext);

  return (
    <nav className={classes.nav}>
      <ul>
        {authCtx.isLoggedIn && (
          <li>
            <a href="/">Users</a>
          </li>
        )}
        {authCtx.isLoggedIn && (
          <li>
            <a href="/">Admin</a>
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
