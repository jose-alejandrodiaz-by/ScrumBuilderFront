import jwt from 'jsonwebtoken';
import Cookies from 'js-cookie';

export const getJWTTokenObject = () => {
    let token = Cookies.get('jwt_token');
    if(token){
    const decodedToken = jwt.decode(token, { complete: true });
    
    return decodedToken.payload
    }
    return '0'
    

}
