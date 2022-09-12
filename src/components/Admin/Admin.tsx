import { Link, Route, Switch } from "react-router-dom";
import AdminMeals from "./AdminMeals/AdminMeals";
import classes from "./Admin.module.scss";
import AdminNewMeal from "./AdminNewMeal/AdminNewMeal";
import AdminMealDetails from "./AdminMeals/AdminMealDetails";
import Card from "../UI/Card/Card";
import AdminLayout from "./AdminLayout/AdminLayout";
import CardLayout from "../UI/Card/CardLayout";

const Admin = () => {
    return (
        <AdminLayout>
            <Switch>
                <Route path="/admin" exact>
                    <CardLayout>
                        <section className={classes.admin}>
                            <Card>
                                <h1>Welcome to Meals Admin</h1>
                                <div className={classes.inner}><Link className={classes.link} to="/admin/meals">Check All Meals</Link></div>
                            </Card>
                        </section>
                    </CardLayout>
                </Route>
                <Route path="/admin/meals" exact>
                    <AdminMeals />
                </Route>
                <Route path="/admin/meal/new">
                    <AdminNewMeal />
                </Route>
                <Route path="/admin/meals/:mealId">
                    <AdminMealDetails />
                </Route>
            </Switch>
        </AdminLayout>
    );
}

export default Admin;