import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

const LoginForm = () => {
  const router = useRouter(); // Initialize useRouter
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading} = useAuth();
  const { user } = useAuth();
  
  //console.log("checking user", user)
  if (user && !loading) {
      router.push('/');
    }

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Make a request to your Django backend to authenticate the user
      const response = await axios.post('http://127.0.0.1:8000/api/token/', {
        username,
        password,
      });
      
      // Assuming your Django backend returns a JWT token
      const token = response.data.access;
	  const refresh = response.data.refresh; 
	  
	  //token refresh control
	  const currentDate = new Date();
	   const TokenExpirationDate = new Date(currentDate.getTime() + 5 * 60 * 1000);
	  
	  // Make an API call with the JWT header token so that we receive the logged user which is authenticated from the DB
	  //This ensures the User receives the permision from database directly
      const user_response= await axios.get('http://127.0.0.1:8000/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
	  
	  const AuthUser = user_response.data.user_name;

      // Store the token in a cookie
      Cookies.set('jwt_token', token);
	  Cookies.set('jwt_refresh', refresh);
	  Cookies.set('jwt_expire',TokenExpirationDate.toISOString())
      console.log('Login successful!');

      // Update the context with the retrieved token
      login(AuthUser);

      // Redirect or perform any other actions after successful login
      router.push('/');
    } catch (error) {
      // Handle login error (display error message, etc.)
      console.error('Login failed:', error);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />
      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
};

export default LoginForm;