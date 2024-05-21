'use client';
// app/page.js
//import Head from 'next/head';
//import styles from '../styles/Home.module.css';
//import { AuthProvider } from '../context/AuthContext';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { user } = useAuth();
  //console.log(user + " log")
 return (
    <div >
      <div className="text-2xl font-bold text-center py-2">Welcome to the Home Page</div>
      {user ? (
        <div >
          <p>Hello, {user.username}!</p>
          <h2>This is the web page when the user is logged in</h2>
        </div>
      ) : (
        <div >
          <p>Please log in to access the scrum builder UI, you are watching
            the template page without authentication
          </p>
        </div>
      )}
    </div>
  );
}