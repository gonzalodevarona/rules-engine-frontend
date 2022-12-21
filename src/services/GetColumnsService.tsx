import Axios from '../config/Axios'


export default async function fetchColumns(colName : String){
    
    let request = await Axios.get(`api/v1/table/${colName}`,   {headers: {
        "Authorization":"Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiI4MjY4NGI0My1mMTBhLTQ2N2MtYTExYS1lMzExY2YwYjEzMGQiLCJleHAiOjMwMDAwMDE2NzE2MzUzNDZ9.MxokcVftuxXZlFZxBjequapKAKXv8jTLEULP41stiZ8"
        
      }});
    
      console.log(request)
    return request.data;
}

