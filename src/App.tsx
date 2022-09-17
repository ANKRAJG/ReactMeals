import { useState, Fragment, useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Header from './components/Layout/Header/Header';
import AuthContext, { AuthCtxObj } from './store/auth-context';
import Admin from './components/Admin/Admin';
import MainLayout from './components/Layout/MainLayout';


const App = () => {
  const [cartIsShown, setCartIsShown] = useState<boolean>(false);
  const authCtx = useContext<AuthCtxObj>(AuthContext);

  const toggleCartModal = (flag: boolean) => {
      setCartIsShown(flag);
  };

  const loggedInPages = (<div>
    <Route path="/home">
      <Home cartIsShown={cartIsShown} toggleCartModal={toggleCartModal} />
    </Route>
    <Route path="/admin">
      <Admin />
    </Route>
  </div>);

  return (
    <Fragment>
      <Header onToggleCart={toggleCartModal} />
      <MainLayout>
        <Route path="/" exact>
          {authCtx.isLoggedIn ? <Home cartIsShown={cartIsShown} toggleCartModal={toggleCartModal} /> : <Redirect to="/login" />}
        </Route>
        {!authCtx.isLoggedIn && 
            <Route path="/login">
              <Login />
            </Route>
        }
        {authCtx.isLoggedIn && loggedInPages}
        <Route path="*">
          {/* <Home cartIsShown={cartIsShown} toggleCartModal={toggleCartModal} /> */}
        </Route>
      </MainLayout>
    </Fragment>
  );
};

export default App;


