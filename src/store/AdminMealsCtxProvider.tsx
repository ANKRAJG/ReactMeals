import { useCallback, useState } from "react";
import { AdminMeal } from "../models/adminMeal";
import AdminMealsContext, { AdminMealsContextObj } from "./admin-meals-context";


const AdminMealsCtxProvider: React.FC<{children: React.ReactNode}> = (props) => {
    const [adminMeals, setAdminMeals] = useState<AdminMeal[]>([]);

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
        setAdminMeals(loadedMeals);
        return loadedMeals;
    }, []);

    const getMealById = (mealId: string) => {
        return adminMeals.filter(meal => meal.id === mealId)[0];
    }

    const adminMealsContext: AdminMealsContextObj = {
        items: adminMeals,
        processAndSetMeals,
        getMealById
    }

    return (
        <AdminMealsContext.Provider value={adminMealsContext}>
            {props.children}
        </AdminMealsContext.Provider>
    );
}

export default AdminMealsCtxProvider;