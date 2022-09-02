import React from 'react';

import Meals from '../Meals/Meals';
import classes from './Home.module.scss';
import Cart from '../Cart/Cart';

interface HomeProps {
  cartIsShown: boolean; 
  toggleCartModal: (flag: boolean) => void;
}

const Home:React.FC<HomeProps> = (props) => {
  return (
    <React.Fragment>
      { props.cartIsShown && <Cart onCloseCart={props.toggleCartModal} />}
      <main className={classes['main-bg']}>
        <Meals />
      </main>
    </React.Fragment>
  );
};

export default Home;
