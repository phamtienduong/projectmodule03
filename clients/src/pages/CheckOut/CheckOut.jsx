import React, { useEffect, useState } from 'react'
import "./CheckOut.css"
import axios from 'axios';
import { message } from 'antd';
import {useNavigate} from "react-router-dom"
export default function CheckOut() {

    const userLogin = JSON.parse(localStorage.getItem("currentUser"))
    const [cart, setCart] = useState([])

    const [infoBill, setInfoBill] = useState({
        name: "",
        phone: "",
        email: "",
        note: "",
    })

    const navigate = useNavigate()

    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    const [provinceCode, setProvinceCode] = useState()
    const [districtCode, setDistrictCode] = useState()
    const [wardCode, setWardCode] = useState()

    let total = cart.reduce((total, current) => {
        return total + current.price * current.quantity
    }, 0)

    const getProvinces = async () => {
        let result = await axios.get("https://provinces.open-api.vn/api/");
        setProvinces(result.data);
    }

    const handleSelectProvince = async (e) => {
        const provinceCode = e.target.value;
        let result = await axios.get(`https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`);
        setProvinceCode(provinceCode)
        setDistricts(result.data.districts)
        setDistrictCode(-1)
        setWards([])
        setWardCode(-1)
    }

    const handleSelectDistrict = async (e) => {
        const districtCode = +(e.target.value);
        let result = await axios.get(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`);
        setDistrictCode(districtCode)
        setWards(result.data.wards)
        setWardCode(-1)
    }

    const checkOut = async () => {

        if (!provinceCode || !districtCode || !wardCode) {
            message.error("Điền đủ thông tin địa chỉ")
            return
        }

        const provinceName = provinces.find(e => e.code == provinceCode).name
        const districtName = districts.find(e => e.code == districtCode).name
        const wardName = wards.find(e => e.code == wardCode).name
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1;
        let yyyy = String(today.getFullYear());
        let h = today.getHours();
        let m = today.getMinutes();
        let s = today.getSeconds();

        const bill = {
            ...infoBill,
            province: provinceName,
            district: districtName,
            ward: wardName,
            cart,
            total,
            userId: userLogin.id,
            status: 0,
            createdAt: `${h}:${m}:${s}, ${dd}/${mm}/${yyyy}`
        }

        if (bill.cart.length == 0) {
            message.error("Không có sản phẩm để mua")
            return
        }

        if (!(/^0[13579]\d{8}$/.test(bill.phone))) {
            message.error("Chưa đúng định dạng số điện thoại")
            return
        }

        if (!(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(bill.email))) {
            message.error("Email không hợp lệ")
            return
        }


        const result = await axios.post("http://localhost:7500/bills", bill)
        if (result.status === 201) {
            message.success("Thành Công")
            userLogin.cart = []
            localStorage.setItem("currentUser", JSON.stringify(userLogin))
            await axios.put(`http://localhost:7500/users/${userLogin.id}`, userLogin)
            navigate("/bill")
        }
    }

    useEffect(() => {
        getProvinces();
    }, [])

    // ==============================================================

    const getCart = async () => {
        const result = await axios.get(`http://localhost:7500/users/${userLogin.id}`)
        const cart = result.data.cart

        const newCartRender = []
        for (let i = 0; i < cart.length; i++) {
            const result = await axios.get(`http://localhost:7500/products/${cart[i].idProduct}`)
            newCartRender.push({ ...result.data, quantity: cart[i].quantity })
        }

        setCart(newCartRender)
    }

    const handleChangeInfo = (e) => {
        const { name, value } = e.target
        setInfoBill({ ...infoBill, [name]: value })
    }
    useEffect(() => {
        getCart()
    }, [])


    return (
        <div className='w-[1140px] m-auto mt-3 flex justify-between '>
            <div>
                <div>
                    <h1 className='text-2xl font-bold'>Thông tin giao hàng</h1>
                </div>
                <div className='info-delivery'>
                    <div className=''>
                        <label>Tên</label>
                        <input
                            placeholder='Họ và tên'
                            onChange={handleChangeInfo}
                            value={infoBill.name}
                            name='name'
                        />
                    </div>
                    <div className='ml-1'>
                        <label>Điện Thoại</label>
                        <input
                            placeholder='Số điện thoại'
                            onChange={handleChangeInfo}
                            value={infoBill.phone}
                            name='phone'
                        />
                    </div>

                </div>
                <div className='info-email'>
                    <label>Địa chỉ Email</label>
                    <input
                        type='email'
                        placeholder='Địa chỉ Email'
                        onChange={handleChangeInfo}
                        value={infoBill.email}
                        name='email'
                    />
                </div>
                <div className='info-address'>
                    <select onChange={handleSelectProvince} value={provinceCode}>
                        <option disabled selected value={-1}>Tỉnh</option>
                        {provinces.map((item, index) => (
                            <option key={index} value={item.code}>{item.name}</option>
                        ))}
                    </select>
                    <select onChange={handleSelectDistrict} className='ml-3.5' value={districtCode}>
                        <option disabled selected value={-1}>Quận/Huyện</option>
                        {districts.map((item, index) => (
                            <option key={index} value={item.code}>{item.name}</option>
                        ))}
                    </select>
                    <select onChange={(e) => setWardCode(e.target.value)} className='ml-3' value={wardCode}>
                        <option disabled selected value={-1}>Phường/Xã</option>
                        {wards.map((item, index) => (
                            <option key={index} value={item.code}>{item.name}</option>
                        ))}
                    </select>

                </div>
                <div className='info-message'>
                    <label>Lời nhắn</label>
                    <textarea
                        placeholder='Ghi chú thêm (Ví dụ:Giao hàng giờ hành chính)'
                        onChange={handleChangeInfo}
                        value={infoBill.note}
                        name='note'
                    />
                </div>
                <div >
                    <button className='w-[258px] h-[50px] rounded-none bg-black hover:bg-red-200 mb-3 text-white'
                        onClick={() => checkOut()}
                    >
                        ĐẶT HÀNG NGAY
                    </button>
                </div>
            </div>


            <div className='total-cart' >
                <div >
                    {cart.map((item) => (
                        <div className='flex' key={item.id}>
                            <div className='w-[100px] mb-2 rounded mr-3'>
                                <img src={item.image}></img>
                            </div>
                            <div>
                                <span>{item.name}</span><br></br>
                                <span>{Number(item.price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                                <div>
                                    <span>Số lượng:</span>
                                    {/* <button className='ml-2 '>-</button> */}
                                    <span className='ml-2'>{item.quantity}</span>
                                    {/* <button className='ml-2'>+</button> */}
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className='flex justify-between'>
                        <h2 className='font-bold text-xl'>TỔNG CỘNG</h2>
                        <span className='text-red-500 font-bold text-xl'>{Number(total).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                    </div>
                </div>
            </div>

        </div>
    )
}
