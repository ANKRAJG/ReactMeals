import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AdminMeal } from "../../../models/adminMeal";
import Card from "../../UI/Card/Card";
import CardLayout from "../../UI/Card/CardLayout";
import classes from "./AdminMeals.module.scss";

const AdminMeals = () => {
    const [adminMeals, setAdminMeals] = useState<AdminMeal[]>([]);
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
              price: responseData[key].price
            });
          }

          setAdminMeals(loadedMeals);
          setIsLoading(false);
        };

        fetchMeals().catch((error: Error) => {
          setIsLoading(false);
          setHttpError(error.message);
        });
    }, []);

    return (
        <Fragment>
            {!isLoading && !httpError && 
                <CardLayout>
                    <Card>
                        <ul>
                            {adminMeals.map(meal => 
                                <li key={meal.id} className={classes.meal}>
                                    <div><h3>{meal.name}</h3></div>
                                    <div>
                                        {/* <MealItemForm id={meal.id} onAddToCart={onAddToCardHandler} /> */}
                                        <Link to={`/admin/meals/${meal.id}`}>View</Link>
                                    </div>
                                </li>)
                            }
                        </ul>
                    </Card>
                </CardLayout>
            }
            {isLoading && <p className={classes.mealsLoading}><b>Loading Meals...</b></p>}
            {!isLoading && httpError && <p className={classes.mealsError}><b>{httpError}</b></p>}
        </Fragment>
    )
};

export default AdminMeals;