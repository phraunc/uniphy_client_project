// import React from "react";
// import { Link } from "react-router-dom";
// import LogOutButton from "../LogOutButton/LogOutButton";
// import "./Nav.css";
// import { useSelector } from "react-redux";

// function Nav() {
//   const user = useSelector((store) => store.user);

//   return (
//     <div className="nav">
//       <Link to="/home">
//         <h2 className="nav-title">Uniphy</h2>
//       </Link>
//       <div>
//         {/* If no user is logged in, show these links */}
//         {!user.id && (
//           // If there's no user, show login/registration links
//           <Link className="navLink" to="/login">
//             Login / Register
//           </Link>
//         )}

//         {/* If a user is logged in, show these links */}
//         {user.id && (
//           <>
//             <Link className="navLink" to="/user">
//               Home
//             </Link>

//             <Link className="navLink" to="/info">
//               Info Page
//             </Link>

//             <Link className="navLink" to="/food">
//               Food
//             </Link>

//             <Link className="navLink" to="/occupation">
//               Occupation
//             </Link>
//             <Link className="navLink" to="/work">
//               Work
//             </Link>

//             <Link className="navLink" to="/social">
//               Social Activity
//             </Link>

//             <Link className="navLink" to="/sleep">
//               Sleep
//             </Link>
          
//             <Link className="navLink" to="/movement">
//               Movement
//             </Link>

//             <LogOutButton className="navLink" />
//           </>
//         )}

//         <Link className="navLink" to="/about">
//           About
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default Nav;

import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import FolderIcon from '@mui/icons-material/Folder';
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
        <BottomNavigationAction label="LogOut" value="logout" icon={<Logout />} className="navLink" onClick={() => dispatch({ type: 'LOGOUT' })}/>
        }

      {user.id &&
        <BottomNavigationAction label="Home" value="nearby" icon={<HomeIcon />} className="navLink" onClick={linkToUser} />
      }

      </BottomNavigation>
    </Box>
  );
}

export default Nav;