const { creatBillDetailMySql, getProductInBillMySql } = require("../repository/bill_detail.repository")

async function creatBillDetail(req, res) {
    try {
        const { billId, cart } = req.body
        await Promise.all(
            cart.map(async (product) => await creatBillDetailMySql(billId, product.productId, product.quantity))
        )
        res.status(200).json({
            message: "Tạo chi tiết bill thành công"
        })
    } catch (error) {
        console.log(error);
    }
}
async function getProductInBill(req, res) {
    const { billId } = req.params
    try {
        const products = await getProductInBillMySql(billId)
        res.status(200).json(products)
    } catch (error) {
        console.log(error)
    }
}
module.exports = {
    creatBillDetail,
    getProductInBill
}