import classes from './Card.module.scss';

type CardChildProp = {
    children: React.ReactNode;
}

const Card = (props: CardChildProp) => {
    return (
        <div className={classes.card}>
            {props.children}
        </div>
    );
};

export default Card;