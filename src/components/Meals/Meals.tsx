import { Fragment, useEffect, useState } from 'react';

import MealsSummary from "./MealsSummary";
import AvailableMeals from "./AvailableMeals";
import { Meal } from '../../models/meal';
import classes from './Meals.module.scss';

const Meals = () => {
    const [meals, setMeals] = useState<Meal[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [httpError, setHttpError] = useState<string>('');

    useEffect(() => {
        const fetchMeals = async () => {
          const response = await fetch('https://react-meals-9cfa2-default-rtdb.firebaseio.com/meals.json');

          if(!response.ok) {
            throw new Error('Something went wrong!');
          }

          const responseData = await response.json();
          const loadedMeals = [];
          for(const key in responseData) {
            loadedMeals.push({
              id: key,
              name: responseData[key].name,
              description: responseData[key].description,
              price: responseData[key].price,
              amount: 0
            });
          }

          setMeals(loadedMeals);
          setIsLoading(false);
        };

        fetchMeals().catch((error: Error) => {
          setIsLoading(false);
          setHttpError(error.message);
        });
    }, []);

    return (
        <Fragment>
            <MealsSummary />
            {!isLoading && !httpError && <AvailableMeals mealsList={meals} />}
            {isLoading && <p className={classes.mealsLoading}><b>Loading Meals...</b></p>}
            {!isLoading && httpError && <p className={classes.mealsError}><b>{httpError}</b></p>}
        </Fragment>
    );
};

export default Meals;