const db = require("../config/db.config");
async function getAllProductsMySQL() {
  try {
    const [products] = await db.execute("select * from products");
    return products;
  } catch (error) {
    console.log(error);
  }
}

async function getProductByIdMySQL(id) {
  try {
    const [products] = await db.execute(
      "select * from products where productId = ?",
      [id]
    );
    return products[0];
  } catch (error) {
    console.log(error);
  }
}
async function getProductByCategoryIdMySQL(id) {
  try {
    const [products] = await db.execute(
      "select * from products where categoryId = ?",
      [id]
    );
    return products;
  } catch (error) {
    console.log(error);
  }
}

async function addProductMySQL(
  nameProduct,
  image,
  price,
  description,
  stock,
  categoryId
) {
  try {
    const [result] = await db.execute(
      "insert into products (nameProduct,image,price,description,stock,categoryId) values (?,?,?,?,?,?)",
      [nameProduct, image, price, description, stock, categoryId]
    );
    return result.insertId;
  } catch (error) {
    console.log(error);
  }
}
async function updateProductMySQL(
  nameProduct,
  image,
  price,
  description,
  stock,
  categoryId,
  productId
) {
  console.log(
    nameProduct,
    image,
    price,
    description,
    stock,
    categoryId,
    productId
  );
  try {
    const [result] = await db.execute(
      "update products set nameProduct = ?, image = ?, price = ?, description = ?, stock = ?, categoryId = ? where productId = ?",
      [nameProduct, image, price, description, stock, categoryId, productId]
    );
    console.log(result);
    return result.insertId;
  } catch (error) {
    console.log(error);
  }
}
async function updateOutStockProductMySQL(productId) {
  try {
    const [result] = await db.execute(
      "update products set stock = ? where productId = ?",
      [0, productId]
    );
    return result.insertId;
  } catch (error) {
    console.log(error);
  }
}
async function getProductsByName(name) {
  try {
    const [result] = await db.execute(
      `select * from products where nameProduct like '%${name}%'`
    );
    return result;
  } catch (error) {
    console.log(error);
  }
}
async function deleteProductMySql(id) {
  try {
    const [result] = await db.execute(
      "delete from products where productId = ?",
      [id]
    );
    return result.insertId;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getAllProductsMySQL,
  addProductMySQL,
  updateProductMySQL,
  updateOutStockProductMySQL,
  getProductsByName,
  deleteProductMySql,
  getProductByIdMySQL,
  getProductByCategoryIdMySQL,
};
