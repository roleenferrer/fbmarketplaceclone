import React from 'react';
import Listings from './Listings';
import UserListings from './UserListings';
import Typography from '@mui/material/Typography';
import NavBar from './NavBar';
import ToolBar from './ToolBar';
import CategorySelectionDrawer from './CategorySelectionDrawer';
import BreadCrumbs from './BreadCrumbs';
import ScrollableSubcategories from './ScrollableSubcategories';
import Login from './Login';
import CreateAccount from './CreateAccount';
import {BrowserRouter, Route, Switch} from 'react-router-dom';


/**
 * @return {object} JSX
 */
function App() {
  const [item, setUser] = React.useState(localStorage.getItem('user'));
  const [specifiedCategory, setSpecifiedCategory] =
    React.useState('Marketplace');
  const [crumbTrail, setBreadCrumbTrail] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [searched, setSearched] = React.useState(false);

  const handleCategoryClicked = (text) => {
    setSearchTerm('');
    setSpecifiedCategory(text);
    if (text === 'Marketplace') {
      setBreadCrumbTrail([]);
    } else if (crumbTrail.includes(text)) {
      setBreadCrumbTrail(crumbTrail.slice(0, crumbTrail.indexOf(text) + 1));
    } else {
      if (!crumbTrail.includes('Marketplace')) {
        setBreadCrumbTrail(['Marketplace', ...crumbTrail, text]);
      } else {
        setBreadCrumbTrail([...crumbTrail, text]);
      }
    }
  };

  const handleSearchQuery = (text) => {
    setSpecifiedCategory('Marketplace');
    setSearchTerm(text);
    setBreadCrumbTrail([]);
    if (text) {
      setSearched(true);
    } else {
      setSearched(false);
    }
  };

  return (
    <div>
      <BrowserRouter>
        <Switch>

          <Route path="/" exact>
            <ToolBar />
            <div style={{marginTop: 100}}>
              <NavBar handleSearchQuery={handleSearchQuery} />
            </div>
            <div style={{marginTop: 10}}>
              <BreadCrumbs handleBreadCrumbClicked={handleCategoryClicked}
                breadCrumbTrail={crumbTrail}/>
            </div>
            <div style={{marginTop: 10}}>
              {specifiedCategory === 'Marketplace' && !searched ?
                <CategorySelectionDrawer
                  handleCategoryClicked={handleCategoryClicked}/>: null}
            </div>
            <div style={{marginTop: 60}}>
              {specifiedCategory === 'Marketplace' || searchTerm ? null :
                <ScrollableSubcategories handleSubCategoryClicked=
                  {handleCategoryClicked}
                specifiedCategory={specifiedCategory}/>}
            </div>
            <div style={{display: item ? 'inline' : 'none'}}>
              <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                Your Listings
              </Typography>
              <UserListings setUser={setUser}/>
            </div>
            <div>
              <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                All Listings
              </Typography>
              <Listings searchTerm={searchTerm}
                specifiedCategory={specifiedCategory}/>
            </div>
          </Route>

          <Route path="/login">
            <Login />
          </Route>

          <Route path="/createaccount">
            <CreateAccount />
          </Route>

        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
