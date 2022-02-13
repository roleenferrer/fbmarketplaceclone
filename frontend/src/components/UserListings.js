import React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';

// Based on AuthenticatedBookExample from class

const drawerWidth = 240;

/**
 * @param {object} user
 * @param {function} setUser
 * @param {function} setCategory
 * @param {function} appSetUser
 */
function getUserListings(user, setUser, setCategory, appSetUser) {
  appSetUser(localStorage.getItem('user'));
  if (!user) {
    return;
  }
  const bearerToken = user.accessToken;
  fetch(`/v0/user/listings?name=${user.name}`, {
    method: 'get',
    headers: new Headers({
      'Authorization': `Bearer ${bearerToken}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw response;
      }
      return response.json();
    }).then((data) => {
      setCategory(data);
    }).catch((err) => {
      alert('Server error');
    });
}


/**
 * Based off of:
 * https://mui.com/components/image-list/ (Title bar below image (standard))
 * @param {object} props
 * @return {object} JSX
 */
function UserListings(props) {
  const [user, setUser] =
    React.useState(JSON.parse(localStorage.getItem('user')));
  const [currListings, setCategory] = React.useState([
    {
      'member': '',
      'listingID': '',
      'listing': {
        'date': '',
        'author': '',
        'title': '',
        'price': '',
        'content': {
          'img': '',
          'description': '',
        },
      },
    },
  ],
  );

  React.useEffect(() => { // componentDidMount
    getUserListings(null, setUser, setCategory, props.setUser);
  }, [props.setUser]);

  React.useEffect(() => { // componentDidUpdate
    getUserListings(user, setUser, setCategory, props.setUser);
  }, [user, props.setUser]);

  const [itemViewer, setItemViewerOpen] = React.useState('none');
  const [itemTitle, setItemTitle] = React.useState('none');
  const [itemImage, setItemImage] = React.useState('none');
  const [itemAuthor, setItemAuthor] = React.useState('none');
  const [itemPrice, setItemPrice] = React.useState('none');
  const [itemDescription, setItemDescription] = React.useState('none');
  const [itemDate, setItemDate] = React.useState('none');

  const handleItemViewerToggle = () => {
    setItemViewerOpen(true);
  };

  const closeItemViewer = () => {
    setItemViewerOpen('none');
  };

  const setItem = (clickedItem) => {
    handleItemViewerToggle();
    setItemTitle(clickedItem.title);
    setItemImage(clickedItem.content.img);
    setItemAuthor(clickedItem.author);
    setItemPrice(clickedItem.price);
    setItemDescription(clickedItem.content.description);
    setItemDate(clickedItem.date);
  };

  return (
    <div>
      <Paper style={{display: itemViewer}}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">
              {itemTitle}
            </Typography>
            <Button
              aria-label="close item viewer user"
              color="inherit"
              onClick={() => closeItemViewer()}
            >
                X
            </Button>
          </Toolbar>
        </AppBar>
        <img
          src={`${itemImage}?w=248&fit=crop&auto=format`}
          srcSet={`${itemImage}?w=248&fit=crop&auto=format&dpr=2 2x`}
          alt={`${itemImage}`}
          loading="lazy"
        />
        <div>
          {'Author: ' + itemAuthor}
        </div>
        <div>
          {'Price: ' + itemPrice}
        </div>
        <div>
          {'Description: ' + itemDescription}
        </div>
        <div>
          {'Date Created: ' + itemDate}
        </div>
      </Paper>
      <ImageList
        sx={{
          width: {sm: `calc(100% - ${drawerWidth}px)`},
          ml: {sm: `${drawerWidth}px`},
        }}>
        {currListings.map((item) => (
          <div button="true"
            id={item.listingID + 'user'}
            onClick={() => setItem(item.listing)}>
            <ImageListItem>
              <img
                id={item.listingID + 'useritem'}
                src=
                  {`${item.listing.content
                    .img}?w=200&h=165&fit=crop&auto=format`}
                srcSet=
                  {`${item.listing.content
                    .img}?w=200&h=165&fit=crop&auto=format&dpr=2 2x`}
                alt={item.listing.title}
                loading="lazy"
              />
              <ImageListItemBar
                id={item.listingID + 'userimage'}
                title={<Typography sx={{fontWeight: 'bold'}}>
                  {item.listing.price}</Typography>}
                subtitle={<span>{item.listing.title}</span>}
                position="below"
              />
            </ImageListItem>
          </div>
        ))}
      </ImageList>
    </div>
  );
}

export default UserListings;
