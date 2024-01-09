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
    <div>
      <h1>Welcome to the Home Page</h1>
      {user ? (
        <div>
          <p>Hello, {user.username}!</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <div>
          <p>Please log in to access the content.</p>
          <Link href="/login" id="login">
            login
          </Link>
        </div>
      )}
    </div>
  );
}