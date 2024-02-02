import React from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

const Navigation = ({ isLoggedIn }) => {
    const { user, logout } = useAuth();
  return (
    <nav className="bg-gray-800 text-white p-4">
      <ul className="flex space-x-4">
        <li>
          <Link href="/" className="hover:text-blue-300">
            Home
          </Link>
        </li>
        <li>
            {user ? (
                <Link href="/projects" className="hover:text-blue-300">
                    Projects
                </Link>
                
            ) : (
                <div/>
            )}

        </li>
        <li>
          {user ? (
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
            >
              Logout
            </button>
          ) : (
            <Link href="/login" className="hover:text-blue-300">
              Login
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
