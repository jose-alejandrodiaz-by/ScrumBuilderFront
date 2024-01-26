'use client';
// app/page.js
//import Head from 'next/head';
import Link from 'next/link';
//import styles from '../styles/Home.module.css';
//import { AuthProvider } from '../context/AuthContext';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { user, logout } = useAuth();
  console.log(user + " log")
 return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      
      <div className="text-2xl font-bold text-center py-2">Welcome to the Home Page</div>
      {user ? (
        <div>
          <p>Hello, {user.username}!</p>
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={logout}>Logout</button>
        </div>
      ) : (
        <div className="flex flex-col items-center space-y-4">
          <p>Please log in to access the scrum builder UI</p>
          <Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" href="/login" id="login">
            login
          </Link>
        </div>
      )}
    </div>
  );
}