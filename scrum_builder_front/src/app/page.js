
'use client'
// app/_app.js
import { AuthProvider } from '../context/AuthContext';
import Home from './home'

const MyApp = ({ Component, pageProps }) => {
  
  return (
    <AuthProvider>
    <div class="flex items-center justify-center h-screen"><Home/></div>
    </AuthProvider>
    );
  
};

export default MyApp;