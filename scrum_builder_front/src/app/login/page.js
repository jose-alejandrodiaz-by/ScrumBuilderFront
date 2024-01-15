'use client'
import LoginForm from '../../components/LoginForm';
import { AuthProvider } from '../../context/AuthContext';

const Page = () => {
  return (
    <AuthProvider>
    <div class="flex flex-col items-center justify-center h-screen">
      <div class="text-2xl font-bold text-center py-2">Login to scrum builder</div>
      
      <LoginForm />
    </div>
    </AuthProvider>
  );
};

export default Page;