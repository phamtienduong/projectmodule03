const { addToCart, getInfoCart, deleteItemCart, updateQuantity, changeQuantity,  } = require("../controller/cart.controller")


const cartRouter = (app)=>{
    app.get("/api/v1/cart",getInfoCart )
    app.post("/api/v1/cart",addToCart )
    app.delete("/api/v1/cart/delete/:id", deleteItemCart)
    app.patch("/api/v1/cart/",updateQuantity)
    app.patch("/api/v1/cart/quantity",changeQuantity);

}
module.exports = {
    cartRouter,
}