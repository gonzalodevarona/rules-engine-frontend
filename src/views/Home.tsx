import { useState, useContext, createContext } from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Expressions from './Expressions';
import Button from '@mui/material/Button';

import GetColumnsService from '../services/GetColumnsService'
import Rules from './Rules';


const ExpressionsContext = createContext([]);

function Home() {

    console.log(GetColumnsService())
  
    const [page, setPage] = useState(1);

    const goNextPage = () => {
        if(page <2) setPage(page +1)
    }


    const [expressions, setExpressions] = useState([]);

  return (
    <Stack>
        <ExpressionsContext.Provider value={expressions}>
            <Box 
            display="flex" 
            alignItems="center"
            justifyContent="center" 
            className='font-LexendBold'
            margin={'4%'}
            >
                Motor de Reglas ⚙️
            </Box>
            { page === 1 
                ? <Expressions setExpressions={setExpressions}></Expressions>
                : <Rules></Rules>
            }
            <Box sx={{display:"flex", justifyContent:"end" }}>
                <Button variant="contained" onClick={goNextPage}>
                    Siguiente ➡
                </Button>
            </Box>
        </ExpressionsContext.Provider>
    </Stack>
  )
}

export default Home;

export const useExpressions = () => useContext(ExpressionsContext);