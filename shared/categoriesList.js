"use strict";
exports.__esModule = true;
exports.transformCategoryName = exports.CategoriesListOptions = exports.CategoriesListNames = exports.BroadCategories = exports.CategoriesList = void 0;
/*
IMPORTANT, make sure old categories and new categories have no chance of
overlap. Not good if multiple categories get flagged. Solution good also just be break once one
category gets flagged but that's strange since one would be prioritized.
*/
// TODO Add old categories to as many as possible, personal finance really might not be there
exports.CategoriesList = [
    {
        broadCategory: "Food and Drink",
        categories: [
            {
                name: "Beer and Liquor",
                including: {
                    newCategories: [
                        {
                            primary: "FOOD_AND_DRINK",
                            detailed: "BEER_WINE_AND_LIQUOR"
                        },
                    ],
                    oldCategories: [
                        {
                            category_id: "19025004",
                            group: "place",
                            hierarchy: [
                                "Shops",
                                "Food and Beverage Store",
                                "Beer, Wine and Spirits",
                            ]
                        },
                        {
                            category_id: "13001001",
                            group: "place",
                            hierarchy: ["Food and Drink", "Bar", "Wine Bar"]
                        },
                        {
                            category_id: "13005001",
                            group: "place",
                            hierarchy: ["Food and Drink", "Restaurants", "Winery"]
                        },
                    ]
                }
            },
            {
                name: "Fast Food",
                including: {
                    newCategories: [
                        {
                            primary: "FOOD_AND_DRINK",
                            detailed: "FAST_FOOD"
                        },
                    ],
                    oldCategories: [
                        {
                            category_id: "13005032",
                            group: "place",
                            hierarchy: ["Food and Drink", "Restaurants", "Fast Food"]
                        },
                    ]
                }
            },
            {
                name: "Vending Machines",
                including: {
                    newCategories: [
                        {
                            primary: "FOOD_AND_DRINK",
                            detailed: "VENDING_MACHINES"
                        },
                    ]
                }
            },
            {
                name: "Restaurants",
                including: {
                    newCategories: [
                        {
                            primary: "FOOD_AND_DRINK",
                            detailed: "RESTAURANT"
                        },
                    ],
                    oldCategories: [
                        {
                            category_id: "13005000",
                            group: "place",
                            hierarchy: ["Food and Drink", "Restaurants"]
                        },
                    ]
                },
                excluding: {
                    newCategories: [
                        {
                            primary: "FOOD_AND_DRINK",
                            detailed: "FAST_FOOD"
                        },
                    ],
                    oldCategories: [
                        {
                            category_id: "13005032",
                            group: "place",
                            hierarchy: ["Food and Drink", "Restaurants", "Fast Food"]
                        },
                    ]
                }
            },
            {
                name: "All Food and Drink (excluding groceries)",
                including: {
                    newCategories: [
                        {
                            primary: "FOOD_AND_DRINK",
                            detailed: ""
                        },
                    ],
                    oldCategories: [
                        {
                            category_id: "13000000",
                            group: "place",
                            hierarchy: ["Food and Drink"]
                        },
                    ]
                },
                excluding: {
                    newCategories: [
                        {
                            primary: "FOOD_AND_DRINK",
                            detailed: "GROCERIES"
                        },
                    ],
                    oldCategories: [
                        {
                            category_id: "19047000",
                            group: "place",
                            hierarchy: ["Shops", "Supermarkets and Groceries"]
                        },
                    ]
                }
            },
            {
                name: "All Food and Drink (including groceries)",
                including: {
                    newCategories: [
                        {
                            primary: "FOOD_AND_DRINK",
                            detailed: ""
                        },
                    ],
                    oldCategories: [
                        {
                            category_id: "19047000",
                            group: "place",
                            hierarchy: ["Shops", "Supermarkets and Groceries"]
                        },
                        {
                            category_id: "13000000",
                            group: "place",
                            hierarchy: ["Food and Drink"]
                        },
                    ]
                }
            },
        ]
    },
    {
        broadCategory: "Financial",
        categories: [
            {
                name: "Casinos and Gambling",
                including: {
                    newCategories: [
                        {
                            primary: "ENTERTAINMENT",
                            detailed: "CASINOS_AND_GAMBLING"
                        },
                    ],
                    oldCategories: [
                        {
                            category_id: "17001014",
                            group: "place",
                            hierarchy: [
                                "Recreation",
                                "Arts and Entertainment",
                                "Casinos and Gaming",
                            ]
                        },
                    ]
                }
            },
            {
                name: "Bank Withdrawals (ATM, Checking, etc.)",
                including: {
                    oldCategories: [
                        {
                            category_id: "21012000",
                            group: "special",
                            hierarchy: ["Transfer", "Withdrawal"]
                        },
                    ]
                }
            },
            {
                name: "Transfer to Peers (Venmo, Paypal, Square Cash, etc.)",
                including: {
                    oldCategories: [
                        {
                            category_id: "21010001",
                            group: "special",
                            hierarchy: ["Transfer", "Third Party", "Venmo"]
                        },
                        {
                            category_id: "21010004",
                            group: "special",
                            hierarchy: ["Transfer", "Third Party", "PayPal"]
                        },
                        {
                            category_id: "21010002",
                            group: "special",
                            hierarchy: ["Transfer", "Third Party", "Square Cash"]
                        },
                        {
                            category_id: "21010007",
                            group: "special",
                            hierarchy: ["Transfer", "Third Party", "Chase QuickPay"]
                        },
                    ]
                }
            },
            {
                name: "Wire Transfers",
                including: {
                    oldCategories: [
                        {
                            category_id: "21011000",
                            group: "special",
                            hierarchy: ["Transfer", "Wire"]
                        },
                    ]
                }
            },
            {
                name: "Bank Overdraft Fees",
                including: {
                    oldCategories: [
                        {
                            category_id: "10001000",
                            group: "special",
                            hierarchy: ["Bank Fees", "Overdraft"]
                        },
                    ]
                }
            },
        ]
    },
    {
        broadCategory: "General Merchandise",
        categories: [
            {
                name: "Clothing and Accessories",
                including: {
                    newCategories: [
                        {
                            primary: "GENERAL_MERCHANDISE",
                            detailed: "CLOTHING_AND_ACCESSORIES"
                        },
                    ],
                    oldCategories: [
                        {
                            category_id: "19012000",
                            group: "place",
                            hierarchy: ["Shops", "Clothing and Accessories"]
                        },
                    ]
                }
            },
            {
                name: "Tobacco and Vape",
                including: {
                    newCategories: [
                        {
                            primary: "GENERAL_MERCHANDISE",
                            detailed: "TOBACCO_AND_VAPE"
                        },
                    ],
                    oldCategories: [
                        {
                            category_id: "19048000",
                            group: "place",
                            hierarchy: ["Shops", "Tobacco"]
                        },
                    ]
                }
            },
            {
                name: "Convenience Stores",
                including: {
                    newCategories: [
                        {
                            primary: "GENERAL_MERCHANDISE",
                            detailed: "CONVENIENCE_STORES"
                        },
                    ]
                }
            },
            {
                name: "Department, Discount, and \"Super\" Stores",
                including: {
                    newCategories: [
                        {
                            primary: "GENERAL_MERCHANDISE",
                            detailed: "DEPARTMENT_STORES"
                        },
                        {
                            primary: "GENERAL_MERCHANDISE",
                            detailed: "SUPERSTORES"
                        },
                        {
                            primary: "GENERAL_MERCHANDISE",
                            detailed: "DISCOUNT_STORES"
                        },
                    ],
                    oldCategories: [
                        {
                            category_id: "19018000",
                            group: "place",
                            hierarchy: ["Shops", "Department Stores"]
                        },
                        {
                            category_id: "19020000",
                            group: "place",
                            hierarchy: ["Shops", "Discount Stores"]
                        },
                    ]
                }
            },
            {
                name: "Online Marketplaces",
                including: {
                    newCategories: [
                        {
                            primary: "GENERAL_MERCHANDISE",
                            detailed: "ONLINE_MARKETPLACES"
                        },
                    ],
                    oldCategories: [
                        {
                            category_id: "19019000",
                            group: "digital",
                            hierarchy: ["Shops", "Digital Purchase"]
                        },
                    ]
                }
            },
            {
                name: "All General Merchandise",
                including: {
                    newCategories: [
                        {
                            primary: "GENERAL_MERCHANDISE",
                            detailed: ""
                        },
                    ],
                    oldCategories: [
                        {
                            category_id: "19000000",
                            group: "place",
                            hierarchy: ["Shops"]
                        },
                    ]
                },
                excluding: {
                    oldCategories: [
                        {
                            category_id: "19047000",
                            group: "place",
                            hierarchy: ["Shops", "Supermarkets and Groceries"]
                        },
                        {
                            category_id: "19025000",
                            group: "place",
                            hierarchy: ["Shops", "Food and Beverage Store"]
                        },
                    ]
                }
            },
        ]
    },
    {
        broadCategory: "Other",
        categories: [
            {
                name: "Other",
                including: {
                    newCategories: [],
                    oldCategories: []
                }
            },
        ]
    },
];
//TODO keep updated
exports.BroadCategories = [
    "All General Merchandise",
    "All Food and Drink (excluding groceries)",
    "All Food and Drink (including groceries)",
    "Other",
];
exports.CategoriesListNames = exports.CategoriesList.map(function (categoriesListItem) {
    return {
        broadCategory: categoriesListItem.broadCategory,
        categories: categoriesListItem.categories.map(function (category) { return category.name; })
    };
});
exports.CategoriesListOptions = [];
exports.CategoriesList.forEach(function (broadCategory) {
    broadCategory.categories.forEach(function (category) {
        exports.CategoriesListOptions.push(category);
    });
});
var transformCategoryName = function (c) {
    switch (c) {
        case "Transfer to Peers (Venmo, Paypal, Square Cash, etc.)":
            return "Alternative Payments (Venmo, Paypal, Square Cash, etc.)";
        default:
            return c;
    }
};
exports.transformCategoryName = transformCategoryName;
