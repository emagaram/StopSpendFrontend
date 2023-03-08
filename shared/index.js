"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.isCustomError = exports.CustomErrorMessages = exports.isCategoryName = exports.AlertTextMessageDefaultInvisible = exports.UserPublicDataDefault = exports.UserSettingsDefault = exports.supportersNotifiedText = exports.progressTextToUser = exports.progressText = exports.alertText = exports.greetingsText = exports.transformCategoryName = exports.CategoriesListOptions = exports.CategoriesListNames = exports.CategoriesList = exports.categoryNamesAndTransformNames = exports.amountsSpentDefault = exports.categoryNames = exports.MessageCategory = exports.ActivityItemKind = void 0;
var categoriesList_1 = require("./categoriesList");
exports.CategoriesList = categoriesList_1.CategoriesList;
exports.CategoriesListNames = categoriesList_1.CategoriesListNames;
exports.CategoriesListOptions = categoriesList_1.CategoriesListOptions;
exports.transformCategoryName = categoriesList_1.transformCategoryName;
var ActivityItemKind;
(function (ActivityItemKind) {
    ActivityItemKind["transactionResponse"] = "transactionResponse";
    ActivityItemKind["alertTextMessage"] = "alertTextMessage";
    ActivityItemKind["greetingsTextMessage"] = "greetingsTextMessage";
    ActivityItemKind["userAlertTextMessage"] = "userAlertTextMessage";
    ActivityItemKind["progressTextMessage"] = "progressTextMessage";
})(ActivityItemKind = exports.ActivityItemKind || (exports.ActivityItemKind = {}));
var MessageCategory;
(function (MessageCategory) {
    MessageCategory[MessageCategory["Greetings"] = 0] = "Greetings";
    MessageCategory[MessageCategory["Alert"] = 1] = "Alert";
})(MessageCategory = exports.MessageCategory || (exports.MessageCategory = {}));
exports.categoryNames = [
    "Beer and Liquor",
    "Fast Food",
    "Vending Machines",
    "Restaurants",
    "All Food and Drink (excluding groceries)",
    "All Food and Drink (including groceries)",
    "Casinos and Gambling",
    "Bank Withdrawals (ATM, Checking, etc.)",
    "Transfer to Peers (Venmo, Paypal, Square Cash, etc.)",
    "Wire Transfers",
    "Bank Overdraft Fees",
    "Clothing and Accessories",
    "Tobacco and Vape",
    "Convenience Stores",
    "Department, Discount, and \"Super\" Stores",
    "Online Marketplaces",
    "All General Merchandise",
    "Other",
];
exports.amountsSpentDefault = Object.fromEntries(exports.categoryNames.map(function (e) { return [
    e,
    {
        Weekly: 0,
        Monthly: 0
    },
]; }));
exports.categoryNamesAndTransformNames = __spreadArray([
    "Alternative Payments (Venmo, Paypal, Square Cash, etc.)"
], exports.categoryNames, true);
var unsubscribeText = "\n\nReply STOP to unsubscribe from all messages.";
function greetingsText(userName, contactName) {
    return ("Hi ".concat(contactName, "!\nStopStop here, thanks again for being ").concat(userName, "'s supporter! Whenever ").concat(userName, " overspends, we'll contact you and you can provide support to ").concat(userName, " however you think is best. For more information on StopSpend and how it works, feel free to check out our website: StopSpend.com") +
        unsubscribeText);
}
exports.greetingsText = greetingsText;
function alertText(userName, contactName, categories) {
    return "Hi ".concat(contactName, ",\nStopSpend has detected ").concat(userName, " has been gone past their spending limits for ").concat(categories
        .map(function (c) { return (0, categoriesList_1.transformCategoryName)(c); })
        .join(", "), ". If you think it would be helpful, we recommend you reach out to ").concat(userName, ". Thanks for your support!");
}
exports.alertText = alertText;
function progressText(userName, contactName, period) {
    //New lines matter
    return "Hi ".concat(contactName, ",\nStopSpend here with good news: ").concat(userName, " has followed all their spending limits this past ").concat(period === "Weekly" ? "week" : "month", "\uD83E\uDD73! As always, thanks for your support!");
}
exports.progressText = progressText;
function progressTextToUser(userName, period) {
    //New lines matter
    return "Hi ".concat(userName, ",\nStopSpend here, congratulations on not going over your spending limits this past ").concat(period === "Weekly" ? "week" : "month", "\uD83E\uDD73! We let your supporters know about your good work as well. Keep it up!");
}
exports.progressTextToUser = progressTextToUser;
function supportersNotifiedText(userName, categories) {
    return "Hi ".concat(userName, ",\nStopSpend has detected that you went over your spending limits for ").concat(categories
        .map(function (c) { return (0, categoriesList_1.transformCategoryName)(c); })
        .join(", "), ". We notified your supporters, we hope you're doing okay and that you receive helpful support!");
}
exports.supportersNotifiedText = supportersNotifiedText;
exports.UserSettingsDefault = {
    timezone: "",
    phone: "",
    firstName: "",
    receiveEmailMarketing: false,
    contactOnSpending: false
};
//Do NOT use undefined, will cause firebase error
exports.UserPublicDataDefault = __assign(__assign({ contacts: [], banks: [], alerts: [], lockedMode: null }, exports.UserSettingsDefault), { amountsSpent: Object.fromEntries(exports.categoryNames.map(function (e) { return [e, { Weekly: 0, Monthly: 0 }]; })) });
exports.AlertTextMessageDefaultInvisible = {
    isDeleted: false,
    categories: [],
    contacts: [],
    maybeContacts: [],
    message: "Update after sms-webhook has received that a first message has been sent",
    kind: ActivityItemKind.alertTextMessage,
    isProblematicOrEssential: false,
    userName: "First name"
};
var setCheck = new Set(exports.categoryNames);
function isCategoryName(category) {
    return setCheck.has(category);
}
exports.isCategoryName = isCategoryName;
var CustomErrorMessages;
(function (CustomErrorMessages) {
    CustomErrorMessages["InvalidInviteLink"] = "The invite link is invalid.";
    CustomErrorMessages["ContactsExceeded"] = "Cannot add any more contacts, the limit has been reached.";
    CustomErrorMessages["Unauthenticated"] = "User not logged in.";
    CustomErrorMessages["Internal"] = "An error has occured. Please try again later.";
})(CustomErrorMessages = exports.CustomErrorMessages || (exports.CustomErrorMessages = {}));
var isCustomError = function (
// eslint-disable-next-line @typescript-eslint/no-explicit-any
toBeDetermined) {
    return !!(toBeDetermined === null || toBeDetermined === void 0 ? void 0 : toBeDetermined.customCode);
};
exports.isCustomError = isCustomError;
