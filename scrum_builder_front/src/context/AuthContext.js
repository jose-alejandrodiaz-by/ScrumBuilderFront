
// context/AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { getJWTTokenObject } from '../common_tools/getJWTTokenObject';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if the user is authenticated (e.g., check for a token in cookies)
    let token = Cookies.get('jwt_token');

    const currentTime = Math.floor(Date.now() / 1000);
    const payload = getJWTTokenObject()
    console.log(payload.exp)

        if (currentTime>payload.exp){
          Cookies.remove('jwt_token')
          router.push('/login')
        }

    // Make an API call with the JWT header token so that we receive the logged user which is authenticated from the DB
    // This ensures the User receives the permission from the database directly
    const fetchData = async () => {
      try {
        

        const AuthUser = token;


        // Set the user object if the token is present, else clear the user object
        setUser(AuthUser ? { AuthUser } : null);

        //log the user name

        // Set loading to false as we've checked for the token
        setLoading(false);
      } catch (error) {
        //console.error('Error fetching user data:', error);
        // Set loading to false even if there's an error
        setLoading(false);
      }
    };

    fetchData();
  }, [setUser, setLoading]);

  const login = (token) => {
    // Set the user object when the user logs in
    setUser({ token });
  };

  const logout = () => {
    // Clear the user object when the user logs out
    setUser(null);
    Cookies.remove('jwt_token');
    router.push('/login');
    //Cookies.remove('jwt_expire');
    //Cookies.remove('jwt_refresh');
    // Add any additional cleanup or API calls for logout if needed
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
