export interface Meal {
    id: string;
    name: string;
    description: string;
    price: number;
    amount: number;
}

export interface MealsList {
    mealsList: Meal[];
}