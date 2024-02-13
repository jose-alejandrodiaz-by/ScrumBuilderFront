import React, { useState } from 'react';



const FormComponent = ({ onSubmit }) => {
  const [formState, setFormState] = useState({
    projectName: '',
    projectCode: '',
    projectTypeId: '',
    platformId: '',
    modules: [],
    environments: [],
  });

  const projectTypeOptions = [
    { id: 1, name: 'project 1' },
    { id: 2, name: 'project 2' },
    // Add more module options as needed
  ];

  const platformTypeOptions = [
    { id: 1, name: 'platform 1' },
    { id: 2, name: 'platform 2' },
    // Add more module options as needed
  ];

  const moduleOptions = [
    { id: 1, name: 'Module 1' },
    { id: 2, name: 'Module 2' },
    // Add more module options as needed
  ];

  const EnvironmentOptions = [
    { id: 1, name: 'environment1' },
    { id: 2, name: 'environment2' },
    // Add more module options as needed
  ];

  const handleInputChange = (event) => {
    const value = event.target.name === 'projectTypeId' || event.target.name === 'platformId' 
      ? Number(event.target.value) 
      : event.target.value;
  
    setFormState({
      ...formState,
      [event.target.name]: value,
    });
  };

  const handleCheckboxChange = (event) => {
    const { name, value, checked } = event.target;
    const newValue = { id: Number(value) };
  
    setFormState((prevState) => {
      if (checked) {
        return {
          ...prevState,
          [name]: [...prevState[name], newValue],
        };
      } else {
        return {
          ...prevState,
          [name]: prevState[name].filter(item => item.id !== newValue.id),
        };
      }
    });
  };
  
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = JSON.stringify(formState)
    console.log(data)

    setFormState({
        projectName: '',
        projectCode: '',
        projectTypeId: '',
        platformId: '',
        modules: [],
        environments: [],
      });

//service logic here
      if (onSubmit) {
        onSubmit();
      }
  };

  return (
    <div className="flex flex-col p-9 bg-white shadow-md rounded-md">
    <form onSubmit={handleSubmit} className="flex flex-col p-8 bg-white shadow-md rounded-md">
      <input
        type="text"
        name="projectName"
        placeholder="Project Name"
        value={formState.projectName}
        onChange={handleInputChange}
        className="mb-4 p-4 border border-gray-300 rounded-md"
      />
      <input
        type="text"
        name="projectCode"
        placeholder="Project Code"
        value={formState.projectCode}
        onChange={handleInputChange}
        className="mb-4 p-4 border border-gray-300 rounded-md"
      />
      <div className="flex flex-col sm:flex-row mb-4 space-y-2 sm:space-y-0 sm:space-x-2">
      {projectTypeOptions.map(projectType =>(
        <label key={projectType.id} className="flex-1">
          <input
            type="radio"
            name="projectTypeId"
            value= {projectType.id}
            checked={formState.projectTypeId === projectType.id}
            onChange={handleInputChange}
            
          />
          {projectType.name}
        </label>
        ))}
      </div>
      <div className="flex flex-col sm:flex-row mb-4 space-y-2 sm:space-y-0 sm:space-x-2">
      {platformTypeOptions.map(platformType =>(
        <label key={platformType.id} className="flex-1">
          <input
            type="radio"
            name="platformId"
            value= {platformType.id}
            checked={formState.platformId === platformType.id}
            onChange={handleInputChange}
          />
          {platformType.name}
        </label>
        ))}
      </div>
      <div className="flex flex-col sm:flex-row mb-4 space-y-2 sm:space-y-0 sm:space-x-2">
          {moduleOptions.map((option) => (
            <label key={option.id} className="flex-1">
              <input
                type="checkbox"
                name="modules"
                value={option.id}
                checked={formState.modules.some(module => module.id === option.id)}
                onChange={handleCheckboxChange}
              />
              {option.name}
            </label>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row mb-4 space-y-2 sm:space-y-0 sm:space-x-2 items-center">
          {EnvironmentOptions.map((option) => (
            <label key={option.id} className="flex-1">
              <input
                type="checkbox"
                name="environments"
                value={option.id}
                checked={formState.environments.some(environment => environment.id === option.id)}
                onChange={handleCheckboxChange}
              />
              {option.name}
            </label>
          ))}
        </div>
      <button className="p-2 bg-blue-500 text-white rounded-md">
        Submit
      </button>
      </form>
    </div>
  );
};

export default FormComponent;
