import React from 'react'
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import * as Colors from '../constants/colors';
import '../index.css';

import IColumn from './interfacesHome/IColumn';
import IArrayColumn from './interfacesHome/IArrayColumn';
import SimpleExpression from './componentsHome/SimpleExpression';

function Home() {

  const firstRow : IColumn = {name:"Country", type:"String"};
  const secondRow : IColumn = {name:"Age", type:"Number"};
  const thirdRow : IColumn = {name:"Single", type:"Boolean"};
  
  const columns : IArrayColumn = {columns :[
    firstRow, secondRow, thirdRow
  ]};

  return (
    <Box sx={{mx:'20%'}}>
      <Box 
        display="flex" 
        alignItems="center"
        justifyContent="center" 
        className='font-LexendBold'
        margin={'4%'}
      >
        Motor de Reglas ⚙️
      </Box>
      
      <Box>
        <Box padding={4}>Expresiones Simples</Box>
        <Box>
          <SimpleExpression columns = {columns.columns}/>
        </Box>

        <IconButton>
          <AddCircleIcon sx={{color: Colors.ICESI_COLOR, fontSize: 50}}/>
        </IconButton>

      </Box>
    </Box>
  )
}

export default Home