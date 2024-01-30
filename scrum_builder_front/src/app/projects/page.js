'use client'
import GetProject from '../../components/GetProject';
import { AuthProvider } from '../../context/AuthContext';

const Page = () => {
  return (

    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-2xl font-bold text-center py-2">Project</div>
      
      <GetProject />
    </div>

  );
};

export default Page;