import axios from 'axios';
import Cookies from 'js-cookie';

const getProject = async id =>{
    const token = Cookies.get('jwt_token');
    const config = {
    
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axios.get(`https://localhost:7041/api/Projects/${id}`, config);
    return response.data;
};

export default {
    getProject
}