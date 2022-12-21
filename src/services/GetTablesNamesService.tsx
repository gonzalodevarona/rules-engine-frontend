import Axios from '../config/Axios'


export default async function fetchTablesNames(){
    
    let request = await Axios.get('api/v1/table');
    
    return request;
}

