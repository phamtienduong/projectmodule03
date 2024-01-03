const db = require("../config/db.config")
async function addUser(userName,email,phone,password) {
    try{
        const [result] = await db.execute("insert into users (userName,email,phone,password) values (?,?,?,?)",[userName,email,phone,password]) 
        return result.insertId
    }
    catch(error){
        console.log(error);
    }
}
async function getUserByEmail(email) {
    try{
        const [result] = await db.execute("select * from users where email = ?",[email])
        if (result.length == 0) {
            return null
        }
        return result[0]
    }
    catch(error){
        console.log(error);
    }
    
}
const getAllUsers = async()=>{
    try{
        const [user] = await db.execute("select * from users where role = ?", [0])
        // console.log(user);
        return user;
    }
    catch(error){
        console.log(error);
    }
}

const changeStatusUserMySql = async (id, status) => {
    try{
        const [user] = await db.execute("update users set status = ? where userId = ?", [status, id])
        // console.log(user);
        return user;
    }
    catch(error){
        console.log(error);
    }
}
module.exports = {
    addUser,
    getUserByEmail,
    getAllUsers,
    changeStatusUserMySql
}