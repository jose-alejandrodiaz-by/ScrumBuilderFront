'use client'
import GetProject from '../../components/GetProject';
import { AuthProvider } from '../../context/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import NavBar from '../../components/NavBar';

const Page = () => {
  return (
    <AuthProvider>
    <ProtectedRoute>
    <NavBar/>
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-2xl font-bold text-center py-2">Project</div>
      
      <GetProject />
    </div>
    </ProtectedRoute>
    </AuthProvider>
  );
};

export default Page;