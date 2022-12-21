import {useState, useEffect} from "react";
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import * as Styles from '../constants/styles';
import * as Colors from '../constants/colors';
import { useExpressions } from './Home';
import { mapOperator } from '../utils/mapOperator';



function Rules() {

  

  const expressions = useExpressions();
  const [rules, setRules] = useState([{index: 0, rule:'', decoded:''}]);
  const [currentRule, setCurrentRule] = useState(rules[0]);
  let decodedRules: string[] = [];


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

      if(typeof nextValue === 'object' && nextValue !== null) {
        nextValue = item.nextValue.name
      } 
      

      decodedExp.push(`${index}: ${column} ${mapOperator(operator)} ${nextValue}`);
      
    })
    decodedRules = decodedExp;
    return decodedExp.map( (line) => <Box>{line}</Box>);
  }

  const filterRulesByIndex = (ind: number) => {
    return rules.filter(item => item.index === ind)
  }

  const handleCurrentRuleChange = (newValue : string) => {
    
    const foundExp = filterRulesByIndex(currentRule.index)
    foundExp[0].rule = newValue;
    setCurrentRule({...currentRule,  rule: newValue});
  }

  
  useEffect(() => {
    const foundExp = filterRulesByIndex(currentRule.index)
    
    handleCurrentRuleChange(foundExp[0].rule);
  }, [currentRule.index])


  useEffect(() => {

    let ruleDecoded = currentRule.rule
    
    const decodedRulesSplit = decodedRules.map(rule => rule.split(': '))
    console.log(decodedRulesSplit)

    let decoded = '';
    
    for (let i = 0; i < ruleDecoded.length; i++) {

      const regex = new RegExp("^[1234]+$");
      if (regex.test(ruleDecoded[i])){
        
        const filteredElement = decodedRulesSplit.filter(element => element[0] ===ruleDecoded[i])
        
        decoded += filteredElement[0][1]

      } else {
        decoded += ruleDecoded[i]
      }
      decoded += ' '
      
    }
    setCurrentRule({...currentRule,  decoded: decoded});

    const foundExp = filterRulesByIndex(currentRule.index)
    foundExp[0].decoded = decoded;
    
  }, [currentRule.rule])








  
  const my3= {my:'3%'}
  const grayBg= {bgcolor:'#f0f0f0', borderRight: 1}



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
        
        <Button sx={Styles.BIG_BTN_STYLE} variant="contained" >
          Consultar Regla 🔎
        </Button>

        <Button onClick={() => window.location.reload()} sx={[Styles.BIG_BTN_STYLE, {bgcolor: Colors.PERFICIENT_COLOR}]} variant="contained" >
          Empezar de nuevo ⤴️
        </Button>
      </Box>
    </Stack>
  )
}

export default Rules