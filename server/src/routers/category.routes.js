const {
  getCategories,
  addCategories,
  updateCategories,
  deleteCategories,
} = require("../controller/category.controller");

const categoryRouter = (app) => {
  app.get("/api/v1/categories", getCategories);
  app.post("/api/v1/categories", addCategories);
  app.put("/api/v1/categories/:id", updateCategories);
  app.delete("/api/v1/categories/:id", deleteCategories);
};
module.exports = {
  categoryRouter,
};
