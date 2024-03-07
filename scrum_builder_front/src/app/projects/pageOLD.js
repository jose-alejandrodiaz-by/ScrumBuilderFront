'use client'
import React, { useState } from 'react';
import GetProject from '../../components/GetProject';
import { AuthProvider } from '../../context/AuthContext';
import NavBar from '../../components/NavBar';
import ProjectForm from '../../components/ProjectForm';
import ProtectedRoute from '../../components/ProtectedRoute'

const Page = () => {
  const [showProjectForm, setShowProjectForm] = useState(false);
  return (
    <AuthProvider>
    <ProtectedRoute>
    <NavBar/>
    <div className="mt-12">
          {showProjectForm && <ProjectForm onSubmit={() => setShowProjectForm(false)} />}
          <button 
            className="absolute right-12 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
            onClick={() => setShowProjectForm(true)}
          >
            Add Project
          </button>

        </div>
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-2xl font-bold text-center py-2">Project</div>
      
      <GetProject />
    </div>
    </ProtectedRoute>
    </AuthProvider>
  );
};

export default Page;