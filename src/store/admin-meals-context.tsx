import React from "react";
import { AdminMeal } from "../models/adminMeal";

export interface MealDataObj {
    name: string;
    description: string;
    price: number;
}

export interface AdminMealsContextObj {
    items: AdminMeal[];
    getMeals: (callback: Function) => void;
    addNewMeal: (mealData: MealDataObj, callback: Function) => void;
    getMealById: (mealId: string) => AdminMeal;
}

const emptyMeal: AdminMeal = { id: '', name: '', description: '', price: 0 };

const AdminMealsContext = React.createContext<AdminMealsContextObj>({
    items: [],
    getMeals: () => {},
    addNewMeal: (mealData) => {},
    getMealById: (mealId) => { return emptyMeal }
});

export default AdminMealsContext;