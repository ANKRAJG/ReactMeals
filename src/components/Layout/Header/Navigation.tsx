import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext, { AuthCtxObj } from '../../../store/auth-context';

import classes from './Navigation.module.scss';


const Navigation = () => {
  const authCtx = useContext<AuthCtxObj>(AuthContext);

  return (
    <nav className={classes.nav}>
      <ul>
        {authCtx.isLoggedIn && (
          <li>
            <Link to="/home">Home</Link>
          </li>
        )}
        {authCtx.isLoggedIn && (
          <li>
            <Link to="/admin">Admin</Link>
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
