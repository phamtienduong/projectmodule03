const db = require("../config/db.config");
const { getProductByIdMySQL } = require("./products.repository");

async function addToCartMySql(userId, productId) {
  console.log(userId, productId);
  try {
    const [result] = await db.execute(
      "select * from cart where userId = ? and productId = ?",
      [userId, productId]
    );
    console.log(" tim kiem: ", result);
    if (result.length == 0) {
      let sql = `INSERT INTO cart (userId,productId, quantity) VALUES(?,?,?)`;
      const [kq] = await db.execute(sql, [userId, productId, 1]);
      console.log("kq: ",kq);
      return kq;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
}

async function getInfoCartMySql(userId) {
  try {
    const [result] = await db.execute(
      "select * from cart join products on cart.productId = products.productId where userId = ?",
      [userId]
    );
    return result
  } catch (error) {
    console.log(error);
  }
}


async function deleteItemCartMySql(userId, productId) {
  try {
    const [result] = await db.execute(
      "delete from cart where userId = ? and productId = ?",
      [userId, productId]
    );
    return result
    
  } catch (error) {
    console.log(error);
  }
}
async function changeQuantityMySql(id,type) {
  try {
    if (type == "incre") {
      const [result] = await db.execute(
        "update cart set quantity = quantity + 1 where cartId = ?",
        [id]
      );
      return result.insertId;
    } else {
      const [result] = await db.execute(
        "update cart set quantity = quantity - 1 where cartId = ?",
        [id]
      );
      return result.insertId;

    }
    
  } catch (error) {
    console.log(error);
  }
}
module.exports = {
  addToCartMySql,
  getInfoCartMySql,
  deleteItemCartMySql,
  changeQuantityMySql
  
};
