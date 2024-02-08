import axios from 'axios';
import Cookies from 'js-cookie';

const token = Cookies.get('jwt_token');

const instance = axios.create({
  baseURL: "https://localhost:7041/api/",
  timeout: 1000,
  headers:  { Authorization: `Bearer ${token}` }
})

const getProject = async id =>{
    const response = await instance.get(`Projects/${id}`);
    return response.data;
};

const getAllProjects = async ()  => {
  const response = await instance.get('Projects/');
  return response.data;
}

export default {
    getProject, getAllProjects
}


