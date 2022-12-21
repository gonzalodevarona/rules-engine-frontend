import Axios from '../config/Axios'


export default async function fetchColumns(colName : String){
    
    let request = await Axios.get(`api/v1/table/${colName}`,  { headers: {
        Authorization:'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiI4MjY4NGI0My1mMTBhLTQ2N2MtYTExYS1lMzExY2YwYjEzMGQiLCJleHAiOjMwMDAwMDE2NzE1ODMyODd9.P_-y4SU2iKlCXYveWlVZMVtuIl3A4q69HMfjK5ttDpQ',"Access-Control-Allow-Origin": "*"}
      });
    

    return request.data;
}

