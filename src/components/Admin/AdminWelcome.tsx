import { Link } from "react-router-dom"

import classes from "./AdminWelcome.module.scss";
import Card from "../UI/Card/Card"
import CardLayout from "../UI/Card/CardLayout"

const AdminWelcome = () => {
    return (
        <CardLayout>
            <section className={classes.admin}>
                <Card>
                    <h1>Welcome to Meals Admin</h1>
                    <div className={classes.inner}><Link className={classes.link} to="/admin/meals">Check All Meals</Link></div>
                </Card>
            </section>
        </CardLayout>
    )
}

export default AdminWelcome;