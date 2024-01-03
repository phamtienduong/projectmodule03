const { getUsers, changeStatusUser } = require("../controller/users.controller")
const { verifyToken } = require("../middlewares/middlewares")

const userRouter = (app)=>{
    app.get("/api/users",verifyToken,getUsers)
    app.patch("/api/users/status", verifyToken, changeStatusUser)
}
module.exports = {
    userRouter
}