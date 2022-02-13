const {Pool} = require('pg');
const bcrypt = require('bcrypt');
const saltRounds = 5;

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

exports.getUser = async (req, res) => {
  let email;
  if (req.query) {
    email = req.query.email;
  } else {
    email = req.email;
  }
  let select = `SELECT member FROM member WHERE`;
  select += ` member->'member'->>'email' ~* $1`;
  const query = {
    text: select,
    values: [email],
  };
  const {rows} = await pool.query(query);
  if (rows.length === 1) {
    if (res) {
      res.status(200).send(rows[0]);
    }
    return rows[0];
  } else {
    if (res) {
      res.status(404).send();
    }
    return null;
  }
};

exports.postUser = async (req, res) => {
  const fullName = req.body.fname + ' ' + req.body.lname;
  const user = await this.getUser({email: req.body.email});
  if (user) {
    res.status(400).send();
    return;
  }
  const insert = `INSERT INTO member(member) VALUES ($1)`;
  const query = {
    text: insert,
    values: [],
  };
  const cryptFunction = (err, hash) => {
    hash += '';
  };
  // cryptFunction used to fulfill callback function
  cryptFunction('err', 'hash');
  const cryptHash = bcrypt.hashSync(req.body.password, saltRounds,
    cryptFunction);
  query.values = [{member: {hash: cryptHash, name: fullName,
    email: req.body.email}}];
  await pool.query(query);
  res.status(201).send();
};

exports.getListings = async (req, res) => {
  const toSend = [];
  const select = `SELECT l.member, 
                  l.id AS "listingID",
                  l.listing->'listing' AS listing
                  FROM listing l
                  WHERE listing->'listing'->>'author' = $1`;
  const query = {
    text: select,
    values: [req.query.name],
  };
  const {rows} = await pool.query(query);
  for (const row of rows) {
    toSend.push(row);
  }
  res.status(200).json(toSend);
};
