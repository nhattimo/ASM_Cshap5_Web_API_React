export const ROUTES = {
    ADMIN: {
        ROLE: {
            VIEW: "/admin/curd/role",
            ADD: "/admin/curd/role/add",
            EDIT: "/admin/curd/role/edit/:id",
        },
        SUPPLIER: {
            VIEW: "/admin/curd/supplier",
            ADD: "/admin/curd/supplier/add",
            EDIT: "/admin/curd/supplier/edit/:id",
        },
        CATEGORY: {
            VIEW: "/admin/curd/category",
            ADD: "/admin/curd/category/add",
            EDIT: "/admin/curd/category/edit/:id",
        },
        PRODUCTITEM: {
            VIEW: "/admin/curd/productitem",
            ADD: "/admin/curd/productitem/add",
            EDIT: "/admin/curd/productitem/edit/:id",
        },
        ACCOUNT: {
            LOGIN: "/admin/account/login",
            REGISTER: "/admin/account/register",
            EDIT: "/admin/role/:id",
        },
    },
    // USER: {
    //     HOME: "/",
    //     PRODUCT_LIST: "/products",
    //     PRODUCT_DETAIL: "/products/details/:id",
    //     CART: "/cart",
    //     CHECKOUT: "/checkout",
    //     // profile
    //     PROFILE: "/profile",
    //     USER_INFO: "/profile/user-info",
    //     ORDER_HISTORY: "/profile/order-history",
    //     CHANGE_PASSWORD: "/profile/change-password",
    //     LOGIN_SUCCESS: "/login-success/:userId/:tokenLogin",
    // },
    // CONTACT: "/contact",
    // POST: "/post",
    // LOGIN: "/login",
    // REGISTER: "/register",
    // RESET_PASSWORD: "/reset-password/:token",
    // FORGOT_PASSWORD: "/forgot-password",
};
