
'use client'
// app/_app.js
import { AuthProvider } from '../context/AuthContext';
import Home from './home'
import Project from '../components/Project'


const MyApp = ({ Component, pageProps }) => {
  
  return (
    <AuthProvider>
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
  
      <Home/>
      <br/>
      <h3>Testing components</h3>
    </div>
    
    </AuthProvider>
    );
  
};

export default MyApp;