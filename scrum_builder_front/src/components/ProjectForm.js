import React, { useState } from 'react';
import {useGetBasicPlatforms} from "../hooks/BasicPlatforms";
import {useGetBasicEnvironments} from "../hooks/BasicEnvironments";
import {useGetBasicModules} from "../hooks/BasicModules";
import {useGetBasicProjectTypes} from "../hooks/BasicProjectTypes";
import Project from './Project';
import {postProject} from "../Services/ProjectsServices"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const FormComponent = ({ onSubmit }) => {
  const [formState, setFormState] = useState({
    project_name: '',
    project_code: '',
    project_type_id: '',
    platform_id: '',
    modules: [],
    environments: [],
  });

  //Loading Project Metadata
  const {platforms, error: {isError, errorMessage}, loading} = useGetBasicPlatforms();
  const {modules, error_mod: {isError_mod, errorMessage_mod}, loading_mod} = useGetBasicModules();
  const {environments, error_env: {isError_env, errorMessage_env}, loading_env} = useGetBasicEnvironments();
  const {projectTypes, error_pro: {isError_pro, errorMessage_pro}, loading_pro} = useGetBasicProjectTypes();
  
  const projectTypeOptions = projectTypes
  const platformTypeOptions=platforms
  const moduleOptions=modules;
  const EnvironmentOptions=environments

  //Handling FORM data from text boxes and radio buttons
  const handleInputChange = (event) => {
    const value = event.target.name === 'project_type_id' || event.target.name === 'platform_id' 
      ? Number(event.target.value) 
      : event.target.value;
  
    setFormState({
      ...formState,
      [event.target.name]: value,
    });
  };

  //Handling FORM data from check boxes
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
  
  
  //Handling action when submit button is clicked
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = JSON.stringify(formState)
      // Check for null values in formState
    const hasNullValues = Object.values(formState).some(value => value === null || value === '');

    if (hasNullValues) {
      toast.error('Please fill in all fields');
      return;
    }

    postProject(data).then(response =>{
      if(response.project_name){
        toast.success(`${response.project_name + " created succesfully"}`, {
          position: 'top-right',
          autoClose: 3000, // Duration in milliseconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }else{
        toast.error(`${response.message}`, {
          position: 'top-right',
          autoClose: 3000, // Duration in milliseconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
  
    })


    setFormState({
        project_name: '',
        project_code: '',
        project_type_id: '',
        platform_id: '',
        modules: [],
        environments: [],
      });

//service logic here
      if (onSubmit) {
        onSubmit();
      }
  };

  // JSX component returned value
  return (
    <div className="flex flex-col p-8 mr-80 ml-80 bg-white shadow-md rounded-md">
    <form onSubmit={handleSubmit} className="flex flex-col p-9 bg-white shadow-md rounded-md">
      <input
        type="text"
        name="project_name"
        placeholder="Project Name"
        value={formState.project_name}
        onChange={handleInputChange}
        className="mb-4 p-1 border border-gray-300 rounded-md"
      />
      <input
        type="text"
        name="project_code"
        placeholder="Project Code"
        value={formState.project_code}
        onChange={handleInputChange}
        className="mb-4 p-1 border border-gray-300 rounded-md"
      />
      <h3 className="mb-2 font-bold">Project Type</h3>
      <div className="flex flex-col sm:flex-row mb-4 space-y-2 sm:space-y-0 sm:space-x-2">
      {loading_pro ? (
      <input name="..."/>
      ): isError_pro?(
         <input name="error"/>
        ):(
      projectTypeOptions.map(projectType =>(
        <label key={projectType.id} className="flex-1">
          <input
            type="radio"
            name="project_type_id"
            style={{ marginRight: '0.5rem' }} 
            value= {projectType.id}
            checked={formState.project_type_id === projectType.id}
            onChange={handleInputChange}
            
          />
          {projectType.type_name}
          
        </label>
        )))}
      </div>
      <h3 className="mb-2 font-bold">Platform Type</h3>
      <div className="flex flex-col sm:flex-row mb-4 space-y-2 sm:space-y-0 sm:space-x-2">

      {loading ? (
      <input name="..."/>
      ): isError?(
         <input name="error"/>
        ):(
          platformTypeOptions.map(platformType =>(
        <label key={platformType.id} className="flex-1">
          <input
            type="radio"
            style={{ marginRight: '0.5rem' }} 
            name="platform_id"
            value= {platformType.id}
            checked={formState.platform_id === platformType.id}
            onChange={handleInputChange}
          />
          {platformType.platform_name}
          
        </label>
        )))}
      </div>
      <div className="grid grid-cols-2 gap-4 mb-5">
      <div className="col-span-1">
      <div>
          <h3 className="mb-2 font-bold">Modules</h3>
        </div>
          {loading_mod ? (
      <input name="..."/>
      ): isError_mod?(
         <input name="error"/>
        ):(
          moduleOptions.map((option) => (
            <div key={option.id}>
            <label key={option.id} className="flex-1">
              <input
                type="checkbox"
                style={{ marginRight: '0.5rem' }} 
                name="modules"
                value={option.id}
                checked={formState.modules.some(module => module.id === option.id)}
                onChange={handleCheckboxChange}
              />
              {option.module_name}
            </label>
            <br/>
            </div>
          )))}
        </div>
        <div className="col-span-1">
        <div>
          <h3 className="mb-2 font-bold">Environments</h3>
        </div>
          {loading_env ? (
      <input name="..."/>
      ): isError_env?(
         <input name="error"/>
        ):(
          EnvironmentOptions.map((option) => (
            <div key={option.id}>
            <label key={option.id} className="flex-1">
              <input
                type="checkbox"
                style={{ marginRight: '0.5rem' }} 
                name="environments"
                value={option.id}
                checked={formState.environments.some(environment => environment.id === option.id)}
                onChange={handleCheckboxChange}
              />
              {option.environment_name}
            </label>
            <br />
            </div>
          )))}
        </div>
        </div>
      <button className="p-2 bg-blue-500 text-white rounded-md">
        Submit
      </button>
      </form>
      <ToastContainer />
    </div>

    
  );
};

export default FormComponent;
