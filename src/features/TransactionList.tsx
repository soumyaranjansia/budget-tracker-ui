import { Transaction } from '../types';
import { useState } from 'react';

export default function TransactionList({
  transactions,
  onDelete
}: { transactions: Transaction[], onDelete: (id: string) => void }) {
  const [filter, setFilter] = useState('');

  const filtered = transactions.filter(t => 
    (t.title?.toLowerCase().includes(filter.toLowerCase()) || 
    t.category?.toLowerCase().includes(filter.toLowerCase())) // Use optional chaining to avoid errors if title or category is undefined
  );
console.log(filtered);
  return (
    <div>
      <input 
        type="text" 
        placeholder="Filter by title or category" 
        value={filter} 
        onChange={(e) => setFilter(e.target.value)} 
        className="border p-2 w-full mb-4 rounded" 
      />
      <div className="space-y-2">
      {filtered.map((t) => (
  <div key={t.id} className="flex justify-between items-center border p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition">
    <div>
      <p className="font-bold text-lg">
        {t.title} {t.type === 'income' ? '+' : '-'} ₹{t.amount}
      </p>
      <p className="text-sm text-gray-500">
        {t.category} | {t.date ? new Date(t.date).toLocaleDateString() : ''}
      </p>
    </div>
    <button
      onClick={() => onDelete(t.id)}
      className="text-red-500 hover:text-red-700 font-semibold"
    >
      Delete
    </button>
  </div>
))}

      </div>
    </div>
  );
}
