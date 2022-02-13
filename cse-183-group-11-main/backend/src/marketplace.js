const {Pool} = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

// Returns a single row with the property: id
const getCategoryId = async (categoryName) => {
  const selectRootCategory = `SELECT c.id
                              FROM category c
                              WHERE c.category->'category'->>'name' = $1`;
  const rootQuery = {
    text: selectRootCategory,
    values: [`${categoryName}`],
  };
  const {rows} = await pool.query(rootQuery);
  return rows;
};

// Returns an array of category ids who's parent is parentCategoryId
const getSubcategoriesHelper = async (parentCategoryId) => {
  const toReturn = [];
  const selectChildren = `SELECT c.id
                          FROM category c
                          WHERE c.parentCategory = $1`;
  const query = {
    text: selectChildren,
    values: [`${parentCategoryId}`],
  };
  const {rows} = await pool.query(query);
  if (rows.length !== 0) {
    for (const row of rows) {
      toReturn.push(row.id);
    }
  };
  return toReturn;
};

// Returns the first level of subcategories of the category given in req
exports.getSubcategories = async (req, res) => {
  const toSend = [];

  const root = await getCategoryId(req.params.category);
  if (root.length === 0) {
    res.status(404).send();
    return;
  } else {
    const subIDs = await getSubcategoriesHelper(root[0].id);
    const select = `SELECT c.category->'category'->>'name' AS category
                    FROM category c
                    WHERE c.id = $1`;
    for (const subID of subIDs) {
      const query = {
        text: select,
        values: [`${subID}`],
      };
      const {rows} = await pool.query(query);
      toSend.push(rows[0].category);
    };
    res.status(200).json(toSend);
  };
};

exports.getListings = async (req, res) => {
  const toSend = [];

  if (Object.keys(req.query).length === 0) { // If no query params, send all
    const select = `SELECT l.member, 
                         l.id AS "listingID",
                         l.listing->'listing' AS listing
                    FROM listing l, category c
                    WHERE l.category = c.id
                    AND c.category->'category'->>'name' = $1`;

    const categories = `SELECT DISTINCT c.category->'category'->>'name' as name
                        FROM category c`;
    const query = {
      text: categories,
    };
    const {rows} = await pool.query(query);
    for (const row of rows) {
      const query = {
        text: select,
        values: [row.name],
      };
      const {rows} = await pool.query(query);
      for (const row of rows) {
        toSend.push(row);
      };
    }
    res.status(200).json(toSend);
  } else {
    const root = await getCategoryId(req.query.category);
    if (root.length === 0) {
      res.status(404).send();
    } else {
      const allSubcategories = [];
      allSubcategories.push(root[0].id);
      let subIDs = await getSubcategoriesHelper(root[0].id);
      let buffer;
      do {
        buffer = [];
        for (const subID of subIDs) {
          allSubcategories.push(subID);
          const children = await getSubcategoriesHelper(subID);
          for (const child of children) {
            buffer.push(child);
          }
        };
        subIDs = buffer;
      } while (buffer.length !== 0);

      const select = `SELECT l.member, 
                           l.id AS "listingID",
                           l.listing->'listing' AS listing
                      FROM listing l, category c
                      WHERE l.category = c.id
                      AND c.id = $1`;
      for (const subID of allSubcategories) {
        const query = {
          text: select,
          values: [`${subID}`],
        };
        const {rows} = await pool.query(query);
        for (const row of rows) {
          toSend.push(row);
        };
      };
      res.status(200).json(toSend);
    }
  }
};

exports.getSearchResults = async (req, res) => {
  // https://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript/3561711#3561711
  const escapeSpecialChars = (string) => {
    return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  };

  const toSend = [];
  const select = `SELECT l.member, 
                         l.id AS "listingID",
                         l.listing->'listing' AS listing
                  FROM listing l, category c
                  WHERE l.category = c.id
                  AND l.listing->'listing'->>'title' ~* $1`;

  const query = {
    text: select,
    values: [`.*${escapeSpecialChars(req.params.searchTerm)}.*`],
  };
  const {rows} = await pool.query(query);
  for (const row of rows) {
    toSend.push(row);
  };
  res.status(200).json(toSend);
};
