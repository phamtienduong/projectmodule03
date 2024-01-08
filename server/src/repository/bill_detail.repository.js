const db = require("../config/db.config");

async function creatBillDetailMySql(billId, productId, quantity) {
  try {
    const [result] = await db.execute(
      "insert into bill_detail (billId,quantity,productId) values (?,?,?)",
      [billId, quantity, productId]
    );
    return result.insertId;
  } catch (error) {
    console.log(error);
  }
}
async function getProductInBillMySql(billId) {
  try {
    const [result] = await db.execute(
      "SELECT * FROM bill join bill_detail on bill.bilId = bill_detail.billId join products on bill_detail.productId = products.productId where bill.bilId = ?",
      [billId]
    );
    return result;
  } catch (error) {
    console.log(error);
  }
}
module.exports = {
  creatBillDetailMySql,
  getProductInBillMySql,
};
