import React, { useEffect, useState } from "react";
import "./Regiser.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { notification } from "antd";
import api from "../../service/apis/api.users.js";
import bcrypt from "bcryptjs";
export default function Register() {
  // ****************************************
  const navigate = useNavigate()
  const [nameInput, setNameInput] = useState({
    userName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [errorInput, setErrorInput] = useState({
    errName: "",
    errEmail: "",
    errPass: "",
    errConfirm: ""
  })
  const validateInput = () => {
    const regexName = /^.{6,}$/;
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const regexPhone = /^(0|\+84)\d{9,10}$/;
    const regexPass = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;

    let check = true;
    const err = {
      errName: "",
      errEmail: "",
      errPhone: "",
      errPass: "",
      errConfirm: "",
    };

    if (!regexName.test(nameInput.userName)) {
      err.errName = "Tên có 6 ký tự trở lên";
      check = false;
    }

    if (!regexEmail.test(nameInput.email)) {
      err.errEmail = "Chưa đúng định dạng email";
      check = false;
    }

    // Add logic to check for duplicate email in the users array

    if (!regexPhone.test(nameInput.phone)) {
      err.errPhone = "Chưa đúng định dạng Phone VN";
      check = false;
    }

    if (!regexPass.test(nameInput.password)) {
      err.errPass = "Mật khẩu ít nhất 6 ký tự chứa cả chữ cái và số";
      check = false;
    }

    if (!(nameInput.password === nameInput.confirmPassword)) {
      err.errConfirm = "Nhập lại mật khẩu cho đúng";
      check = false;
    }

    setErrorInput(err);
    return check;
  };
  const handleGetValue = (e) => {
    setNameInput({ ...nameInput, [e.target.name]: e.target.value });
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    if ( !nameInput.userName|| !nameInput.email || !nameInput.phone || !nameInput.password || !nameInput.confirmPassword) {
      notification.error({
        message: "Vui lòng nhập đủ thông tin!",
      })
      return;
    }
    const isValid = validateInput();
    if (isValid) {
      try {
        const res = await axios.post("http://localhost:8080/api/v1/auth/register", nameInput)
        notification.success(res.data)
        navigate("/login");
      }
      catch (error) {
        notification.error(error.response.data)
      }
    }
  }
  useEffect(() => {
    handleRegister
  }, [])
  return (
    <div>
      <div className="formRegister">
        <h1 className="text-4xl font-bold" id="formTitle">
          Đăng ký
        </h1>
        <div className="inputRegister">
          <form autoComplete="off">
            <div className="input_scope">
              <label htmlFor="username" />
              <br />
              <input
                onChange={handleGetValue}
                type="text"
                name="userName"
                value={nameInput.userName}
                placeholder="Tên đăng nhập"
                required
              />
              <p id="userName-error" style={{ paddingLeft: 150, color: 'red' }}>{errorInput.errName}</p>
              <br />
            </div>
            <div className="input_scope">
              <label htmlFor="email" />
              <br />
              <input
                onChange={handleGetValue}
                type="email"
                name="email"
                value={nameInput.email}
                placeholder="Email"
                required
              />
              <p id="email-error" style={{ paddingLeft: 150, color: 'red' }}>{errorInput.errEmail}</p>
              <br />
            </div>
            <div className="input_scope">
              <label htmlFor="phone" />
              <br />
              <input
                onChange={handleGetValue}
                type="text"
                name="phone"
                id="phone"
                value={nameInput.phone}
                placeholder="Số điện thoại"
                required
              />
              <p id="phone-error" style={{ paddingLeft: 150, color: 'red' }}>{errorInput.errPhone}</p>
              <br />
            </div>
            <div className="input_scope">
              <label htmlFor="password" />
              <br />
              <input
                onChange={handleGetValue}
                type="password"
                name="password"
                value={nameInput.password}
                placeholder="Mật khẩu"
                required
              />
              <p id="password-error" style={{ paddingLeft: 150, color: 'red' }}>{errorInput.errPass}</p>
              <br />
            </div>
            <div className="input_scope">
              <label htmlFor="confirmPassword" />
              <br />
              <input
                onChange={handleGetValue}
                type="password"
                name="confirmPassword"
                value={nameInput.confirmPassword}
                placeholder="Nhập lại mật khẩu"
                required
              />
              <p id="confirm-password-error" style={{ paddingLeft: 150, color: 'red' }}>{errorInput.errConfirm}</p>
              <br />
            </div>
            <button onClick={handleRegister} className="mt-4" type="button">
              Đăng ký
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
