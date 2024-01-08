import React, { useEffect, useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { message, notification } from "antd";
import axios from "axios";
export default function Login({ setIsLogin }) {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e)=>{
    setUser({...user,[e.target.name]:e.target.value})
  }
  const handleLogin = async(e)=>{
    e.preventDefault();
    if (!user.email || !user.password) {
      notification.error({
        message: "Vui lòng nhập đủ thông tin!",
      })
      return;
    }
    // xử lý đăng nhập
    try{
      const res = await axios.post("http://localhost:8080/api/v1/auth/login",user)
      notification.success(res.data)
      console.log(res);
      if (res.data.token) {
        localStorage.setItem("token",res.data.token)
        localStorage.setItem('user_login', JSON.stringify(res.data.result));
        setIsLogin(true)
        navigate("/"); 
      }
    }
    catch(error){
      notification.error(error.response.data)
    }
  }

  return (
    <div>
      <div className="formLogin">
        <h1 className="text-4xl font-bold" id="formTitle">
          Đăng nhập
        </h1>
        <div className="inputLogin">
          <form>
            <label htmlFor="email" />
            <br />
            <input
              onChange={handleChange}
              type="text"
              id="email"
              name="email"
              value={user.email}
              placeholder="Email"
              required
            />
            <br />
            <label htmlFor="password" />
            <br />
            <input
              onChange={handleChange}
              type="password"
              id="password"
              name="password"
              value={user.password}
              placeholder="Mật khẩu"
              required
            />
            <br />
            <button onClick={handleLogin} type="button"> Đăng nhập</button>
            <div className="login-register">
              <p>
                Không có tài khoản?
                <Link
                  to="/register"
                  className="register-link underline decoration-2 text-blue-500"
                >
                  Đăng ký
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
