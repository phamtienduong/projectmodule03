const { getAllUsers, changeStatusUserMySql } = require("../repository/auth.repository");

async function getUsers(req,res) {
    const users = await getAllUsers()
    res.status(200).json({
        users,
        messeage:"Bạn là admin"
    })
}

async function changeStatusUser(req, res) {
    const {id, status} = req.body
    const result = await changeStatusUserMySql(id, status)
    return res.status(200).json({
        messeage: "Doi thanh cong"
    })

}
module.exports={getUsers, changeStatusUser};