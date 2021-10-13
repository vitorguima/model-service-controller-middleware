const connection = require('./connection');

const add = async (name, brand) => {
  try {
    const [
      result,
    ] = await connection.query(
      `INSERT INTO products (name, brand) VALUES (?, ?);`,
      [name, brand]
    );

    return { id: result.insertId, name, brand };
  } catch (err) {
    return err;
  }
};

const getAll = async () => {
  try {
    const [rows] = await connection.query('SELECT * FROM products');
    return rows;
  } catch (err) {
    return err;
  }
};

const getById = async (id) => {
  try {
    const [result] = await connection.query('SELECT * FROM products WHERE id = ?', [id]);
    if (!result.length) return null
    return result[0];
  } catch (err) {
    return err;
  }
};

const update = async (id, name, brand) => {
  try {
    const product = await getById(id);
    if (!product) return null;
    await connection.query('UPDATE products SET name = ?, brand = ? WHERE id = ?', [name, brand, id])
    return { id, name, brand };
  } catch (err) {
    return err;
  }
};

const exclude = async (id) => {
  try {
    const product = await getById(id);
    if (!product) return null;
    await connection.query('DELETE FROM products WHERE id = ?', [id])
    return product;
  } catch (err) {
    return err;
  }
};

module.exports = { add, getAll, getById, update, exclude };