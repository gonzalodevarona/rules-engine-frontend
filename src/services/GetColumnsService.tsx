import Axios from '../config/Axios'


export default async function fechColumns(){
    
    let request = await Axios.get('api/v1/table');
    
    return request;
}

