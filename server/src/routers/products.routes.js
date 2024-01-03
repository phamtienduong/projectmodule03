const { getAllProducts, addProduct, updateProduct, 
    updateOutStockProduct, getProductsBySearch, 
    deleteProduct, getProductById, getProductsByCategory } = require("../controller/products.controller")

const productsRouter = (app)=>{
    app.get("/api/v1/products",getAllProducts)
    app.get("/api/v1/products/category/:id",getProductsByCategory)
    app.get("/api/v1/products/:id",getProductById)
    app.get("/api/v1/products/search",getProductsBySearch)
    app.post("/api/v1/products",addProduct)
    app.put("/api/v1/products/:id",updateProduct)
    app.patch("/api/v1/products/:id",updateOutStockProduct)
    app.delete("/api/v1/products/:id", deleteProduct);
}
module.exports = {
    productsRouter
}