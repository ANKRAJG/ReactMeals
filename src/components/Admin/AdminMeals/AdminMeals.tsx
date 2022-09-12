import { Fragment, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminMealsContext, { AdminMealsContextObj } from "../../../store/admin-meals-context";
import Card from "../../UI/Card/Card";
import CardLayout from "../../UI/Card/CardLayout";
import classes from "./AdminMeals.module.scss";

const AdminMeals = () => {
    const adminMealsCtx = useContext<AdminMealsContextObj>(AdminMealsContext);

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [httpError, setHttpError] = useState<string>('');

    useEffect(() => {
        adminMealsCtx.getMeals(() => {
            setIsLoading(false);
        });

        // fetchMeals().catch((error: Error) => {
        //   setIsLoading(false);
        //   setHttpError(error.message);
        // });
    }, [adminMealsCtx]);

    return (
        <Fragment>
            {!isLoading && !httpError && 
                <CardLayout>
                    <Card>
                        <ul>
                            {adminMealsCtx.items.map(meal => 
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