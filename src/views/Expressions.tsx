import { useState, useEffect, createContext } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import * as Colors from '../constants/colors';
import '../index.css';

import IColumn from './interfacesExpressions/IColumn';
import SimpleExpression from './componentsExpressions/SimpleExpression';
import ExpressionsProps from './interfacesExpressions/ExpressionsProps';



function Expressions(expressionsProps : ExpressionsProps) {


  const resetCounter = () =>{
    const arrayLength = simpleExpressions.length;
    if(arrayLength === 0){
      return 1;
    } else {
      return simpleExpressions[arrayLength-1].id + 1;
    }
  }


  
  const [expressionsInfo, setExpressionsInfo] = useState<any>([]);

  const handleExpressionsInfoChange = (expressionId : any, value : any) => {
    setExpressionsInfo({ ...expressionsInfo, [expressionId]: value });
  };

  
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
      {id:idCount, element:<SimpleExpression id = {idCount} columns = {columns} selfDeleteFunction={deleteSimpleExpression} handleExpressionsInfoChange={handleExpressionsInfoChange}/>}
    ])

    setIdCount(idCount+1);
  }

  const deleteSimpleExpression = (idToDelete : Number) =>{
    const newArr = simpleExpressions.filter((item:any) => item.id != idToDelete);
    
    setSimpleExpressions(newArr);
  }

  const checkExpressionsInfo = () => {
    for (let exp  in expressionsInfo) {
      for (let val  in expressionsInfo[exp]) {
        if(expressionsInfo[exp][val]===''){
          
          expressionsProps.setExpressionsInfoOk(false);
        }
      }
    }
  }

  useEffect(() => {
    expressionsProps.setExpressions(expressionsInfo);
    
  }, [expressionsInfo])




  const renderSimpleExpressions = () => {
    return simpleExpressions.map(
      (exp : any) => exp.element
    );
  }
  


 
  
  return (
    <Stack sx={{mx:'20%'}}>
      
      <Box>
        <Box padding={4}>Expresiones Simples</Box>
        <Box>
          <SimpleExpression id={0} columns = {columns} selfDeleteFunction={deleteSimpleExpression} handleExpressionsInfoChange={handleExpressionsInfoChange}/>
          
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

    </Stack>
  )
}

export default Expressions