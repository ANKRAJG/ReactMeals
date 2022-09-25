import { Fragment, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import useHttp from "../../../hooks/use-http";
import AdminMealsContext, { AdminMealsContextObj } from "../../../store/admin-meals-context";
import Card from "../../UI/Card/Card";
import CardLayout from "../../UI/Card/CardLayout";
import classes from "./AdminMeals.module.scss";

const AdminMeals = () => {
    const adminMealsCtx = useContext<AdminMealsContextObj>(AdminMealsContext);
    const { processAndSetMeals } = useContext<AdminMealsContextObj>(AdminMealsContext);
    const { isLoading, error, sendRequest: fetchMeals } = useHttp(); 
    // const [isLoading, setIsLoading] = useState<boolean>(true);
    // const [error, setError] = useState<string>('');

    useEffect(() => {
        console.log('Admin Meals');
        fetchMeals(
            {url: 'https://react-meals-9cfa2-default-rtdb.firebaseio.com/meals.json'},
            (data: any) => {
                processAndSetMeals(data);
            }
        );
    // Used fetchMeals & processAndSetMeals as useEffect's dependencies after wrapping them into useCallback.
    }, [fetchMeals, processAndSetMeals]);

    // useEffect(() => {
    //     const getMealsUsingAxios = async () => {
    //         try {
    //             const res = await API.get('/meals.json');
    //             processAndSetMeals(res.data);
    //         } catch(error: any) {
    //             setError(error.message);
    //         }
    //         setIsLoading(false);
    //     }

    //     getMealsUsingAxios();
    //     console.log('Admin Meals');
    // }, [processAndSetMeals]);

    if(isLoading) {
        return <p className={classes.mealsLoading}><b>Loading Meals...</b></p>;
    }

    return (
        <Fragment>
            {!error && 
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
            {error && <p className={classes.mealsError}><b>{error}</b></p>}
        </Fragment>
    )
};

export default AdminMeals;