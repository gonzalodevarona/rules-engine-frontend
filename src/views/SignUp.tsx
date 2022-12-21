import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import * as Styles from '../constants/styles'

import CSS from '../stylesheets/GlobalApp.module.css'

function SignUp() {
  return (
    
        <Stack className={CSS.container} sx={{minWidth:337, alignContent:'center'}}>
            <Box className='font-LexendBold' sx={{  mt:10, mb:3, fontWeight:500, fontSize:20}} >Crear cuenta</Box>
            
            <Stack sx={{p:3,border: 1, gap:3}}>
                <TextField id="outlined-basic" label="Nombre" variant="outlined" />
                <TextField id="outlined-basic" label="Apellido" variant="outlined" />
                <TextField id="outlined-basic" label="Teléfono" variant="outlined" />
                <TextField id="outlined-basic" label="Email" variant="outlined" />
                <TextField id="outlined-basic" label="Contraseña" variant="outlined" />
            </Stack>
            <Button variant="contained" sx={[Styles.BIG_BTN_STYLE, {my:4}]}>Registrarme</Button>
            
        </Stack>
        

    
  )
}

export default SignUp