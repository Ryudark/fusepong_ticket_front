import { create } from 'apisauce';
import axios from 'axios';
import environment from "../../environment/environment"
import { InfoProject } from '@/types/Company.type';

export const getProjects = async(CompanyId:InfoProject)=>{
    console.log(CompanyId);
    const projects = await axios.get('http://localhost:4000/business/Project', {params:{CompanyId:CompanyId}})
        .then(response => {
            console.log(response);
        })
        .catch(error => {
        console.error('Error al obtener datos:', error);
        });
    console.log(projects);
    return projects
}