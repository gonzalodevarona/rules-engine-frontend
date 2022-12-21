import { useState, useEffect, createContext } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import GetTablesNamesService from '../../services/GetTablesNamesService'
import TablePickerProps from '../interfacesHome/TablePickerProps';
import CSS from '../../stylesheets/GlobalApp.module.css';
import * as Styles from '../../constants/styles';

function TablePicker(tablePickerProps:TablePickerProps) {
  
  const [tables, setTables] = useState([]);
  const [renderedTables, setRenderedTables] = useState<any>([]);

  const [selectedTable, setSelectedTable] = useState('');




  const handleSetSelectedTable = () => (e: any) => {
    console.log(e)
    setSelectedTable(e.target.value);
    
  }

  const fetchTablesNames = async () => {
    const tablesArrAxios = (await GetTablesNamesService()).data
    
    const tablesArr = tablesArrAxios.map((table : any)=>  table.tableName)
    
    setTables(tablesArr)
    
  }

  useEffect(() => {
    fetchTablesNames()
  }, [])

  useEffect(() => {
    const renderedArr = tables.map(table => <MenuItem value={table}>{table}</MenuItem>)
    setRenderedTables(renderedArr);
    
  }, [tables])

  
  
  return (
    <Stack className={CSS.container} sx={{minWidth:337, alignContent:'center'}}>
    <Box sx={{  mt:15, mb:3, fontWeight:500, fontSize:20}} >Seleccionar tabla</Box>
    
    <FormControl style={Styles.SMALL_FIELD_W}>
              
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectedTable}
        
        onChange={handleSetSelectedTable}
      >
        {renderedTables}
      
      </Select>
    </FormControl> 
    
    
    </Stack>
  )
}

export default TablePicker