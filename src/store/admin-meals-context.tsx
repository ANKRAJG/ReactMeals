import React from "react";
import { AdminMeal } from "../models/adminMeal";

export interface MealDataObj {
    name: string;
    description: string;
    price: number;
}

export interface AdminMealsContextObj {
    items: AdminMeal[];
    processAndSetMeals: (data: any) => AdminMeal[];
    addNewMeal: (mealData: MealDataObj, callback: Function) => void;
    getMealById: (mealId: string) => AdminMeal;
}

const emptyMeal: AdminMeal = { id: '', name: '', description: '', price: 0 };

const AdminMealsContext = React.createContext<AdminMealsContextObj>({
    items: [],
    processAndSetMeals: (data) => [],
    addNewMeal: (mealData) => {},
    getMealById: (mealId) => { return emptyMeal }
});

export default AdminMealsContext;