import { useParams } from "react-router-dom";
import Card from "../../UI/Card/Card";
import CardLayout from "../../UI/Card/CardLayout";
import classes from "./AdminMealDetails.module.scss";

const AdminMealDetails = () => {
    const params = useParams<{mealId: string}>();
    // const price = `Rs. ${props.price.toFixed(2)}`;

    return (
        <CardLayout>
            <Card>
            {/* <div className={classes.meal}>
                <h3>{props.name}</h3>
                <div className={classes.description}>{props.description}</div>
                <div className={classes.price}>{price}</div>
            </div> */}
            <h2>{params.mealId}</h2>
        </Card>
        </CardLayout>
    )
};

export default AdminMealDetails;