const db = require("../config/db.config");

async function creatBillMySql(userId, phoneNumber, address, totalPrice) {
  try {
    const [result] = await db.execute(
      "insert into bill (userId,phoneNumber,address,totalPrice,createdAt) values (?,?,?,?,CURRENT_TIMESTAMP())",
      [userId, phoneNumber, address, totalPrice]
    );
    return result.insertId;
  } catch (error) {
    console.log(error);
  }
}
async function getBillsMySql() {
  try {
    const [result] = await db.execute(`SELECT * FROM bill join bill_detail on bill.bilId = bill_detail.billId join products on bill_detail.productId = products.productId where bill.bilId = ?`, [
        id
    ]);
    return result;
  } catch (error) {
    console.log(error);
  }
}

async function getAllIdBill() {
  try {
    const [result] = await db.execute(
        `SELECT * FROM bill `,
      );
      return result;
  } catch (error) {
    console.log(error);
  }
}
async function getBillsForAdminMySql(id) {
  try {
    const [result] = await db.execute(
      `SELECT * FROM bill join bill_detail on bill.bilId = bill_detail.billId join products on bill_detail.productId = products.productId where bill.bilId = ?`,
      [id]
    );
    return result;
  } catch (error) {
    console.log(error);
  }
}

async function getBillsForUserMySql(id) {
  try {
    const [result] = await db.execute(
      `SELECT * FROM bill join bill_detail on bill.bilId = bill_detail.billId join products on bill_detail.productId = products.productId where bill.userId = ?`,
      [id]
    );
    return result;
  } catch (error) {
    console.log(error);
  }
}

async function adminDenyMySql(bilId) {
  try {
    const [result] = await db.execute(
      `update bill set status = "admin da huy" where bilId = ?`,
      [bilId]
    );
    return result;
  } catch (error) {
    console.log(error);
  }
}

async function userDenyMySql(bilId) {
  try {
    const [result] = await db.execute(
      `update bill set status = "user da huy" where bilId = ?`,
      [bilId]
    );
    return result;
  } catch (error) {
    console.log(error);
  }
}

async function adminAcceptMySql(bilId) {
  try {
    const [result] = await db.execute(
      `SELECT * FROM bill join bill_detail on bill.bilId = bill_detail.billId where bill.bilId = ?`,
      [bilId]
    );

    for (let i = 0; i < result.length; i++) {
      const productId = result[i].productId;
      const quantity = result[i].quantity;
      await db.execute(
        `update products set stock = stock - ? where productId = ?`,
        [quantity, productId]
      );
    }

    const [resultUpdate] = await db.execute(
      `update bill set status = "da xac nhan" where bilId = ?`,
      [bilId]
    );
    return resultUpdate;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  creatBillMySql,
  getBillsMySql,
  getBillsForAdminMySql,
  getAllIdBill,
  adminDenyMySql,
  adminAcceptMySql,
  getBillsForUserMySql,
  userDenyMySql
};
