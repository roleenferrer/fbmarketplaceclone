import React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import {Typography} from '@mui/material';

const drawerWidth = 240;

/**
 * https://mui.com/components/breadcrumbs/
 * @param {object} props
 * @return {object} JSX
 */
function BreadCrumbs(props) {
  // const [textClicked, updateTextClicked] = React.useState('');
  const generateBreadCrumbs = (arr) => {
    const toReturn = [];
    for (const breadCrumb of arr) {
      toReturn.push(
        <Link key={breadCrumb}
          underline="hover" color="inherit" href="#"
          onClick={handleBcClicked}>
          {<Typography id={`${breadCrumb}Bc`}>{breadCrumb}</Typography>}
        </Link>,
      );
    };
    return toReturn;
  };

  const handleBcClicked = (event) => {
    props.handleBreadCrumbClicked(event.target.textContent);
  };

  if (props.breadCrumbTrail.length === 0) {
    return null;
  } else {
    const bc = generateBreadCrumbs(props.breadCrumbTrail);
    return (
      <div>
        <Box sx={{
          'flexGrow': 1,
          'display': {xs: 'block', sm: 'none'},
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
          },
        }}>
          <div role="presentation">
            <Breadcrumbs separator="›" aria-label="breadcrumb"
              position="absolute">
              {bc}
            </Breadcrumbs>
          </div>
        </Box>

        {/* DESKTOP BREADCRUMBS */}
        <Box variant="permanent"
          sx={{
            'display': {xs: 'none', sm: 'block'},
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
            },
            'ml': {sm: `${drawerWidth}px`},
          }}
        >
          <div role="presentation">
            <Breadcrumbs separator="›" aria-label="breadcrumb">
              {bc}
            </Breadcrumbs>
          </div>
        </Box>
      </div>
    );
  };
}

export default BreadCrumbs;
