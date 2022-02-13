const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const secrets = require('./data/secrets.json');
const dbUser = require('./users');

// Based on AuthenticatedBookExample from class

// searching database for user with email (email)
// if user is found, checks that passwords match
exports.authenticate = async (req, res) => {
  const {email, password} = req.body;
  const user = await dbUser.getUser({email, password});
  if (user && bcrypt.compareSync(password,
    user.member.member.hash)) {
    const accessToken = jwt.sign(
      {email: user.email, role: user.role},
      secrets.accessToken, {
        expiresIn: '30m',
        algorithm: 'HS256',
      });
      // using email to identify who can post / comment
    res.status(200).json({name: user.member.member.name,
      email: user.member.member.email,
      accessToken: accessToken});
    // need to refresh page after login
  } else {
    res.status(401).send('Username or password incorrect');
  }
};

exports.check = (req, res, next) => {
  const authHeader = req.headers.authorization;
  // if (authHeader) {
  const token = authHeader.split(' ')[1];
  // might need to put secrets token into DB
  jwt.verify(token, secrets.accessToken, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
};

