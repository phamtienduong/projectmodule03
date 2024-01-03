const { register, login } = require("../controller/auth.controller")
const { checkEmpty, checkEmailExit,  } = require("../middlewares/middlewares")

const authRouter = (app)=>{
    app.post("/api/v1/auth/register",checkEmpty,checkEmailExit,register)
    app.post("/api/v1/auth/login",checkEmpty,login)
}
module.exports = {
    authRouter
}