import React from "react";
import { AdminMeal } from "../models/adminMeal";

export interface AdminMealsContextObj {
    items: AdminMeal[];
    processAndSetMeals: (data: any) => AdminMeal[];
    getMealById: (mealId: string) => AdminMeal;
}

const emptyMeal: AdminMeal = { id: '', name: '', description: '', price: 0 };

const AdminMealsContext = React.createContext<AdminMealsContextObj>({
    items: [],
    processAndSetMeals: (data) => [],
    getMealById: (mealId) => { return emptyMeal }
});

export default AdminMealsContext;