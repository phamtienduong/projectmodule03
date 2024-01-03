const db = require("../config/db.config");
async function getCategoriesMySQL() {
  try {
    const [categories] = await db.execute("select * from category");
    return categories;
  } catch (error) {
    console.log(error);
  }
}
async function addCategoriesMySQL(nameCategory) {
  try {
    const [result] = await db.execute(
      "insert into category (nameCategory) values (?)",
      [nameCategory]
    );
    return result.insertId;
  } catch (error) {
    console.log(error);
  }
}
async function updateCategoriesMySQL(categoryId, nameCategory) {
  try {
    console.log(categoryId, nameCategory);
    const [result] = await db.execute(
      "update category set nameCategory = ? where categoryId = ?",
      [nameCategory, categoryId]
    );
    console.log(result);
    return result.insertId;
  } catch (error) {
    console.log(error);
  }
}
async function deleteCategoriesMySQL(categoryId) {
  try {
    const [result] = await db.execute(
      "delete from category where categoryId = ?",[categoryId]
    );
    return result.insertId;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getCategoriesMySQL,
  addCategoriesMySQL,
  updateCategoriesMySQL,
  deleteCategoriesMySQL,
};
