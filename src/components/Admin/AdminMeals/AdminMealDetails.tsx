import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import AdminMealsContext, { AdminMealsContextObj } from "../../../store/admin-meals-context";
import Card from "../../UI/Card/Card";
import CardLayout from "../../UI/Card/CardLayout";
import classes from "./AdminMealDetails.module.scss";

const AdminMealDetails = () => {
    const adminMealsCtx = useContext<AdminMealsContextObj>(AdminMealsContext);
    const params = useParams<{mealId: string}>();
    const meal = adminMealsCtx.getMealById(params.mealId);
    const price = `Rs. ${meal.price.toFixed(2)}`;

    return (
        <CardLayout>
            <Card>
            <div className={classes.meal}>
                <h3>{meal.name}</h3>
                <div className={classes.description}>{meal.description}</div>
                <div className={classes.price}>{price}</div>
            </div>
            <Link to="/admin/meals">Go back to all Meals</Link>
        </Card>
        </CardLayout>
    )
};

export default AdminMealDetails;