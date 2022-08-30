import { Fragment } from 'react';

import MealsSummary from "./MealsSummary";
import AvailableMeals from "./AvailableMeals";

const mealsList = [
    {
      id: 'm1',
      name: 'Sushi',
      description: 'Finest fish and veggies',
      price: 22.99,
      amount: 0
    },
    {
      id: 'm2',
      name: 'Schnitzel',
      description: 'A german specialty!',
      price: 16.5,
      amount: 0
    },
    {
      id: 'm3',
      name: 'Barbecue Burger',
      description: 'American, raw, meaty',
      price: 12.99,
      amount: 0
    },
    {
      id: 'm4',
      name: 'Green Bowl',
      description: 'Healthy...and green...',
      price: 18.99,
      amount: 0
    },
  ];

const Meals = () => {
    return (
        <Fragment>
            <MealsSummary />
            <AvailableMeals mealsList={mealsList} />
        </Fragment>
    );
};

export default Meals;