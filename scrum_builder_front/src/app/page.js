
'use client'
// app/_app.js
import { AuthProvider } from '../context/AuthContext';
import Home from './home'

import NavBar from '../components/NavBar'
import '../style/main.css'


const MyApp = () => {
  
  return (
    <AuthProvider>
    <NavBar/>
    <div className="container">
      <Home/>
    </div>
    
    </AuthProvider>
    );
  
};

export default MyApp;