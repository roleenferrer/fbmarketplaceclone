import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import {Typography} from '@mui/material';

/**
 * @param {object} props
 * @return {object} JSX
 */
function TemporaryDrawer(props) {
  const [state, setState] = React.useState({
    'bottom': false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    setState({state, [anchor]: open});
  };

  const list = (anchor) => (
    <Box
      sx={{width: 'auto', height: 1000}}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Typography>
        {'Select Category'}
        <Button onClick={toggleDrawer('bottom', false)}>{'X'}</Button>
      </Typography>
      <Divider />
      <List>
        {['Vehicles', 'Apparel'].map((text) => (
          <ListItem id = {text} aria-label={text} button onClick={() => {
            props.handleCategoryClicked(text);
          }} key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      {['bottom'].map((anchor) => (
        <React.Fragment key={anchor}>
          <label
            aria-label='all categories text'>
            <Button aria-label='all categories button'
              onClick={toggleDrawer(anchor, true)}>
              {'All Categories'}
            </Button>
          </label>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}

export default TemporaryDrawer;

