import axios from "axios"
import bcrypt from "bcryptjs";
export default {
    register : async(data)=>{
        return await axios.post(`${import.meta.env.VITE_HOST_NAME}users`,data)
    },
    
    checkRegister :async(email)=>{
        return await axios .get(`${import.meta.env.VITE_HOST_NAME}users?email=${email}`)
    },
    checkLogin:async(userName,password)=>{
        const response = await axios.get(`${import.meta.env.VITE_HOST_NAME}users?userName=${userName}`);
        const user = response.data[0];
        if (user) {
          const isMatch = await bcrypt.compare(password, user.password);
          if (isMatch) {
            delete user.password
            return { status: true, user };
          }
        }
        return { status: false, message: "Email hoặc mật khẩu không đúng" };
        // return await axios.get(`${import.meta.env.VITE_HOST_NAME}users?userName=${userName}&password=${password}`)
    }
}