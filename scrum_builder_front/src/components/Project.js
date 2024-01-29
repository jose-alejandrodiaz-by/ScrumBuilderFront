import React from 'react';

const Project = ({ project }) => {


  return (
    <div className="project bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-2">{project.project_name}</h2>
      <p className="mb-1">Project Code: {project.project_code}</p>
      <p className="mb-3">Created On: {new Date(project.created_on).toLocaleDateString()}</p>
      <div className="flex space-x-4"> {/* Add flex container and horizontal spacing */}
        <div className="inline-block">
          <h3 className="mt-3">Modules:</h3>
          <ul>
            {project.modules.map(module => (
              <li key={module.id} className="list-disc list-inside">{module.module_name}</li>
            ))}
          </ul>
        </div>
        <div className="inline-block">
          <h3 className="mt-3">Environments:</h3>
          <ul>
            {project.environments.map(env => (
              <li key={env.id} className="list-disc list-inside">{env.environment_name}</li>
            ))}
          </ul>
        </div>
      </div>


    </div>
  );
};

export default Project;
