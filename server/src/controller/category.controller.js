const {
  getCategoriesMySQL,
  addCategoriesMySQL,
  updateCategoriesMySQL,
  deleteCategoriesMySQL,
} = require("../repository/category.repository");

async function getCategories(req, res) {
  try {
    const categories = await getCategoriesMySQL();
    res.status(200).json({ categories });
  } catch (error) {
    console.log(error);
  }
}
async function addCategories(req, res) {
  try {
    const { nameCategory } = req.body;
    const result = await addCategoriesMySQL(nameCategory);
    res.status(200).json({
      message: "Thêm category thành công",
      result,
    });
  } catch (error) {
    console.log(error);
  }
}
async function updateCategories(req, res) {
  try {
    const { id } = req.params;
    const { nameCategory } = req.body;
    const result = await updateCategoriesMySQL(id, nameCategory);
    res.status(200).json({
      message: "Sửa sản phẩm thành công",
      result,
    });
  } catch (error) {
    console.log(error);
  }
}
async function deleteCategories(req, res) {
   const {id} = req.params
   const result = await deleteCategoriesMySQL(id)
   res.status(200).json({
    message:"Xóa Category thành công" ,
    result
   })
}
module.exports = {
  getCategories,
  addCategories,
  updateCategories,
  deleteCategories,
};
