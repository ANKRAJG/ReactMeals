import { Meal } from "./meal";

export interface CartContextObj {
    items: Meal[];
    totalAmount: number;
    addItem: (item: Meal) => void;
    removeItem: (id: string) => void;
}