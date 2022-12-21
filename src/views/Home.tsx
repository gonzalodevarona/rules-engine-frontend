import { useState, useContext, useEffect, createContext } from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import GetColumnsService from '../services/GetColumnsService'
import GetTablesNamesService from '../services/GetTablesNamesService'
import TablePicker from './componentsHome/TablePicker'
import Expressions from './Expressions';
import Rules from './Rules';
import * as Styles from '../constants/styles'



const ExpressionsContext = createContext([]);

function Home() {

    const x = async () => {
        const y = await GetTablesNamesService();
        console.log(await GetColumnsService(y.data[2].tableName));
        
    }


    const [expressionsInfoOk, setExpressionsInfoOk] = useState(true);
    

    const [selectedTable, setSelectedTable] = useState('');
  
    const [page, setPage] = useState(2);

    const goNextPage = () => {
        if(page <3) setPage(page +1)
    }

    const goBackPage = () => {
        if(page >1) setPage(page -1)
    }

    useEffect(() => {
    console.log(expressionsInfoOk)
    }, [expressionsInfoOk])
    


    const [expressions, setExpressions] = useState([]);

    const renderContent = () =>{
        switch (page) {
            case 1:
                //return <TablePicker setSelectedTable={setSelectedTable}/>
            //break;
            case 2:
                return <Expressions setExpressions={setExpressions} setExpressionsInfoOk={setExpressionsInfoOk}/>
            break;
            case 3:
                return <Rules/>
            break;

            default:
                return <TablePicker setSelectedTable={setSelectedTable}/>
                break;
        }
    }



  return (
    <Stack>
        <ExpressionsContext.Provider value={expressions}>
            <Box 
            display="flex" 
            alignItems="center"
            justifyContent="center" 
            className='font-LexendBold'
            margin={'3%'}
            marginTop={11}
            >
                Motor de Reglas ⚙️
            </Box>

           {renderContent()}
            
                <Box sx={{display:"flex", justifyContent:"space-evenly", my:11 }}>
                    
                { page != 3 &&
                    <Button disabled={!expressionsInfoOk} variant="contained" sx={Styles.BIG_BTN_STYLE} onClick={goNextPage}>
                        Siguiente ➡
                    </Button>
                }
                </Box>
            
            
        </ExpressionsContext.Provider>
    </Stack>
  )
}

export default Home;

export const useExpressions = () => useContext(ExpressionsContext);