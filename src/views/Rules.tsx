import {useState, useEffect} from "react";
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import * as Colors from '../constants/colors';
import { useExpressions } from './Home';
import { mapOperator } from '../utils/mapOperator';



function Rules() {

  

  const expressions = useExpressions();
  const [rules, setRules] = useState([{index: 0, rule:'', decoded:''}]);
  const [currentRule, setCurrentRule] = useState(rules[0]);

  

  const defineRegex = () => {
    
    let count = ""
    
    
    const numberOfKeys = Object.keys(expressions).length

    for(let i = 0; i<numberOfKeys; i++){
      count = count+(i+1).toString()
    }
    
    return new RegExp("^["+count+'()YOyo]+$')
  }

  const PARENTHESIS_NUMBERS_REGEX = defineRegex();








  const addNewRule = () => {
    const lastRule = getLastRule()

    setRules(oldArray => [...oldArray, {index: (lastRule.index+1), rule:'', decoded:''}]);
  }

  const getLastRule = () => {
    return rules[rules.length-1]
  }

  const mapExpressions = () =>{
    let expKeys = Object.keys(expressions);
    let decodedExp: string[] = [];

    expKeys.forEach((key : any) => {
      const item : any = expressions[key]
      const index = parseInt(key)+1
      const column = item.column.name
      const operator = item.operator
      let nextValue = item.nextValue

      if(item.nextType = 'column') {nextValue = item.nextValue.name}
      

      decodedExp.push(`${index}: ${column} ${mapOperator(operator)} ${nextValue}`);
      
    })

    return decodedExp.map( (line) => <Box>{line}</Box>);
  }

  const handleCurrentRuleChange = (newValue : string) => {
    
    const foundExp = rules.filter(item => item.index === currentRule.index)
    foundExp[0].rule = newValue;
    setCurrentRule({...currentRule,  rule: newValue});
  }

  
  useEffect(() => {


    const foundExp = rules.filter(item => item.index === currentRule.index)
    
    handleCurrentRuleChange(foundExp[0].rule);

    
  }, [currentRule.index])







  
  const my3= {my:'3%'}
  const grayBg= {bgcolor:'#f0f0f0', borderRight: 1}
  const btnStyle = {width:280, height:45, borderRadius:3}


  const renderTabs = () =>{
  
    return rules.map((element) => (
      <Tab sx={grayBg} value={element.index} label={`Regla ${element.index+1}`} />
    ));

  }

  const buttonInTabs = () =>{
    // @ts-ignore
    return <Button sx={grayBg} onClick={addNewRule} value="add" aria-label="+"><AddCircleIcon/></Button>
  }

  


  return (
    <Stack sx={{mx:'20%'}}>
      <Box sx={my3} >Creación de Reglas</Box>
      <Box sx={my3}>Expresiones simples:</Box>
      <Stack sx={{gap:1}}>
        {mapExpressions()}
      </Stack>
      <Stack sx={my3}>
        <Box >Escribe tu regla de la siguiente manera</Box>
        <Box>Ej: (1O2)Y3</Box>
      </Stack>
      
      <Tabs
          value={currentRule.index}
          variant='scrollable'
          scrollButtons='auto'
          onChange={(event, newValue) => {
            
            setCurrentRule({...currentRule,  index: newValue});
            
          }}
        >
          
          {renderTabs()}
          
          {buttonInTabs()}
          
          
      </Tabs>


      <TextField
          id="filled-multiline-static"
          placeholder="tu regla aqui"
          value={currentRule.rule}
          multiline
          rows={2}
          variant="filled"
          onChange={(event) => {
            const value = event.target.value;
            if (value !== "" && !PARENTHESIS_NUMBERS_REGEX.test(value)) {
              return;
            }
            
            handleCurrentRuleChange(value);
          }}
        />

      <Box sx={my3}>Tu regla:</Box>
      <Box sx={my3}>{currentRule.decoded}</Box>
      
      <Box sx={[my3,{display:"flex", justifyContent:"space-evenly", alignItems:'center' }]}>
        
        <Button sx={[btnStyle, {bgcolor: Colors.ICESI_COLOR}]} variant="contained" >
          Consultar Regla 🔎
        </Button>

        <Button sx={[btnStyle, {bgcolor: Colors.PERFICIENT_COLOR}]} variant="contained" >
          Empezar de nuevo ⤴️
        </Button>
      </Box>
    </Stack>
  )
}

export default Rules