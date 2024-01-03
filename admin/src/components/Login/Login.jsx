import React from 'react'
import "./Login.css"
import {useNavigate} from "react-router-dom"
import { useState } from 'react'
import {message} from "antd"
import axios from 'axios'
function Login() {

    const navigate = useNavigate()
    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
    }

    const handleLogin = async () => {
        
        const response = await axios.post("http://localhost:8080/api/v1/auth/login",user)
        console.log(response);
        if (response.data.message == "Đăng nhập thành công") {
            localStorage.setItem("admin_token", response.data.token)

            navigate("admin")           
        } else {
            message.error(response.data.message)
        }
    }
    return (
        <div>
            <div className="formLogin">
                <h1 className='formTitle' id="formTitle" style={{padding: 0}}>Đăng nhập</h1>
                <div className="inputLogin">
                    <form>
                        <label htmlFor="email" /><br />
                        <input type="email" id="email" name='email' onChange={handleChange} placeholder="Email đăng nhập" required /><br />
                        <label htmlFor="password" /><br />
                        <input type="password" id="password" name='password' onChange={handleChange} placeholder="Mật khẩu" required /><br />
                        <button type="button" onClick={handleLogin} > Đăng nhập</button>
                        {/* <div className="login-register">
                            <p>Không có tài khoản?<Link to="/register" className="register-link underline decoration-2 text-blue-500">Đăng ký</Link></p>
                        </div> */}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login