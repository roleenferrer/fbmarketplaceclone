import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {useHistory} from 'react-router-dom';


// import TextField from '@mui/material/TextField';
// import Hidden from '@mui/material/Hidden';

const drawerWidth = 240;

// Based off of:
//  https://mui.com/components/app-bar/ (Basic app bar)

/**
 * Simple component with no state.
 *
 * @return {object} JSX
 */
export default function ToolBar() {
  const user = JSON.parse(localStorage.getItem('user'));

  const history = useHistory();

  const logout = () => {
    localStorage.removeItem('user');
    history.push('/login');
  };

  return (
    <div>
      <Box sx={{
        'flexGrow': 1,
        'display': {xs: 'block', sm: 'none'},
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
        },
      }}>
        <AppBar
          position="fixed"
          sx={{
            width: {sm: `calc(100% - ${drawerWidth}px)`},
            ml: {sm: `${drawerWidth}px`},
          }}
        >
          <Toolbar>
            <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
            Mugtome Bazaar
            </Typography>
            <button
              id = 'logoutButton'
              style={{display: user ? 'inline' : 'none'}}
              onClick={logout}>Logout</button>

            <Button
              style={{display: user ? 'none' : 'inline'}}
              aria-label='login button mobile'
              href = '/login'
              color="inherit"
            >
            Login
            </Button>
          </Toolbar>
          <Typography variant="h6" component="div"
            sx={{ml: '15px', flexGrow: 1}}>
            {user ? `Hello, ${user.name}` : ''}
          </Typography>
        </AppBar>
      </Box>
    </div>
  );
}
