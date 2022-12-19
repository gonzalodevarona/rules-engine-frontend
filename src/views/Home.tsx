import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import * as Colors from '../constants/colors';
import '../index.css';

import IColumn from './interfacesHome/IColumn';
import * as Styles from '../constants/styles'
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


  
  const [expressionsInfo, setExpressionsInfo] = useState<any>([]);

  const handleExpressionsInfoChange = (expressionId : any, value : any) => {
    setExpressionsInfo({ ...expressionsInfo, [expressionId]: value });
  };

  
  const [simpleExpressions, setSimpleExpressions] = useState<any>([]);
  
  const [idCount, setIdCount] = useState(resetCounter());

  const [isNextViewTriggered, setIsNextViewTriggered] = useState(false);
  
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
      {id:idCount, element:<SimpleExpression id = {idCount} columns = {columns} selfDeleteFunction={deleteSimpleExpression} isNextViewTriggered={isNextViewTriggered} handleExpressionsInfoChange={handleExpressionsInfoChange}/>}
    ])

    setIdCount(idCount+1);
  }

  const deleteSimpleExpression = (idToDelete : Number) =>{
    const newArr = simpleExpressions.filter((item:any) => item.id != idToDelete);
    
    setSimpleExpressions(newArr);
  }

  const renderSimpleExpressions = () => {
    return simpleExpressions.map(
      (exp : any) => exp.element
    );
  }
  


  useEffect(() => {
    console.log(expressionsInfo)
  }, [expressionsInfo])
  
  return (
    <Stack sx={{mx:'20%'}}>
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
          <SimpleExpression id={0} columns = {columns} selfDeleteFunction={deleteSimpleExpression} isNextViewTriggered={isNextViewTriggered} handleExpressionsInfoChange={handleExpressionsInfoChange}/>
          
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
      <Box sx={{display:"flex" ,
        
        justifyContent:"end" }}>
        <Button 
          variant="contained"
          sx={Styles.BIG_BTN_STYLE}
          onClick={() => setIsNextViewTriggered(true)}
          >
            Siguiente ➡
        </Button>
      </Box>
    </Stack>
  )
}

export default Home