// components/ProtectedRoute.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user && !loading) {
      router.push('/login');
    }
  }, [user, loading, router]);

  // Display a loading spinner or other loading indicator while authentication is in progress
  if (loading) {
    return <p>Loading...</p>;
  }

  return user ? children : null;
};

export default ProtectedRoute;