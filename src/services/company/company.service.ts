import { create } from 'apisauce';
import axios from 'axios';
import environment from "../../environment/environment"

const api = create({
    baseURL: environment.baseApiUrl,
    headers: {
        Accept: "/",
    },
    timeout: 15000
});

export const getCompanies = async()=>{
    const companies = axios.get('http://localhost:4000/business/Company')
        .then(response => {
        return response.data
        })
        .catch(error => {
        console.error('Error al obtener datos:', error);
        });
    return companies
}