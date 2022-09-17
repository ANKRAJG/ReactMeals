import { Fragment, useContext, useEffect, useState } from 'react';

import MealsSummary from "./MealsSummary";
import AvailableMeals from "./AvailableMeals";
import { Meal } from '../../models/meal';
import classes from './Meals.module.scss';
import AdminMealsContext, { AdminMealsContextObj } from '../../store/admin-meals-context';
import useHttp from '../../hooks/use-http';

const Meals = () => {
    const { processAndSetMeals } = useContext<AdminMealsContextObj>(AdminMealsContext);
    const [meals, setMeals] = useState<Meal[]>([]);
    const { isLoading, error, sendRequest: fetchMeals } = useHttp(); 

    useEffect(() => {
        console.log('Meals');
        fetchMeals(
            {url: 'https://react-meals-9cfa2-default-rtdb.firebaseio.com/meals.json'},
            (data: any) => {
                const adminMeals = processAndSetMeals(data);
                const fetchedMeals: Meal[] = adminMeals.map((meal) => {
                    return {...meal, amount:0 };
                });
                setMeals(fetchedMeals);
            }
        );
    // Used fetchMeals & processAndSetMeals as useEffect's dependencies after wrapping them into useCallback.
    }, [fetchMeals, processAndSetMeals]);

    return (
        <Fragment>
            <MealsSummary />
            {!isLoading && !error && <AvailableMeals mealsList={meals} />}
            {isLoading && <p className={classes.mealsLoading}><b>Loading Meals...</b></p>}
            {!isLoading && error && <p className={classes.mealsError}><b>{error}</b></p>}
        </Fragment>
    );
};

export default Meals;