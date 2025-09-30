import { User, UserSchema } from '@/types/user.type';
import axios from 'axios';

export const createUser = async(data:UserSchema)=>{
    axios.post('http://localhost:4000/user/User', data)
        .then(response => {
        console.log(response);
        })
        .catch(error => {
        console.error('Error al obtener datos:', error);
        });
}

export const loginUser = async (data:User)=>{
    console.log(data);
    const user = axios.post('http://localhost:4000/user/user/login', data)
        .then(response => {
            return response.data
        })
        .catch(error => {
        console.error('Error al obtener datos:', error);
        });
    return user
}