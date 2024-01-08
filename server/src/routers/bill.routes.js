const { creatBill, getBills, getBillsForAdmin, adminDeny, adminAccept, getBillsForUser, userDeny } = require("../controller/bill.controller")
const { verifyToken } = require("../middlewares/middlewares")

const billRouter = (app)=>{
    app.get("/api/v1/bills", getBillsForAdmin)
    app.get("/api/v1/bill/:id", getBillsForUser)
    app.post("/api/v1/bill",creatBill)
    app.get("/api/v1/bills/:userId",getBills)
    app.patch("/api/v1/bills/admindeny", adminDeny)
    app.patch("/api/v1/bills/userdeny", userDeny)
    app.patch("/api/v1/bills/adminaccept", adminAccept)
}
module.exports = {
    billRouter
}