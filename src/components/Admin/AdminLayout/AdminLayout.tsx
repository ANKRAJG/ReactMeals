import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";

import classes from './AdminLayout.module.scss';
import Card from "../../UI/Card/Card";

// Wrapper Component
const AdminLayout: React.FC<{children: React.ReactNode}> = (props) => {
    return(
        <Fragment>
            <Card>
                <NavLink activeClassName={classes.active} className={classes.link} to="/admin/meals">All Meals</NavLink>
                <NavLink activeClassName={classes.active} className={classes.link} to="/admin/meal/new">Add new Meal</NavLink>
            </Card>

            <div>{props.children}</div>
        </Fragment>
    )
};

export default AdminLayout;