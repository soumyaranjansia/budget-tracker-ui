import { FormEvent, useEffect, useRef, useState } from 'react';
import { useGetCategoriesQuery, useAddIncomeMutation, useAddExpenseMutation } from './Api/DashBoardApi';
import { toast } from 'react-toastify';
interface TransactionFormProps {
  onAdd: () => void; // Specify the correct type for 'onAdd' if needed
  refetchCategories: () => void; // Specify the correct type for 'refetchCategories' based on your usage
}
interface CategoryType{
    id:number;
    name:string;
}

export default function TransactionForm({ onAdd ,refetchCategories }:TransactionFormProps) {
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('income');
  const [categoryId, setCategoryId] = useState('');

  const { data: categories = [], isLoading, isError,refetch } = useGetCategoriesQuery();
  const [addIncomeTransaction, { isLoading: isLoadIncome }] = useAddIncomeMutation();
  const [addExpenseTransaction, { isLoading: isLoadExpense}] =useAddExpenseMutation();
 

  const refreshCategories = async () => {
    await refetch();
  };
  // Create a ref to store the latest refetchCategories function
  const refetchCategoriesRef = useRef(refetchCategories);
  // Call refreshCategories when parent tells
  useEffect(() => {
    // if (refetchCategories) {
      refetchCategoriesRef.current = refreshCategories;
    // }
  }, [refetchCategories]);

  const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!amount || !type || !categoryId) {
      toast.error('Please fill all fields');
      return;
    }

    const transactionToSend = {
      amount: parseFloat(amount),
      category_id: parseInt(categoryId)
    };
    
    try {

      if(type=="expense"){
        await addExpenseTransaction(transactionToSend).unwrap();
      }
      else{
        await addIncomeTransaction(transactionToSend).unwrap();
      }
      await onAdd(); 
      toast.success('Transaction added successfully!');
      // Reset form
      setAmount('');
      setType('income');
      setCategoryId('');
     
    } catch (error) {
      console.error('Failed to add transaction:', error);
      toast.error('Failed to add transaction.');
    }
  };
console.log(type);
  if (isLoading) {
    return <div>Loading categories...</div>;
  }

  if (isError) {
    return <div>Failed to load categories.</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
  <h2 className="text-2xl font-semibold mb-4 text-center">Add Transaction</h2>

  <div className="flex flex-col">
    <label className="mb-1 font-medium">Amount</label>
    <input
      type="number"
      value={amount}
      onChange={(e) => setAmount(e.target.value)}
      className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
      placeholder="Enter amount"
      required
    />
  </div>

  <div className="flex flex-col">
    <label className="mb-1 font-medium">Type</label>
    <select
      value={type}
      onChange={(e) => setType(e.target.value)}
      className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
      required
    >
      <option value="income">Income</option>
      <option value="expense">Expense</option>
    </select>
  </div>

  <div className="flex flex-col">
    <label className="mb-1 font-medium">Category</label>
    <select
      value={categoryId}
      onChange={(e) => setCategoryId(e.target.value)}
      className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
      required
    >
      <option value="">Select category</option>
      {categories.map((category: CategoryType) => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      ))}
    </select>
  </div>

  <button
    type="submit"
    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 disabled:opacity-50"
    disabled={isLoadIncome || isLoadExpense}
  >
    {isLoadIncome || isLoadExpense ? 'Adding...' : 'Add Transaction'}
  </button>
</form>
  );
}
