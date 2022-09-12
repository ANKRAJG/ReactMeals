import { Fragment, useContext, useEffect, useState } from 'react';

import MealsSummary from "./MealsSummary";
import AvailableMeals from "./AvailableMeals";
import { Meal } from '../../models/meal';
import classes from './Meals.module.scss';
import AdminMealsContext, { AdminMealsContextObj } from '../../store/admin-meals-context';

const Meals = () => {
    const adminMealsCtx = useContext<AdminMealsContextObj>(AdminMealsContext);

    const [meals, setMeals] = useState<Meal[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [httpError, setHttpError] = useState<string>('');

    useEffect(() => {
        adminMealsCtx.getMeals(() => {
            const adminMeals = adminMealsCtx.items;
            const fetchedMeals: Meal[] = adminMeals.map((meal) => {
              return {...meal, amount:0 };
            });
            setMeals(fetchedMeals);
            setIsLoading(false);
        });
        // fetchMeals().catch((error: Error) => {
        //   setIsLoading(false);
        //   setHttpError(error.message);
        // });
    }, [adminMealsCtx]);

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