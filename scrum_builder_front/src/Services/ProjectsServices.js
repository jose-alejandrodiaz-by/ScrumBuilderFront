import axios from 'axios';
import Cookies from 'js-cookie';

const token = Cookies.get('jwt_token');

const instance = axios.create({
  baseURL: "https://localhost:7041/api/",
  timeout: 100000,
  headers:  { Authorization: `Bearer ${token}` }
})

const postProject = async data => {
  try {
    // const response = await instance.post(`Projects/`, {
    //   data,
    // });
    const response = await instance.post(``, {
      data,
    });
    // Handle successful response
    console.log("Project succesfully created")
    return response.data;
  } catch (error) {
    // Handle errors
    console.error('Error posting project:', error.message);
    throw error;
  }
};

const getProject = async id =>{
    const response = await instance.get(`Projects/${id}`);
    return response.data;
};

async function getAllProjects() {
  return await instance.get('Projects/');
}

export {
    getProject, getAllProjects, postProject
}


