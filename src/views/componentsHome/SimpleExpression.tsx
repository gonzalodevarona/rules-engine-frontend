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
import Divider from '@mui/material/Divider';

import * as Colors from '../../constants/colors';
import IColumn from '../interfacesHome/IColumn';
import IArrayColumn from '../interfacesHome/IArrayColumn';



function SimpleExpression( propColumns : IArrayColumn ) {

  const comparatorsList = ['=', 'diferente']
  const comparatorsListNumber = ['=', '<', '>']



  const columns : IColumn[] = propColumns.columns;

  const [operations, setOperations] = useState<string[]>([]);



  const [selectedColumn, setSelectedColumn] = useState<IColumn>(columns[0]);

  const [selectedOperator, setSelectedOperator] = useState('');

  const [selectedNextLine, setSelectedNextLine] = useState('column');

  const [nextLineValue, setNextLineValue] = useState('');

  const formControlStyle = {minWidth: 150};

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

     const x = columns
        .filter(col => col.type === typeFilter)
        .map((col : IColumn) => (
          // @ts-ignore
          <MenuItem value={col}>{col.name}</MenuItem>
        ));

        return x;
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
     return <TextField onChange={handleNextLineChange} id="outlined-basic" variant="outlined" />
    } else{
     return <FormControl style={formControlStyle}>
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
            
            <FormControl style={formControlStyle}>
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

            <FormControl style={formControlStyle}>
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

            <FormControl>
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

        </Box>
        <Divider color={Colors.ICESI_COLOR} sx={{height:2, borderRadius:2, my:3}}/>
    </Stack>
  )
}

export default SimpleExpression