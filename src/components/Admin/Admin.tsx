import { Link, Route, Switch } from "react-router-dom";
import AdminMeals from "./AdminMeals/AdminMeals";
import classes from "./Admin.module.scss";
import AdminNewMeal from "./AdminNewMeal/AdminNewMeal";
import AdminMealDetails from "./AdminMeals/AdminMealDetails";
import Card from "../UI/Card/Card";
import AdminLayout from "./Layout/AdminLayout";
import CardOuter from "../UI/Card/CardOuter";

const Admin = () => {
    return (
            <AdminLayout>
                <Switch>
                    <Route path="/admin" exact>
                        <CardOuter>
                            <section className={classes.admin}>
                                <Card>
                                    <h1>Welcome to Meals Admin</h1>
                                    <div className={classes.inner}><Link className={classes.link} to="/admin/meals">Check All Meals</Link></div>
                                </Card>
                            </section>
                        </CardOuter>
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