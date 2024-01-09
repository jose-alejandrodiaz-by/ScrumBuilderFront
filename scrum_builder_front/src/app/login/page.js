'use client'
import LoginForm from '../../components/LoginForm';
import { AuthProvider } from '../../context/AuthContext';

const Page = () => {
  return (
    <AuthProvider>
    <div>
      <h1>Login</h1>
      
      <LoginForm />
    </div>
    </AuthProvider>
  );
};

export default Page;