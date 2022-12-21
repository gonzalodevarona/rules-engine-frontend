import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import * as Styles from '../constants/styles'

import CSS from '../stylesheets/GlobalApp.module.css'

function Login() {
  return (
    
        <Stack className={CSS.container} sx={{minWidth:337, alignContent:'center'}}>
            <Box className='font-LexendBold' sx={{  mt:15, mb:3, fontWeight:500, fontSize:20}} >Iniciar Sesión</Box>
            
            <Stack sx={{p:3,border: 1, gap:3}}>
                <TextField id="outlined-basic" label="Email/Teléfono" variant="outlined" />
                <TextField type="password" autoComplete="current-password"id="outlined-basic" label="Contraseña" variant="outlined" />
            </Stack>
            <Button variant="contained" sx={[Styles.BIG_BTN_STYLE, {my:4}]}>Login</Button>
            
        </Stack>
        

    
  )
}

export default Login