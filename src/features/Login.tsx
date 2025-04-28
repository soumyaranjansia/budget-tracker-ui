import { useState, FormEvent } from 'react';
import { useLoginMutation } from './Api/DashBoardApi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // important

interface LoginProps {
  onLogin?: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [login, { isLoading, error }] = useLoginMutation();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      // Perform login mutation and get the response
      const response = await login({ username, password }).unwrap();

      // Extract the token from the response (ensure the API returns the token)
      const token = response.token; // Modify this according to the response structure

      // Store the token in localStorage
      localStorage.setItem('Token', token);

      // Call the onLogin callback if provided
      if (onLogin) {
        console.log(localStorage);
        onLogin();
      }

      // Show a success message
      toast.success('Login Successful! 🎉', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
      });

    } catch (err: any) {
      // Handle any errors during login
      toast.error(err?.data?.message || 'Login Failed 🚫', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      {/* Toast container */}
      <ToastContainer />
    </div>
  );
}

export default Login;
