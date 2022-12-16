import {useNavigate} from 'react-router-dom'
import Box from '@mui/material/Box';
import * as Colors from '../constants/colors';

function Header() {

  const navigate = useNavigate();

  const navigateHome = () => {
    navigate('/');
  };
  return (
    <Box 
        display="flex" 
        bgcolor={Colors.PERFICIENT_COLOR}
        alignItems="center"
        justifyContent="center" 
        padding="2px"  
    >
        <Box
            component="img"
            alt="logo"
            onClick={navigateHome}
            src={require("../assets/logo.png")}
      />

    </Box>
  )
}

export default Header