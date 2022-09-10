import { useState, Fragment, useContext } from 'react';
import { Route } from 'react-router-dom';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Header from './components/Layout/Header/Header';
import AuthContext, { AuthCtxObj } from './store/auth-context';
import Admin from './components/Admin/Admin';


const App = () => {
  const [cartIsShown, setCartIsShown] = useState<boolean>(false);
  const authCtx = useContext<AuthCtxObj>(AuthContext);

  const toggleCartModal = (flag: boolean) => {
      setCartIsShown(flag);
  };

  const loggedInPages = <div>
    <Route path="/home">
      <Home cartIsShown={cartIsShown} toggleCartModal={toggleCartModal} />
    </Route>
    <Route path="/admin">
      <Admin />
    </Route>
  </div>;

  return (
    <Fragment>
      <Header onToggleCart={toggleCartModal} />
      <main>
        {!authCtx.isLoggedIn && 
          <Route path="/login">
            <Login />
          </Route>}
        {authCtx.isLoggedIn && loggedInPages}
      </main>
    </Fragment>
  );
};

export default App;


