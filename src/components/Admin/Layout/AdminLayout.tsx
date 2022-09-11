import React from "react";
import { NavLink } from "react-router-dom";

import classes from './AdminLayout.module.scss';
import Card from "../../UI/Card/Card";

// Wrapper Component
const AdminLayout: React.FC<{children: React.ReactNode}> = (props) => {
    return(
        <main className={classes['main-bg']}>
            <Card>
                <NavLink activeClassName={classes.active} className={classes.link} to="/admin/meals">All Meals</NavLink>
                <NavLink activeClassName={classes.active} className={classes.link} to="/admin/meal/new">Add new Meal</NavLink>
            </Card>

            <div>{props.children}</div>
        </main>
    )
};

export default AdminLayout;