import React, { useEffect,useState } from 'react';
import { useGetBasicPlatforms } from "../hooks/BasicPlatforms";
import { useGetBasicEnvironments } from "../hooks/BasicEnvironments";
import { useGetBasicModules } from "../hooks/BasicModules";
import { useGetBasicProjectTypes } from "../hooks/BasicProjectTypes";
//import Project from './Project';
import { postProject } from "../Services/ProjectsServices"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../context/AuthContext';
import '../style/main.css'
import { useGetData } from '../hooks/useGetData';
import {getBasicPlatforms} from "../Services/ProjectsServices";


const FormComponent = () => {
  const [formState, setFormState] = useState({
    project_name: '',
    project_code: '',
    project_type_id: '',
    platform_id: '',
    region_id: '',
    modules: [],
    environments: [],
  });
  const { logout } = useAuth();
  const regions = [
    { id: 1, name: 'AMER' },
    { id: 2, name: 'APAC' },
    { id: 3, name: 'EMEA' }
  ]

  const [projectTypeOptions, setProjectTypeOptions] = useState([])
  const [platformTypeOptions, setPlatformTypeOptions] = useState([])
  const [moduleOptions, setModuleOptions] = useState([])
  const [EnvironmentOptions, setEnvironmentOptions] = useState([])
  


  const { platforms, error: { isError }, loading} =  useGetBasicPlatforms();
  const { modules, error_mod: { isError_mod }, loading_mod} = useGetBasicModules();
  const { environments, error_env: { isError_env }, loading_env} = useGetBasicEnvironments();
  const { projectTypes, error_pro: { isError_pro }, loading_pro } =  useGetBasicProjectTypes();
  
  



  useEffect( () => {
    setProjectTypeOptions(projectTypes)
    setPlatformTypeOptions(platforms)
    setModuleOptions(modules)
    setEnvironmentOptions(environments)
  });


  //Handling FORM data from text boxes and radio buttons
  const handleInputChange = (event) => {
    const value = event.target.name === 'project_type_id' || event.target.name === 'platform_id' || event.target.name === 'region_id'
      ? Number(event.target.value)
      : event.target.value;
      console.log(event);
      console.log(value);
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
      }
      return {
        ...prevState,
        [name]: prevState[name].filter(item => item.id !== newValue.id),
      };
  
    });

  }


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

    postProject(data).then(response => {
      if (response.project_name) {
        toast.success(`${response.project_name + " created succesfully"}`, {
          position: 'top-right',
          autoClose: 3000, // Duration in milliseconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error(`${response.message}`, {
          position: 'top-right',
          autoClose: 3000, // Duration in milliseconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
         );
         if((response.message).includes("401")){
          logout()
         }
      }

    })


    setFormState({
      project_name: '',
      project_code: '',
      project_type_id: '',
      platform_id: '',
      region_id: '',
      modules: [],
      environments: [],
    });

    //service logic here

  };

console.log(formState);

  // JSX component returned value
  return (
    <div className='content'>
    <div className="flex p-8 bg-white shadow-md rounded-md justify-center">
      <form onSubmit={handleSubmit} className="flex flex-col p-9 w-[500px] mb-10 bg-white shadow-md rounded-md ">
        <input
          type="text"
          name="project_name"
          placeholder="Medtronic TMS 2022.1.0"
          value={formState.project_name}
          onChange={handleInputChange}
          
        />
        <input
          type="text"
          name="project_code"
          placeholder="MTTM22"
          value={formState.project_code}
          onChange={handleInputChange}
        />
        <h3 className="mb-2 font-bold">Project Type</h3>
        <div className="flex flex-col sm:flex-row mb-4 space-y-2 sm:space-y-0 sm:space-x-2">
          {loading_pro ? (
            <input name="..." />
          ) : isError_pro ? (
            <input name="error" />
          ) : (
            <select onChange={(event)=>{setFormState({
              ...formState,
              "project_type_id": event.target.value,
                })}} 
              value={projectTypeOptions.project_name}
            >
              <option key={0}>Select a Project Type</option>
              {projectTypeOptions.map(projectType => (
                <option key={projectType.id} value={projectType.id}>{projectType.type_name}</option>
              ))}
					</select>
            )}
        </div>

        <h3>Platform Type</h3>
        <div className="flex flex-col sm:flex-row mb-4 space-y-2 sm:space-y-0 sm:space-x-2">

          {loading ? (
            <input name="..." />
          ) : isError ? (
            <input name="error" />
          ) : (
            <select onChange={(event)=>{setFormState({
              ...formState,
              "platform_id": event.target.value,
                })}} 
              value={formState.project_name}>
            <option key={0}>Select a Platform Type</option>
						{platformTypeOptions.map(platformType => (
							<option key={platformType.id} value={platformType.id}>{platformType.platform_name}</option>
						))}
					</select>
            )}
        </div>

        <h3>Region</h3>
        <div className="flex flex-col sm:flex-row mb-4 space-y-2 sm:space-y-0 sm:space-x-2">
          {loading_pro ? (
            <input name="..." />
          ) : isError_pro ? (
            <input name="error" />
          ) : (
            <select onChange={(event)=>{setFormState({
              ...formState,
              "region_id": event.target.value,
            });}} value={formState.project_name}>
              <option key={0}>Select a Region</option>
              {regions.map(region => (
                <option key={region.id} value={region.id}>{region.name}</option>
              ))}
					</select>
        )}
        </div>

        <div className="grid grid-cols-2 gap-4 mb-5">
          <div className="col-span-1">
            <div>
              <h3>Modules</h3>
            </div>
            {loading_mod ? (
              <input name="..." />
            ) : isError_mod ? (
              <input name="error" />
            ) : (
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
                  <br />
                </div>
              )))}
          </div>
          <div className="col-span-1">
            <div>
              <h3>Environments</h3>
            </div>
            {loading_env ? (
              <input name="..." />
            ) : isError_env ? (
              <input name="error" />
            ) : (
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
        <button>
          Submit
        </button>
      </form>
      <ToastContainer />
    </div>

    </div>  
  );
};


export default FormComponent;
