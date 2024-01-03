const {
  getAllProductsMySQL,
  addProductMySQL,
  updateProductMySQL,
  updateOutStockProductMySQL,
  getProductsByName,
  deleteProductMySql,
  getProductByIdMySQL,
  getProductByCategoryIdMySQL
} = require("../repository/products.repository");

async function getProductsByCategory(req, res) {
  const {id} = req.params
  try {
    const result = await getProductByCategoryIdMySQL(id);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
}

async function getProductById(req, res) {
  const {id} = req.params
  try {
    const result = await getProductByIdMySQL(id);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
}
async function getAllProducts(req, res) {
  try {
    const result = await getAllProductsMySQL();
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
}
async function addProduct(req, res) {
  try {
    const { nameProduct, image, price, description, stock, categoryId } =
      req.body;
    const result = await addProductMySQL(
      nameProduct,
      image,
      price,
      description,
      stock,
      categoryId
    );
    if (!result) {
      res.status(500).json({
        message: "Có lỗi khi thêm sản phẩm",
      });
    } else {
      res.status(201).json({
        message: "Thêm sản phẩm thành công",
        result,
      });
    }
  } catch (error) {
    console.log(error);
  }
}
async function updateProduct(req, res) {
  try {
    const { id } = req.params;
    const { nameProduct, image, price, description, stock, categoryId } =
      req.body;
    const result = await updateProductMySQL(
      nameProduct,
      image,
      price,
      description,
      stock,
      categoryId,
      id
    );
    res.status(200).json({
      message: "Sửa sản phẩm thành công",
      result,
    });
  } catch (error) {
    console.log(error);
  }
}
async function updateOutStockProduct(req, res) {
  try {
    const { id } = req.params;
    const result = await updateOutStockProductMySQL(id);
    res.status(200).json({
      message: "Cập nhật trạng thái hết hàng thành công",
      result,
    });
  } catch (error) {
    console.log(error);
  }
}
async function getProductsBySearch(req,res) {
  console.log("chay vao router");
    const {nameProduct} = req.query
  try {
    const result = await getProductsByName(nameProduct)
    res.status(200).json(result)
  } catch (error) {
    console.log(error);
  }
}
async function deleteProduct(req, res) {
  const { id } = req.params;
  const result = await deleteProductMySql(id);
  res.status(200).json({
    message: "Xoá sản phẩm thành công",
    result,
  });
}
module.exports = {
  getAllProducts,
  addProduct,
  updateProduct,
  updateOutStockProduct,
  getProductsBySearch,
  deleteProduct,
  getProductById,
  getProductsByCategory
};
