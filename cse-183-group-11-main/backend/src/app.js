const express = require('express');
const cors = require('cors');
const yaml = require('js-yaml');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const path = require('path');
const OpenApiValidator = require('express-openapi-validator');

const dummy = require('./dummy');
const marketplace = require('./marketplace');
const auth = require('./auth');
const user = require('./users');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const apiSpec = path.join(__dirname, '../api/openapi.yaml');

const apidoc = yaml.load(fs.readFileSync(apiSpec, 'utf8'));
app.use('/v0/api-docs', swaggerUi.serve, swaggerUi.setup(apidoc));

app.use(
  OpenApiValidator.middleware({
    apiSpec: apiSpec,
    validateRequests: true,
    validateResponses: true,
  }),
);

app.get('/v0/dummy', dummy.get);

// Get every listing or by category specified in query param
app.get('/v0/marketplace', marketplace.getListings);
// Get all subcategory names in category
app.get('/v0/marketplace/:category', marketplace.getSubcategories);
// Get listings based on search term, queried by title of the listing
app.get('/v0/marketplace/search/:searchTerm', marketplace.getSearchResults);

// Post authenticate to login
app.post('/authenticate', auth.authenticate);
// Get user account
app.get('/v0/user', user.getUser);
// Post user account
app.post('/v0/user', user.postUser);
// Get User's Listings
app.get('/v0/user/listings', auth.check, user.getListings);

app.use((err, req, res, next) => {
  res.status(err.status).json({
    message: err.message,
    errors: err.errors,
    status: err.status,
  });
});

module.exports = app;
