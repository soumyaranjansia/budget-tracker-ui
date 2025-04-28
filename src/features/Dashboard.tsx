// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useState, useEffect} from 'react';
import { useGetTransactionsQuery, useGetBudgetSummaryQuery } from './Api/DashBoardApi';
import TransactionForm from './TransactionForm';
import TransactionList from './TransactionList';
import { Transaction } from '../types';
import BudgetDonutChart from './DoughnotChart';
import BudgetForm from './BudgetForm';
import AddCategoryForm from './AddCategory'; // Import your new form
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Ensure you import CSS once in your app

export default function Dashboard() {
  const { data: transactions = [], isLoading, isError, error, refetch } = useGetTransactionsQuery();
  const { data: budgetSummary, refetch: refetchBudgetSummary } = useGetBudgetSummaryQuery();

  const [categoriesRefetching, setCategoriesRefetching] = useState(false);

  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>(transactions);

  const income = transactions.filter((t: Transaction) => t.type === 'income').reduce((sum: number, t: Transaction) => sum + t.amount, 0);
  const expense = transactions.filter((t: Transaction) => t.type === 'expense').reduce((sum: number, t: Transaction) => sum + t.amount, 0);

  const balance = income - expense;

  useEffect(() => {
    setFilteredTransactions(transactions);
  }, [transactions]);

  // const addTransaction = (transaction: Transaction) => {
  //   setFilteredTransactions([transaction, ...filteredTransactions]);
  // };

  const deleteTransaction = (id: string) => {
    setFilteredTransactions(filteredTransactions.filter(t => t.id !== id));
  };

  // const handleFilterChange = (filter: string) => {
  //   const filtered = transactions.filter(t => 
  //     t.title.toLowerCase().includes(filter.toLowerCase()) ||
  //     t.category.toLowerCase().includes(filter.toLowerCase())
  //   );
  //   setFilteredTransactions(filtered);
  // };

  // // Function to show toast messages
  // const showToast = (message: string, type: 'success' | 'error') => {
  //   toast[type](message);
  // };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{String(error) || 'Failed to load transactions'}</div>;
  const refetchCategories = async () => {
    setCategoriesRefetching(true);
    console.log('Fetching categories...');
    // await refetchCategories(); 
    // Logic to re-fetch categories (e.g., API call)
    // Set loading state here if required
    setCategoriesRefetching(false);
  };
  
  return (
    <div className="p-6 space-y-6">
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

      <h1 className="text-4xl font-bold">Dashboard</h1>

      {/* Overview and Chart Section */}
      <div className="flex flex-col md:flex-row gap-6">
      {/* Overview Section */}
      <div className="flex-1 min-w-[320px] p-6 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 rounded-xl shadow-xl text-white">
        <h3 className="text-3xl font-bold mb-6">Overview</h3>
        <p className="text-lg mb-2"><strong className="font-semibold">Income:</strong> ₹{income}</p>
        <p className="text-lg mb-2"><strong className="font-semibold">Expenses:</strong> ₹{expense}</p>
        <p className="text-xl font-semibold mt-4"><strong>Balance:</strong> ₹{balance}</p>
      </div>

      {/* Budget Chart Section */}
      <div className="flex-1 min-w-[320px] p-6 bg-white rounded-xl shadow-xl flex items-center justify-center">
        <div className="w-full max-w-[350px] max-h-[350px] flex justify-center items-center">
          {budgetSummary ? (
            <div className="w-full h-full flex justify-center items-center">
              <BudgetDonutChart data={budgetSummary} />
            </div>
          ) : (
            <div className="flex justify-center items-center text-gray-500">Loading chart...</div>
          )}
        </div>
      </div>
    </div>


      {/* Forms Section */}
      <div className="flex flex-col md:flex-row md:flex-wrap gap-6">
      {/* Transaction Form */}
      <div className="flex-1 min-w-[300px] p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
        <TransactionForm
          onAdd={async () => {
            await refetch();
            await refetchBudgetSummary();
          }}
          refetchCategories={refetchCategories}
          
        />
      </div>

      {/* Budget Form */}
      <div className="flex-1 min-w-[300px] p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
        <BudgetForm  />
      </div>

      {/* Add Category Form */}
      <div className="flex-1 min-w-[300px] p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
        <AddCategoryForm
          onAddCategory={async () => {
            if (categoriesRefetching) {
              toast.info('Fetching categories...');
            } else {
              await refetchCategories();
              toast.success('Category refreshed...');
            }
          }}
          
        />
      </div>
    </div>


      {/* Transaction List */}
      <TransactionList 
        transactions={filteredTransactions}
        onDelete={deleteTransaction}
        // onFilter={handleFilterChange}
      />
    </div>
  );
}
