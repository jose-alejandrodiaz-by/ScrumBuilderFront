
'use client'
// app/_app.js
import { AuthProvider } from '../context/AuthContext';
import Home from './home'

import NavBar from '../components/NavBar'


const MyApp = () => {
  
  return (
    <AuthProvider>
    <NavBar/>
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <Home/>
    </div>
    
    </AuthProvider>
    );
  
};

export default MyApp;