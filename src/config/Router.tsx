import {Routes, Route } from 'react-router-dom'
import Home from '../views/Home'
import Login from '../views/Login'
import SignUp from '../views/SignUp'

function Router() {
  return (
    
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<SignUp/>}/>
    </Routes>
    
  )


}

export default Router