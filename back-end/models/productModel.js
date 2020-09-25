const connection = require('./connection');

const fetchAllProducts = async () => {
  const db = await connection();

  const fetch = await db.getTable('products').select(['id', 'name', 'price', 'url_image'])
    .execute();

  const recipes = fetch.fetchAll();

  return recipes.map(([id, name, price, urlImage]) => ({ id, name, price, urlImage }));
};

module.exports = {
  fetchAllProducts,
};
