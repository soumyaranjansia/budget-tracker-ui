import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'; // Notice /react

// Define types
interface BudgetSummaryQuery {
  month: number;
  year: number;
}

interface Income {
  // Define your income fields here, like:
  amount: number;
  category_id: number;
}

interface Expense {
  // Define your expense fields here
  amount: number;
  category_id: number;
}

interface LoginData {
  username: string;
  password: string;
}
interface Budget {
  amount:number;
  month: number;
  year: number;
}
interface Category{
  name:string;
}
export const dashboardApi = createApi({
  reducerPath: 'dashboardApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://budget-tracker-backend-production-2231.up.railway.app/api',
    // prepareHeaders: (headers) => {
    //   const token = localStorage.getItem('token'); // Fetch token from localStorage
    //   if (token) {
    //     headers.set('Authorization', `Token ${token}`); // Add the token to headers
    //   }
    //   return headers;
    // },
    }),
  endpoints: (builder) => ({
    getBudgetSummary: builder.query<any, void>({
      query: () => ({
        url:'/budget-summary/',
        method:'GET',
        headers: {
          Authorization: `Token ${localStorage.getItem('Token')}`, // Add the token to the headers
        }
      })
    }),
    
    getIncomes: builder.query<any, void>({
      query: () => '/income/',
    }),
    addIncome: builder.mutation<any, Income>({
      query: (newIncome) => ({
        url: '/incomes/',
        method: 'POST',
        headers: {
          Authorization: `Token ${localStorage.getItem('Token')}`, // Add the token to the headers
        },
        body: newIncome,
      }),
    }),
    getExpenses: builder.query<any, void>({
      query: () => '/expenses/',
    }),
    addExpense: builder.mutation<any, Expense>({
      query: (newExpense) => ({
        url: '/expenses/',
        method: 'POST',
        headers: {
          Authorization: `Token ${localStorage.getItem('Token')}`, // Add the token to the headers
        },
        body: newExpense,
      }),
    }),
    getTransactions: builder.query<any, void>({
      query: () => ({
        url:'/transactions/',
        method:'GET',
        headers: {
          Authorization: `Token ${localStorage.getItem('Token')}`, // Add the token to the headers
        }
      })
    }),
    getCategories: builder.query<any, void>({
      query: () => ({
        url:'/categories/',
        method:'GET',
        headers: {
          Authorization: `Token ${localStorage.getItem('Token')}`, // Add the token to the headers
        }
      })
    }),
    login: builder.mutation<any, LoginData>({
      query: (loginData) => ({
        url: '/login/',
        method: 'POST',
        body: loginData,
      }),
    }),
    addBudget: builder.mutation<any, Budget>({
      query: (budgetData) => ({
        url: '/budgets/',
        method: 'POST',
        headers: {
          Authorization: `Token ${localStorage.getItem('Token')}`, // Add the token to the headers
        },
        body: budgetData,
      }),
    }),
    addCategory: builder.mutation<any, Category>({
      query: (categoryData) => ({
        url: '/categories/',
        method: 'POST',
        headers: {
          Authorization: `Token ${localStorage.getItem('Token')}`, // Add the token to the headers
        },
        body: categoryData,
      }),
    })
    
  }),
});

// Hooks
export const { 
  useGetBudgetSummaryQuery, 
  useGetIncomesQuery, 
  useAddIncomeMutation,
  useGetExpensesQuery,
  useAddExpenseMutation,
  useGetTransactionsQuery,
  useLoginMutation,
  useAddBudgetMutation,
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useAddTransactionMutation
} = dashboardApi;
