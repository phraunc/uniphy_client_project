
import React from 'react';
// import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import Logout from '@mui/icons-material/Logout';
import { Box } from '@mui/material';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';




function Nav() {
  const user = useSelector((store) => store.user);
  const history = useHistory();
  const dispatch = useDispatch();

  const [value, setValue] = useState(0);

  const linkToUser = () => {
    history.push("/user")
  }


  return (

    <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 10, color: "white"}}>

      <BottomNavigation value={value} onChange={(event, newValue) => { setValue(newValue) }} sx={{ backgroundColor: '#31356e'}}>

      {user.id &&
        <BottomNavigationAction sx={{color: "white"}} label="LogOut" value="logout" icon={<Logout />} className="navLink" onClick={() => dispatch({ type: 'LOGOUT' })}/>
        }

      {user.id &&
        <BottomNavigationAction sx={{color: "white"}} label="Home" value="nearby" icon={<HomeIcon />} className="navLink" onClick={linkToUser} />
      }

      </BottomNavigation>
    </Box>
  );
}

export default Nav;