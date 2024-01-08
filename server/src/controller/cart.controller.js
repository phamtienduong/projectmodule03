const jwt = require("jsonwebtoken");
const {
  addToCartMySql,
  getInfoCartMySql,
  deleteItemCartMySql,
  changeQuantityIncreaseMySql,
  changeQuantityMySql,
  deleteCartByUserId,
} = require("../repository/cart.repository");

async function addToCart(req, res) {
  const { productId } = req.body;
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Không tìm thấy token" });
    }
    jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
      if (err) {
        console.log(err);
        if (err.name === "TokenExpiredError") {
          // Nếu token đã hết hạn
          return res.status(401).json({ message: "Token đã hết hạn" });
        } else {
          // Nếu token không hợp lệ
          return res.status(403).json({ message: "Token không hợp lệ" });
        }
      }
      // Nếu token hop le
      if (data.role == 0) {
        // console.log(data);
        const result = await addToCartMySql(data.id, productId);
        console.log("ket qua sau truy van sql: ", result);
        if (result != null) {
          return res.status(201).json({
            message: "Thêm vào giỏ hàng thành công",
            data: result,
          });
        } else {
          return res.status(200).json({
            message: "Đã có trong giỏ hàng",
            data: result,
          });
        }
      }
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
}

async function getInfoCart(req, res) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Không tìm thấy token" });
    }
    jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
      if (err) {
        console.log(err);
        if (err.name === "TokenExpiredError") {
          // Nếu token đã hết hạn
          return res.status(401).json({ message: "Token đã hết hạn" });
        } else {
          // Nếu token không hợp lệ
          return res.status(403).json({ message: "Token không hợp lệ" });
        }
      }
      // Nếu token hop le
      if (data.role == 0) {
        // console.log(data);
        const result = await getInfoCartMySql(data.id);
        // console.log(result);
        return res.status(200).json({
          data: result,
        });
      }
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
}

async function deleteItemCart(req, res) {
  const { id } = req.params;
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Không tìm thấy token" });
    }
    jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
      if (err) {
        console.log(err);
        if (err.name === "TokenExpiredError") {
          // Nếu token đã hết hạn
          return res.status(401).json({ message: "Token đã hết hạn" });
        } else {
          // Nếu token không hợp lệ
          return res.status(403).json({ message: "Token không hợp lệ" });
        }
      }
      // Nếu token hop le
      if (data.role == 0) {
        // console.log(data);
        const result = await deleteItemCartMySql(data.id, id);
        return res.status(200).json({
          message: "xoa thanh cong",
          data: result,
        });
      }
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
}
async function updateQuantity(req, res) {
  const { productId, num } = req.params;
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Không tìm thấy token" });
    }
    jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
      if (err) {
        console.log(err);
        if (err.name === "TokenExpiredError") {
          // Nếu token đã hết hạn
          return res.status(401).json({ message: "Token đã hết hạn" });
        } else {
          // Nếu token không hợp lệ
          return res.status(403).json({ message: "Token không hợp lệ" });
        }
      }
      // Nếu token hop le
      if (data.role == 0) {
        console.log("đổi số lượng");
      }
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
}

async function changeQuantity(req, res) {
  console.log("33333",req.body)
  const { cartId } = req.body;
  const { type } = req.body;

  try {
    const result = await changeQuantityMySql(cartId,type);
    console.log(result);
    res.status(200).json({
      message: "tăng số lượng thành công",
    });
  } catch (error) {
    console.log(error);
    
  }
}
async function deleteCartPayment(req,res) {
  const {userId} = req.params
  console.log(userId);
  try {
    await deleteCartByUserId(userId)
    res.status(200).json({
      message:"Xoá giỏ hàng thành công"
    })
  } catch (error) {
    console.log(error);
  }
}


module.exports = {
  addToCart,
  getInfoCart,
  deleteItemCart,
  updateQuantity,
  changeQuantity,
  deleteCartPayment
};
