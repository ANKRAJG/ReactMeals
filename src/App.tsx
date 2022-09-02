import { useState, Fragment, useContext } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Header from './components/Layout/Header/Header';
import AuthContext, { AuthCtxObj } from './store/auth-context';


const App = () => {
  const [cartIsShown, setCartIsShown] = useState<boolean>(false);
  const authCtx = useContext<AuthCtxObj>(AuthContext);

  const toggleCartModal = (flag: boolean) => {
      setCartIsShown(flag);
  }

  return (
    <Fragment>
      <Header onToggleCart={toggleCartModal} />
      <main>
        {!authCtx.isLoggedIn && <Login />}
        {authCtx.isLoggedIn && <Home cartIsShown={cartIsShown} toggleCartModal={toggleCartModal} />}
      </main>
    </Fragment>
  );
};

export default App;


