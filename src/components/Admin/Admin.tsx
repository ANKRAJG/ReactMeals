import { Outlet } from "react-router-dom";

import classes from './Admin.module.scss';
import Card from "../UI/Card/Card";
import { Fragment } from "react";
import { NavLink } from "react-router-dom";

const Admin = () => {
    return (
        <Fragment>
            <Card>
                <NavLink className={(navData) => classes.link + (navData.isActive ? classes.active : '')} 
                    to="meals">All Meals</NavLink>
                <NavLink className={(navData) => classes.link + (navData.isActive ? classes.active : '')} 
                    to="meal/new">Add new Meal</NavLink>
            </Card>  
          
            <Outlet />
        </Fragment>
    );
}

export default Admin;