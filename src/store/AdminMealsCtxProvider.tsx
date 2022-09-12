import { useState } from "react";
import { AdminMeal } from "../models/adminMeal";
import AdminMealsContext, { AdminMealsContextObj, MealDataObj } from "./admin-meals-context";


const AdminMealsCtxProvider: React.FC<{children: React.ReactNode}> = (props) => {
    const [meals, setMeals] = useState<AdminMeal[]>([]);

    const fetchMeals = async (callback: Function) => {
        const response = await fetch('https://react-meals-9cfa2-default-rtdb.firebaseio.com/meals.json');

        if(!response.ok) {
            callback({message: 'Something went wrong!'});
            throw new Error('Something went wrong!');
        }

        const responseData = await response.json();
        const loadedMeals = [];
        for(const key in responseData) {
          loadedMeals.push({
            id: key,
            name: responseData[key].name,
            description: responseData[key].description,
            price: responseData[key].price
          });
        }

        setMeals(loadedMeals);
        callback();
    };

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
        getMeals: fetchMeals,
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