/* import React from 'react';
import Navigation from './Navigation';
import './App.css';

// export interface Links {
//   links: Link[];
//  }
 
//  export interface Link {
//   label: string;
//   to: string;
//  }

// const links = [
//   { label: 'Website', to: 'https://www.robinwieruch.de/' },
//   { label: 'Twitter', to: 'https://twitter.com/rwieruch' }
// ];

const App = () => {
  return (
    <div>
        <Navigation links={links} />
      </div>
  );
}

export default App; */

import { useState } from 'react';

import classes from './App.module.scss';
import Header from './components/Layout/Header/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import CartProvider from './store/CartProvider';

const App = () => {
  const [cartIsShown, setCartIsShown] = useState<boolean>(false);

  const toggleCartModal = (flag: boolean) => {
    setCartIsShown(flag);
  }

  return (
    <CartProvider>
        { cartIsShown && <Cart onCloseCart={toggleCartModal} />}
        <Header onOpenCart={toggleCartModal} />
        <main className={classes['main-bg']}>
          <Meals />
        </main>
    </CartProvider>
  );
};

export default App;


