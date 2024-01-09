
'use client'
// app/_app.js
import { AuthProvider } from '../context/AuthContext';
import Home from './home'

const MyApp = ({ Component, pageProps }) => {
  
  return (
    <AuthProvider>
    <Home/>
    </AuthProvider>
    );
  
};

export default MyApp;