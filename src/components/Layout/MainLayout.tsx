import classes from "./MainLayout.module.scss";

const MainLayout: React.FC<{children: React.ReactNode}> = (props) => {
    return (
        <main className={classes['main-bg']}>
            {props.children}
        </main>
    )
};

export default MainLayout;