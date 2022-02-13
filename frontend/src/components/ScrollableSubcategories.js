import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

/**
 *
 * @param {object} props
 * @return {object} JSX
 */
function ScrollableSubcategories(props) {
  const [state, setState] = React.useState([]);
  const generateSubcategories = (category) => {
    const newListings = [];
    fetch(`/v0/marketplace/${encodeURIComponent(category)}`)
      .then((response) => {
        return response.json();
      }).then((data) => {
        for (const dt of data) {
          newListings.push(<Tab key={`${data.indexOf(dt)}`} label={`${dt}`}
            sx={{textTransform: 'none'}} />);
        };
        setState(newListings);
      });
  };

  const handleChange = (event) => {
    props.handleSubCategoryClicked(event.target.innerText);
  };

  React.useEffect(() => { // componentDidUpdate
    generateSubcategories(props.specifiedCategory);
  }, [props.specifiedCategory]);

  return (
    <Box sx={{maxWidth: 480, bgcolor: 'background.paper'}}>
      <Tabs
        value={false}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons={false}
        aria-label="subcategories"
      >
        {state}
      </Tabs>
    </Box>
  );
}

export default ScrollableSubcategories;
