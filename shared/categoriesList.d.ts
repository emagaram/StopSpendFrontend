import { CategoriesListOptionsType, CategoriesListType, CategoryName, CategoryNameTransformed } from "./index";
export declare const CategoriesList: CategoriesListType;
export declare const BroadCategories: CategoryName[];
export declare const CategoriesListNames: {
    broadCategory: string;
    categories: ("Beer and Liquor" | "Fast Food" | "Vending Machines" | "Restaurants" | "All Food and Drink (excluding groceries)" | "All Food and Drink (including groceries)" | "Casinos and Gambling" | "Bank Withdrawals (ATM, Checking, etc.)" | "Transfer to Peers (Venmo, Paypal, Square Cash, etc.)" | "Wire Transfers" | "Bank Overdraft Fees" | "Clothing and Accessories" | "Tobacco and Vape" | "Convenience Stores" | "Department, Discount, and \"Super\" Stores" | "Online Marketplaces" | "All General Merchandise" | "Other")[];
}[];
export declare const CategoriesListOptions: CategoriesListOptionsType[];
export declare const transformCategoryName: (c: CategoryName) => CategoryNameTransformed;
