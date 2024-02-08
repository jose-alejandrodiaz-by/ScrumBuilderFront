import React, { useState } from 'react';

const FormComponent = () => {
  const [formState, setFormState] = useState({
    projectName: '',
    projectCode: '',
    projectTypeId: '',
    platformId: '',
    modules: [],
    environments: [],
  });

  const moduleOptions = [
    { id: 1, name: 'Module 1' },
    { id: 2, name: 'Module 2' },
    // Add more module options as needed
  ];

  const EnvironmentOptions = [
    { id: 1, name: 'environment1' },
    { id: 2, name: 'environmnet2' },
    // Add more module options as needed
  ];

  const handleInputChange = (event) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  const handleCheckboxChange = (event) => {
    if (event.target.checked) {
      setFormState((prevState) => ({
        ...prevState,
        [event.target.name]: [...prevState[event.target.name], { id: Number(event.target.value) }],
      }));
    }
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
  };

  return (
    <div className="flex flex-col p-8 bg-white shadow-md rounded-md">
    <form onSubmit={handleSubmit} className="flex flex-col p-8 bg-white shadow-md rounded-md">
      <input
        type="text"
        name="projectName"
        placeholder="Project Name"
        onChange={handleInputChange}
        className="mb-4 p-2 border border-gray-300 rounded-md"
      />
      <input
        type="text"
        name="projectCode"
        placeholder="Project Code"
        onChange={handleInputChange}
        className="mb-4 p-2 border border-gray-300 rounded-md"
      />
      <div className="mb-4">
        <label>
          <input
            type="radio"
            name="projectTypeId"
            value="1"
            onChange={handleInputChange}
          />
          NI
        </label>
        <label>
          <input
            type="radio"
            name="projectTypeId"
            value="2"
            onChange={handleInputChange}
          />
          Upg
        </label>
        <label>
          <input
            type="radio"
            name="projectTypeId"
            value="3"
            onChange={handleInputChange}
          />
          J2C
        </label>
      </div>
      <div className="mb-4">
        <label>
          <input
            type="radio"
            name="platformId"
            value="1"
            onChange={handleInputChange}
          />
          PC
        </label>
        <label>
          <input
            type="radio"
            name="platformId"
            value="2"
            onChange={handleInputChange}
          />
          AZ
        </label>
      </div>
      <div className="mb-4">
          {moduleOptions.map((option) => (
            <label key={option.id}>
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
        <div className="mb-4">
          {EnvironmentOptions.map((option) => (
            <label key={option.id}>
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
