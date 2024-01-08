const { creatBillDetail, getProductInBill } = require("../controller/bill_detail.controller")

const billDetailRouter = (app)=>{
    app.post("/api/v1/billDetail",creatBillDetail)
    app.get("/api/v1/billDetail/:billId", getProductInBill)
}
module.exports = {
    billDetailRouter
}