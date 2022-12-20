import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Divider from '@mui/material/Divider';

import * as Colors from '../../constants/colors';
import * as Styles from '../../constants/styles';
import IColumn from '../interfacesExpressions/IColumn';
import SimpleExpressionProps from '../interfacesExpressions/SimpleExpressionProps';




function SimpleExpression(  propColumns : SimpleExpressionProps ) {

  const comparatorsList = ['=', 'diferente']
  const comparatorsListNumber = ['=', '<', '>']

  const id = propColumns.id;

  const columns : IColumn[] = propColumns.columns;

  const [operations, setOperations] = useState<string[]>([]);

  const [isNextLineDisabled, setIsNextLineDisabled] = useState(true);



  const [selectedColumn, setSelectedColumn] = useState<IColumn>(columns[0]);

  const [selectedOperator, setSelectedOperator] = useState('');

  const [selectedNextLine, setSelectedNextLine] = useState('column');

  const [nextLineValue, setNextLineValue] = useState('');



  useEffect(() => {
    if(selectedOperator != ''){
      setIsNextLineDisabled(false);
    } else{
      setIsNextLineDisabled(true);
    }
  
  }, [selectedOperator])

  useEffect(() => {
    
    const expressionInfo = {
      column: selectedColumn,
      operator: selectedOperator,
      nextType: selectedNextLine,
      nextValue: nextLineValue
    
    }

    propColumns.handleExpressionsInfoChange(id, expressionInfo);
    

    
  }, [selectedColumn, selectedOperator, selectedNextLine, nextLineValue])
  
  const resetState = () => {
    setSelectedColumn(columns[0]);
    setSelectedOperator('');
    setSelectedNextLine('column');
    setNextLineValue('');
  }


  const changeOperationsList = () => {
    switch (selectedColumn.type) {
      case 'String':
        setOperations(comparatorsList)
        break;
      case 'Number':
        setOperations(comparatorsListNumber)
        break;
      case 'Boolean':
        setOperations(comparatorsList)
        break;
    }

  }

  useEffect(() => {
    changeOperationsList();
  }, [selectedColumn])



  const handleNextLineChange = (e: any) => {
    setNextLineValue(e.target.value);
  };

  const handleColumnChange = (e: any) => {
    setSelectedColumn(e.target.value);
    setSelectedOperator(operations[0])
  };

  const handleOperationChange = (e: any) => {
    setSelectedOperator(e.target.value);
  };

  const handleRadioButtonChange = (e : any) => {
    setSelectedNextLine(e.target.value);
  };

  const fillColumnDropdownMenu = () => {

    return columns.map((col : IColumn) => (
      // @ts-ignore
      <MenuItem value={col}>{col.name}</MenuItem>
    ));
  };

  const fillDropdownMenuFiltered = (typeFilter : string) => {

     const columnsFiltered = columns
        .filter(col => col.type === typeFilter)
        .map((col : IColumn) => (
          // @ts-ignore
          <MenuItem value={col}>{col.name}</MenuItem>
        ));

        return columnsFiltered;
  };

  const fillOperationDropdownMenu = () => {

    return operations.map((op : string) => (
      // @ts-ignore
      <MenuItem value={op}>{op}</MenuItem>
    ));
  };

  const fillBooleanDropdownMenu = () => {
    return [<MenuItem value='Verdadero'>Verdadero</MenuItem>, <MenuItem value='Falso'>Falso</MenuItem>]
  };


  const renderNextLine = () => {

    if(selectedNextLine === 'value'){
     return <TextField disabled={isNextLineDisabled} onChange={handleNextLineChange} id="outlined-basic" variant="outlined" />
    } else{
     return <FormControl disabled={isNextLineDisabled} style={Styles.SMALL_FIELD_W}>
               <Select
                 labelId="demo-simple-select-label"
                 id="demo-simple-select"
                 value={nextLineValue}
                 onChange={handleNextLineChange}
               >
                 { 
                  
                 
                 selectedNextLine === 'column'
                   ? fillDropdownMenuFiltered(selectedColumn.type) 
                   : fillBooleanDropdownMenu()
                 }
               
               </Select>
             </FormControl>
    }
   };



  return (
    //@ts-ignore
    <Stack>
        
        <Box  sx={{ display:'flex', width:'100%' }}>
        
          <Box 
            sx={{
              display:'flex',
              width:'100%',
              alignItems:"center",
              justifyContent:"space-evenly" 
            }}
          >
            
            <FormControl style={Styles.SMALL_FIELD_W}>
              <InputLabel id="demo-simple-select-label">Columna</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedColumn}
                label="Columna"
                onChange={handleColumnChange}
              >
                { fillColumnDropdownMenu() }
              
              </Select>
            </FormControl> 

            <FormControl style={Styles.SMALL_FIELD_W}>
              <InputLabel id="demo-simple-select-label">Operación</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedOperator}
                label="Operación"
                onChange={handleOperationChange}
              >
                { fillOperationDropdownMenu() }
              </Select>
            </FormControl>

            <FormControl disabled={isNextLineDisabled}>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={selectedNextLine}
                onChange={handleRadioButtonChange}
              >
                <FormControlLabel value="column" control={<Radio />} label="Columna" />
                
                {selectedColumn.type === 'Boolean' 
                ? <FormControlLabel value="boolean" control={<Radio />} label="V/F" />
                : <FormControlLabel value="value" control={<Radio />} label="Valor" />
                }
                
              </RadioGroup>
            </FormControl>

            {renderNextLine()}

          </Box>

          <IconButton sx={{width:35, height:35}} onClick={ resetState }>
            <CleaningServicesIcon sx={{color: Colors.ICESI_COLOR}}/>
          </IconButton>

          { id != 0 &&
            <IconButton sx={{width:35, height:35}} onClick={() => propColumns.selfDeleteFunction(id) } >
              <DeleteForeverIcon sx={{color: Colors.ICESI_COLOR}}/>
            </IconButton>
          }

        </Box>
        <Divider color={Colors.ICESI_COLOR} sx={{height:2, borderRadius:2, my:3}}/>

        
    </Stack>
  )
}

export default SimpleExpression