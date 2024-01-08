const { authRouter } = require("./auth.routes");
const { billRouter } = require("./bill.routes");
const { billDetailRouter } = require("./bill_detail.routes");
const { cartRouter } = require("./cart.routes");
const { categoryRouter } = require("./category.routes");
const { productsRouter } = require("./products.routes");
const { userRouter } = require("./users.routes");

const rootRouter = (app) => {
  authRouter(app),
    userRouter(app),
    categoryRouter(app),
    productsRouter(app),
    cartRouter(app),
    billRouter(app),
    billDetailRouter(app)
};
module.exports = {
  rootRouter,
};
