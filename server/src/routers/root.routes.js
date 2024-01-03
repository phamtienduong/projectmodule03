const { authRouter } = require("./auth.routes")
const { cartRouter } = require("./cart.routes")
const { categoryRouter } = require("./category.routes")
const { productsRouter } = require("./products.routes")
const { userRouter } = require("./users.routes")

const rootRouter = (app)=>{
    authRouter(app),userRouter(app),categoryRouter(app),productsRouter(app),cartRouter(app)
}
module.exports = {
    rootRouter
}