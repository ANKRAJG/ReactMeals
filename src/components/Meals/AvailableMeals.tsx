import Card from '../UI/Card/Card';
import MealItem from './MealItem/MealItem';
import { MealsList } from '../../models/meal';

import classes from './AvailableMeals.module.scss';

// Used React.FC here to show an example
const AvailableMeals: React.FC<MealsList> = (props) => {
// OR const AvailableMeals = ({mealsList}: MealsList) => {

    const mealList = props.mealsList.map(meal => 
      <MealItem key={meal.id} {...meal} />
      // OR
      // <MealItem 
      //   key={meal.id} 
      //   id={meal.id}
      //   name={meal.name} 
      //   description={meal.description} 
      //   price={meal.price} 
      // />
    );

    return (
        <section className={classes.meals}>
          <Card>
            <ul>{mealList}</ul>
          </Card>
        </section>
    );
};

export default AvailableMeals;