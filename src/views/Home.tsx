import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import * as Colors from '../constants/colors';
import '../index.css';

import IColumn from './interfacesHome/IColumn';
import SimpleExpressionProps from './interfacesHome/SimpleExpressionProps'
import SimpleExpression from './componentsHome/SimpleExpression';

function Home() {

  

  const resetCounter = () =>{
    const arrayLength = simpleExpressions.length;
    if(arrayLength === 0){
      return 1;
    } else {
      return simpleExpressions[arrayLength-1].id + 1;
    }
  }
  

  const [simpleExpressions, setSimpleExpressions] = useState<any>([]);
  
  const [idCount, setIdCount] = useState(resetCounter());

  const [disableAddSimpleExpressions, setDisableAddSimpleExpressions] = useState(false);


  const firstRow : IColumn = {name:"Country", type:"String"};
  const secondRow : IColumn = {name:"Age", type:"Number"};
  const thirdRow : IColumn = {name:"Single", type:"Boolean"};
  
  const columns : IColumn[] =[
    firstRow, secondRow, thirdRow
  ];


  useEffect(() => {
    if(simpleExpressions.length === 3){
      setDisableAddSimpleExpressions(true);
    } else{

      if(disableAddSimpleExpressions === true){
        setDisableAddSimpleExpressions(false);
      }
    }
  }, [simpleExpressions])

  const addSimpleExpression = () =>{
    setSimpleExpressions((oldArray: any)  => 
    [ ...oldArray, 
      {id:idCount, element:<SimpleExpression id = {idCount} columns = {columns} deleteFunction={deleteSimpleExpression}/>}
    ])

    setIdCount(idCount+1);
  }

  const deleteSimpleExpression = () =>{
    
  }

  const renderSimpleExpressions = () => {
    return simpleExpressions.map(
      (exp : any) => exp.element
    );
  }
  


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
          <SimpleExpression id={0} columns = {columns} deleteFunction={deleteSimpleExpression}/>
          
          {renderSimpleExpressions()}
          
        </Box>

        <IconButton 
          disabled={ disableAddSimpleExpressions } 
          sx={{color: Colors.ICESI_COLOR}} 
          onClick={ addSimpleExpression }
        >
          <AddCircleIcon sx={{fontSize: 50}} />
        </IconButton>

      </Box>
    </Box>
  )
}

export default Home