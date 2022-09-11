export interface AdminMeal {
    id: string;
    name: string;
    description: string;
    price: number;
}

export interface AdminMealsList {
    adminMealsList: AdminMeal[]
}