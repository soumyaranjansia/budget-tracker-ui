import { useState } from 'react';
import { useAddCategoryMutation } from './Api/DashBoardApi'; // Adjust path as needed
import { toast } from 'react-toastify';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// interface AddCategoryFormProps {
//   showToast: (message: string, type: 'success' | 'error') => void;
// }
// Define the type for the props
interface AddCategoryFormProps {
  onAddCategory: () => void;  // onAddCategory is a function with no arguments and no return
}
export default function AddCategoryForm({ onAddCategory  }:AddCategoryFormProps) {
  const [name, setName] = useState('');
  const [addCategory, { isLoading }] = useAddCategoryMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error('Category name cannot be empty.');
      return;
    }

    try {
      await addCategory({ name }).unwrap();
      setName(''); // Clear input field after successful submission
      await onAddCategory();
      toast.success('Category added successfully!');
      // 🔥 Refresh the page after success
      setTimeout(() => {
        window.location.reload();
      }, 1500); // 1500 milliseconds = 1.5 seconds

    } catch (error) {
      console.error('Failed to add category:', error);
      toast.error('Failed to add category.');
    }
  };

  return (
    <form
  onSubmit={handleSubmit}
  className="bg-white p-6 rounded-lg shadow-md space-y-4 max-w-md mx-auto"
>
  <h2 className="text-2xl font-semibold mb-4 text-center">Add New Category</h2>

  <div className="flex flex-col">
    <label htmlFor="categoryName" className="mb-1 font-medium">Category Name</label>
    <input
      id="categoryName"
      type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
      className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
      placeholder="Enter category name"
      required
      aria-describedby="categoryNameHelp"
    />
    <small id="categoryNameHelp" className="text-gray-500">
      Enter the name of the new category.
    </small>
  </div>

  <button
    type="submit"
    disabled={isLoading}
    className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-all duration-300 disabled:opacity-50"
  >
    {isLoading ? 'Adding...' : 'Add Category'}
  </button>
</form>
  );
}
