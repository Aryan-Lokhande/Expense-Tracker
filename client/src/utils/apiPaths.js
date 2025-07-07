export const API_PATHS = {
    AUTH: {
        LOGIN: "api/v1/auth/login",
        REGISTER: "api/v1/auth/register",
        GET_USER_INFO: "api/v1/auth/getUser",
    },
    DASHBOARD: {
        GET_DATA: "api/v1/dashboard",
    },
    INCOME: {
        ADD_INCOME: "api/v1/cashflow/income/add",
        GET_ALL_INCOME: "api/v1/cashflow/income/get",
        DELETE_INCOME: (incomeId) => `api/v1/cashflow/income/${incomeId}`,
        DOWNLOAD_INCOME: "api/v1/cashflow/income/downloadexcel",
    },
    EXPENSE: {
        ADD_EXPENSE: "api/v1/cashflow/expense/add",
        GET_ALL_EXPENSE: "api/v1/cashflow/expense/get",
        DELETE_EXPENSE: (expenseId) => `api/v1/cashflow/expense/${expenseId}`,
        DOWNLOAD_EXPENSE: "api/v1/cashflow/expense/downloadexcel",
    },
};
