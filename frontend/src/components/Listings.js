import React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';

const drawerWidth = 220;

/**
 * @param {string} category
 * @param {function} setCategory
 * @param {function} searchTerm
 */
function getMarketplaceListings(category, setCategory, searchTerm) {
  if (searchTerm) {
    fetch(`/v0/marketplace/search/${encodeURIComponent(searchTerm)}`)
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
  } else {
    if (category === 'Marketplace') {
      fetch('/v0/marketplace')
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
    } else {
      fetch(`/v0/marketplace?category=${encodeURIComponent(category)}`)
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
    };
  };
}


/**
 * Based off of:
 * https://mui.com/components/image-list/ (Title bar below image (standard))
 * @param {object} props
 * @return {object} JSX
 */
function Listings(props) {
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
  ]);
  React.useEffect(() => { // componentDidMount
    getMarketplaceListings('Marketplace', setCategory, '');
  }, []);

  React.useEffect(() => { // componentDidUpdate
    getMarketplaceListings(props.specifiedCategory, setCategory,
      props.searchTerm);
  }, [props.specifiedCategory, props.searchTerm]);

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
      <div style={{display: itemViewer, position: 'sticky'}}>
        <Paper>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6">
                {itemTitle}
              </Typography>
              <Button
                aria-label="close item viewer"
                color="inherit"
                onClick={() => closeItemViewer()}
              >
                X
              </Button>
            </Toolbar>
          </AppBar>
          <center>
            <img
              src={`${itemImage}?w=248&fit=crop&auto=format`}
              srcSet={`${itemImage}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={`${itemImage}`}
              loading="lazy"
              height="350"
              width="350"
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
          </center>
        </Paper>
      </div>
      <div>
        <ImageList
          sx={{
            width: {sm: `calc(100% - ${drawerWidth}px)`},
            ml: {sm: `${drawerWidth}px`},
          }}>
          {currListings.map((item) => (
            <div key={item.listingID} button="true"
              onClick={() => setItem(item.listing)}>
              <label
                aria-label={item.listing.title}>
                <ImageListItem>
                  <img
                    src=
                      {`${item.listing.content
                        .img}?w=200&h=165&fit=crop&auto=format`}
                    srcSet=
                      {`${item.listing.content
                        .img}?w=200&h=165&fit=crop&auto=format&dpr=2 2x`}
                    alt={item.listing.title}
                    loading="lazy"
                  />
                  <center>
                    <ImageListItemBar
                      title={<Typography sx={{fontWeight: 'bold'}}>
                        {item.listing.price}</Typography>}
                      subtitle={<span>{item.listing.title}</span>}
                      position="below"
                    />
                  </center>
                </ImageListItem>
              </label>
            </div>
          ))}
        </ImageList>
      </div>
    </div>
  );
}

export default Listings;

