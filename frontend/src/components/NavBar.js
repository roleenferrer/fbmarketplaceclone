import React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';


const drawerWidth = 240;


// Based off of:
//  https://mui.com/components/text-fields/ (Scroll to Customization)

/**
 * Simple component with no state.
 *
 * @param {object} props
 * @return {object} JSX
 */
export default function NavBar(props) {
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleSearchQuery(searchTerm);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <Box sx={{
        'flexGrow': 1000,
        'display': {xs: 'block', sm: 'none'},
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
        },
      }}>
        <Paper
          component="form"
          sx={{
            width: {sm: `calc(100% - ${drawerWidth}px)`},
            ml: {sm: `${drawerWidth}px`},
          }}
          onSubmit={handleSubmit}
        >
          <InputBase
            sx={{mr: '140px', ml: 1}}
            placeholder="Search Marketplace"
            id="searchBox"
            onChange={handleInputChange}
            inputProps={{'aria-label': 'search marketplace mobile'}}
          />
          <IconButton type="submit"
            id="submitSearchButton">
            <SearchIcon />
          </IconButton>
        </Paper>
      </Box>
    </div>
  );
}
