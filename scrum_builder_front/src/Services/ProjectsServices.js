import axios from 'axios';
import Cookies from 'js-cookie';

const token = Cookies.get('jwt_token');

const instance = axios.create({
  baseURL: "https://localhost:7041/api/",
  timeout: 100000,
  headers:  { Authorization: `Bearer ${token}` }
})
const dummyData = '{"project_name":"testFromFront6","project_code":"TFF6","project_type_id":2,"platform_id":1,"modules":[{"id":4}],"environments":[{"id":4}]}'
const postProject = async data => {
  console.log("data before sending: "+data)
  try {
    const response = await instance.post(`Projects/`, data,{
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Handle successful response
    console.log("Project succesfully created")
    return response.data;
  } catch (error) {
    // Handle errors
    console.error('Error posting project:', error.message);
    return error;
  }
};

const getProject = async id =>{
    const response = await instance.get(`Projects/${id}`);
    return response.data;
};

async function getAllProjects() {
  return await instance.get('Projects/');
}

async function getBasicPlatforms(){
  return await instance.get('Basic/Platforms/')
}

async function getBasicModules(){
  return await instance.get('Basic/Modules/')
}

async function getBasicEnvironments(){
  return await instance.get('Basic/Environments/')
}

async function getBasicProjectTypes(){
  return await instance.get('Basic/project_types/')
}

export {
    getProject, getAllProjects, postProject, getBasicPlatforms,getBasicModules,getBasicEnvironments,getBasicProjectTypes
}


