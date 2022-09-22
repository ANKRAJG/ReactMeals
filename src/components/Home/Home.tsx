import React from 'react';

import Meals from '../Meals/Meals';

interface HomeProps {
  toggleCartModal: (flag: boolean) => void;
}

const Home:React.FC<HomeProps> = (props) => {
  return (
    <React.Fragment>
      <Meals />
    </React.Fragment>
  );
};

export default Home;
