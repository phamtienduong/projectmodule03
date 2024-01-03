const { addUser, getUserByEmail } = require("../repository/auth.repository");
const argon = require("argon2");
const jwt = require("jsonwebtoken");
const moment = require("moment");
async function register(req, res) {
  try {
    const { userName, email, phone, password } = req.body;
    const hashedPassword = await argon.hash(password);
    const result = await addUser(userName, email, phone, hashedPassword);
    if (!result) {
      return res.status(500).json({
        message: "Server lỗi",
      });
    }
    res.status(201).json({
      message: "Đăng ký thành công",
    });
  } catch (error) {
    console.log(error);
  }
}
async function login(req, res) {
  try {
    const { email, password } = req.body;
    // console.log(email);
    const result = await getUserByEmail(email);
    if (!result) {
      return res.status(200).json({
        message: "Email không tồn tại",
      });
    }
    if (result.status == 1) {
      return res.status(400).json({ message: "Tài khoản bị khoá" });
  }

    console.log(result.password, password);
    let checkPassword;
    try {
      checkPassword = await argon.verify(result.password, password);

    // // Lấy thời điểm hiện tại
    // const currentTimestamp = Math.floor(Date.now() / 1000);

    // // Thêm một giờ vào thời điểm hiện tại
    // const expirationTimestamp = currentTimestamp + 60 * 60; // 1 giờ

    // // Đặt múi giờ cho Việt Nam (GMT+7)
    // const vietnamTimeZoneOffset = 7 * 60 * 60;
    // const expirationTimestampInVietnam = expirationTimestamp + vietnamTimeZoneOffset;


      const token = jwt.sign(
        { id: result.userId, role: result.role },
        process.env.JWT_SECRET,
        {
          expiresIn: "10h",
        }
      );
      // delete result.password;
      return res.status(200).json({
        message: "Đăng nhập thành công",
        token
      });
    } catch (error) {
      console.log("==>", checkPassword);
      return res.status(200).json({
        message: "Sai mật khẩu",
      });
    }


    // if (!checkPassword) {
    //     return res.status(200).json({
    //         message: "Sai mật khẩu"
    //     })
    // }
    // const token = jwt.sign({ id: result.id, role: result.role }, process.env.JWT_SECRET, {
    //     expiresIn: "5m",
    // });
    // // delete result.password;
    // return res.status(200).json({
    //     message: "Đăng nhập thành công",
    //     token
    // })
  } catch (error) {
    console.log(error);
  }
}
module.exports = {
  register,
  login,
};
