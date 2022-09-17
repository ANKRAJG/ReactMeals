import { Link, Outlet, Route, Routes } from "react-router-dom";
import classes from "./Admin.module.scss";
import Card from "../UI/Card/Card";
import AdminLayout from "./AdminLayout/AdminLayout";
import CardLayout from "../UI/Card/CardLayout";

const Admin = () => {
    return (
        <AdminLayout>
            <Routes>
                <Route path="" element={
                    <CardLayout>
                        <section className={classes.admin}>
                            <Card>
                                <h1>Welcome to Meals Admin</h1>
                                <div className={classes.inner}><Link className={classes.link} to="/admin/meals">Check All Meals</Link></div>
                            </Card>
                        </section>
                    </CardLayout>
                } />
            </Routes>
            
            <Outlet />
        </AdminLayout>
    );
}

export default Admin;