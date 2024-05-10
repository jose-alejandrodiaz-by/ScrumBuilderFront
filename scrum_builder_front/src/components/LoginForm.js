import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import {ApiURL} from '../common_tools/ApiURL'
import { UpdateToken } from '../Services/ProjectsServices';


const LoginForm = () => {
  const router = useRouter(); // Initialize useRouter
  const [user_name, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, user } = useAuth();

  useEffect(() => {
    if (user && !loading) {
      UpdateToken()
      router.push('/');
    }
  }, [user, loading, router]);

  //console.log("checking user", user)
  //if (user && !loading) {
  //    router.push('/');
  //  }

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Make a request to your Django backend to authenticate the user
      const response = await axios.post(`https://${ApiURL}/api/Login`, {
        user_name,
        password,
      });

      
      const sessionToken = response.data.access_token;
      
      //const refresh = response.data.refresh; 

      
      const AuthUser = sessionToken
      // Store the token in a cookie
      Cookies.set('jwt_token', sessionToken);
      //Cookies.set('jwt_refresh', refresh);
      //Cookies.set('jwt_expire',TokenExpirationDate.toISOString())

      // Update the context with the retrieved token
      login(AuthUser);

      // Redirect or perform any other actions after successful login
      router.push('/');
    } catch (error) {
      // Handle login error (display error message, etc.)
      //console.error('Login failed:', error);
    }
  };

  return (
    <form className="flex flex-col items-center justify-center" onSubmit={handleLogin}>
      <label>
        Username:
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text" value={user_name} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <br />
      <label>
        Password:
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
};

export default LoginForm;