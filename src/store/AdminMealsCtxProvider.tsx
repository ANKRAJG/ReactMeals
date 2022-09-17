import { useCallback, useState } from "react";
import { AdminMeal } from "../models/adminMeal";
import AdminMealsContext, { AdminMealsContextObj, MealDataObj } from "./admin-meals-context";


const AdminMealsCtxProvider: React.FC<{children: React.ReactNode}> = (props) => {
    const [meals, setMeals] = useState<AdminMeal[]>([]);

    // Wrapped processAndSetMeals inside useCallback as this function is used inside useEffect of Meals and AdminMeals Components.
    // Therefore, doesn't any unnecessary infinite re-render of component.
    const processAndSetMeals = useCallback((data: any) => {
        const loadedMeals = [];
        for(const key in data) {
          loadedMeals.push({
            id: key,
            name: data[key].name,
            description: data[key].description,
            price: data[key].price
          });
        }
        setMeals(loadedMeals);
        return loadedMeals;
    }, []);

    const addNewMeal = async (mealData: MealDataObj, callback: Function) => {
        const response = await fetch('https://react-meals-9cfa2-default-rtdb.firebaseio.com/meals.json', {
            method: 'POST',
            body: JSON.stringify(mealData)
        });

        if(!response.ok) {
            throw new Error('Something went wrong!');
        }
        callback();
    }

    const getMealById = (mealId: string) => {
        return meals.filter(meal => meal.id === mealId)[0];
    }

    const adminMealsContext: AdminMealsContextObj = {
        items: meals,
        processAndSetMeals,
        addNewMeal,
        getMealById
    }

    return (
        <AdminMealsContext.Provider value={adminMealsContext}>
            {props.children}
        </AdminMealsContext.Provider>
    );
}

export default AdminMealsCtxProvider;