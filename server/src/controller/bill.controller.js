const { creatBillMySql, getBillsMySql, getBillsForAdminMySql,
    getAllIdBill, adminDenyMySql, adminAcceptMySql, getBillsForUserMySql,
    userDenyMySql } = require("../repository/bill.repository");

async function creatBill(req, res) {
    const { userId, phone, address, total } = req.body
    console.log(req.body);
    try {
        const newIdBill = await creatBillMySql(userId, phone, address, total)
        res.status(201).json({
            newIdBill
        })
    } catch (error) {
        console.log(error);
    }
}
async function getBills(req, res) {
    try {
        const billsId = await getAllIdBill()

        let data = []
        for (let i = 0; i < billsId.length; i++) {
            const result = await getBillsMySql(billsId[i].bilId)
            data.push(result)
        }

        return res.status(200).json({
            data: data,
            message: "Ban la user"
        })
    } catch (error) {
        console.log(error)
    }
}

async function getBillsForAdmin(req, res) {
    try {
        const billsId = await getAllIdBill()
        // console.log(billsId);
        let data = []
        for (let i = 0; i < billsId.length; i++) {
            const result = await getBillsForAdminMySql(billsId[i].bilId)
            data.push(result)
        }

        return res.status(200).json({
            data: data,
            message: "Ban la admin"
        })
    } catch (error) {
        console.log(error)
    }
}
async function getBillsForUser(req, res) {
    const { id } = req.params
    // console.log(id);
    try {

        const result = await getBillsForUserMySql(id)

        return res.status(200).json({
            data: result,
            message: "Ban la admin"
        })
    } catch (error) {
        console.log(error)
    }
}

async function adminDeny(req, res) {
    const { bilId } = req.body
    try {
        const result = await adminDenyMySql(bilId)
        res.status(200).json({
            result,
            message: "Admin"
        })
    } catch (error) {
        console.log(error)
    }
}

async function userDeny(req, res) {
    const { bilId } = req.body
    try {
        const result = await userDenyMySql(bilId)
        res.status(200).json({
            result,
            message: "Admin"
        })
    } catch (error) {
        console.log(error)
    }
}


async function adminAccept(req, res) {
    const { bilId } = req.body
    try {
        const result = await adminAcceptMySql(bilId)
        res.status(200).json({
            result,
            message: "Admin"
        })
    } catch (error) {
        console.log(error)
    }
}
module.exports = {
    creatBill,
    getBills,
    getBillsForAdmin,
    adminDeny,
    adminAccept,
    getBillsForUser,
    userDeny
}