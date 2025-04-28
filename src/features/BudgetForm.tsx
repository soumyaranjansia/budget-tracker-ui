import { useState } from 'react';
import { useAddBudgetMutation } from './Api/DashBoardApi';
import { toast } from 'react-toastify';

export default function BudgetForm() {
  const [amount, setAmount] = useState(0);
  const [month, setMonth] = useState(1);
  const [year, setYear] = useState(new Date().getFullYear());

  const [addBudget] = useAddBudgetMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addBudget({ amount, month, year }).unwrap();
      setAmount(0);
      setMonth(1);
      setYear(new Date().getFullYear());
      toast.success('Budget set successfully!');
    } catch (error) {
      toast.error('Error adding budget');
      console.error('Error adding budget:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
  <h2 className="text-2xl font-semibold mb-4">Set Budget</h2>

  <label className="mb-1 font-medium">Amount</label>
  <input
    type="number"
    placeholder="Amount"
    value={amount}
    onChange={(e) => setAmount(+e.target.value)}
    className="border w-full p-2 rounded-lg focus:ring-2 focus:ring-blue-500"
    required
  />
  
  <label className="mb-1 font-medium">Month</label>
  <select
    value={month}
    onChange={(e) => setMonth(Number(e.target.value))}
    className="border w-full p-2 rounded-lg focus:ring-2 focus:ring-blue-500"
  >
    {Array.from({ length: 12 }, (_, i) => (
      <option key={i} value={i + 1}>
        {new Date(0, i).toLocaleString('default', { month: 'long' })}
      </option>
    ))}
  </select>

  <label className="mb-1 font-medium">Year</label>
  <input
    type="number"
    placeholder="Year"
    value={year}
    onChange={(e) => setYear(+e.target.value)}
    className="border w-full p-2 rounded-lg focus:ring-2 focus:ring-blue-500"
    required
  />

  <button
    type="submit"
    className="bg-blue-500 text-white w-full p-2 rounded-lg hover:bg-blue-600 transition-all duration-300"
  >
    Set Budget
  </button>
</form>
  );
}
