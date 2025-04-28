import { useState, useEffect } from 'react';
import Login from './features/Login';
import Dashboard from './features/Dashboard';

export default function App() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // Check for token in localStorage on component mount
  useEffect(() => {
    const token = localStorage.getItem('Token');
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('Token');
    setLoggedIn(false);
  };

  // Toggle mobile menu visibility
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header Component */}
      <Header loggedIn={loggedIn} handleLogout={handleLogout} toggleMobileMenu={toggleMobileMenu} isMobileMenuOpen={isMobileMenuOpen} />

      <div className="flex-1">
        {loggedIn ? (
          <Dashboard />
        ) : (
          <Login onLogin={() => setLoggedIn(true)} />
        )}
      </div>

      {/* Footer Component */}
      <Footer />
    </div>
  );
}
// Define the types for your props
interface HeaderProps {
  loggedIn: boolean;
  handleLogout: () => void;
  toggleMobileMenu: () => void;
  isMobileMenuOpen: boolean;
}
// Header Component
function Header({ loggedIn, handleLogout, toggleMobileMenu, isMobileMenuOpen }:HeaderProps) {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-md sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="text-2xl font-bold cursor-pointer">
          <span>FinTechApp</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="space-x-6 hidden md:flex">

          {/* Conditional Rendering for Logged-in State */}
          {loggedIn ? (
            <div className="flex items-center space-x-4">
              <img src="https://picsum.photos/id/237/200/300" alt="User Profile" className="rounded-full w-10 h-10" />
              <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 py-2 px-4 rounded-lg">
                Log Out
              </button>
            </div>
          ) : (
            <a href="/login" className="bg-green-500 py-2 px-4 rounded-lg hover:bg-green-600">Log In</a>
          )}
        </nav>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="text-white">
            <i className="fas fa-bars"></i>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="bg-blue-700 md:hidden space-y-4 py-4 px-6">
          <a href="/" className="block text-white hover:text-blue-300">Home</a>
          <a href="/about" className="block text-white hover:text-blue-300">About</a>
          <a href="/services" className="block text-white hover:text-blue-300">Services</a>

          {/* Conditional Rendering for Logged-in State in Mobile */}
          {loggedIn ? (
            <div className="flex flex-col space-y-2">
              <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 py-2 px-4 rounded-lg">
                Log Out
              </button>
            </div>
          ) : (
            <a href="/login" className="bg-green-500 py-2 px-4 rounded-lg hover:bg-green-600">Log In</a>
          )}
        </div>
      )}
    </header>
  );
}

// Footer Component
function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-8">
      <div className="container mx-auto text-center">
        <p>&copy; 2025 FinTechApp. All rights reserved.</p>
        <div className="space-x-6 mt-4">
          <a href="/privacy" className="hover:text-blue-300">Privacy Policy</a>
          <a href="/terms" className="hover:text-blue-300">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
