import { useEffect, useState } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Header from './components/Layout/Header/Header';

import CartProvider from './store/CartProvider';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [cartIsShown, setCartIsShown] = useState<boolean>(false);

  useEffect(() => {
    const storedLoggedInInfo = localStorage.getItem('isLoggedIn');
    if(storedLoggedInInfo === '1') {
      setIsLoggedIn(true);
    }
  }, []);

  const toggleCartModal = (flag: boolean) => {
      setCartIsShown(flag);
  }

  const loginHandler = (email: string, password: string) => {
    // We should of course check email and password
    // But it's just a dummy/demo anyways
    localStorage.setItem('isLoggedIn', '1');
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.setItem('isLoggedIn', '0');
    setIsLoggedIn(false);
  };

  return (
    <CartProvider>
      <Header onToggleCart={toggleCartModal} isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home cartIsShown={cartIsShown} onLogout={logoutHandler} toggleCartModal={toggleCartModal} />}
      </main>
    </CartProvider>
  );
};

export default App;


