import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AdminMeal } from "../../../models/adminMeal";
import AdminMealsContext, { AdminMealsContextObj } from "../../../store/admin-meals-context";
import Card from "../../UI/Card/Card";
import CardLayout from "../../UI/Card/CardLayout";
import classes from "./AdminMealDetails.module.scss";

const AdminMealDetails = () => {
    const adminMealsCtx = useContext<AdminMealsContextObj>(AdminMealsContext);
    const params = useParams<{mealId: string}>();
    const navigate = useNavigate();
    var meal = adminMealsCtx.getMealById(params.mealId!);
    const mealsString = sessionStorage.getItem('adminMeals');
    var price = '';

    if(meal) {
        price = `Rs. ${meal.price.toFixed(2)}`;
    } else if(mealsString) {
        const meals: AdminMeal[] = JSON.parse(mealsString);
        meal = meals.filter(m => m.id === params.mealId)[0];
        price = `Rs. ${meal.price.toFixed(2)}`;
    }

    const goBack = () => {
        navigate(-1);
    }

    return (
        <CardLayout>
            <Card>
            <div className={classes.meal}>
                <h3>{meal.name}</h3>
                <div className={classes.description}>{meal.description}</div>
                <div className={classes.price}>{price}</div>
            </div>
            <span className={classes.span} onClick={goBack}>Go back to all Meals</span>
        </Card>
        </CardLayout>
    )
};

export default AdminMealDetails;