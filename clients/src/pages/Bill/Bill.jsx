import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "./Bill.css"
import { Button, message, Popconfirm } from 'antd';
function Bill() {

    const userLogin = JSON.parse(localStorage.getItem("currentUser")) || {}
    const [bills, setBills] = useState([])

    const getBills = async () => {
        const result = await axios.get(`http://localhost:7500/bills?userId=${userLogin.id}`)
        setBills(result.data)
    }

    const handleCancel = async (id) => {
        console.log(id);
        await axios.patch(`http://localhost:7500/bills/${id}`, { status: 2 })
    
        await getBills()
        
    }
    
    const confirm = (e) => {
        console.log(e);
        message.success('Bạn đã huỷ đơn hàng thành công');
      };
    const cancel = (e) => {
        
     };

    useEffect(() => {
        getBills()
    }, [])

    return (
        <div>
            <table className='mb-4' cellPadding={10} cellSpacing={10} style={{ width: "80%", border: "1px solid #333", margin: "0 auto" }}>
                <thead>
                    <tr className='row-thead text-center rounded' >
                        <th style={{ width: "5%" }}>Id</th>
                        <th>Giỏ Hàng</th>
                        <th>Thông Tin Người Nhận</th>
                        <th>Thời Gian Mua Hàng</th>
                        <th>Tổng Tiền</th>
                        <th>Trạng Thái</th>
                        <th>Chức năng</th>
                    </tr>
                </thead>
                <tbody>
                    {bills.map((item) => {


                        return (
                            <tr key={item.id} style={{ border: "1px solid #333" }} className='row-tbody'>
                                <td>{item.id}</td>
                                <td>
                                    <div>
                                        {item.cart.map((item, index) => (
                                            <div key={index}>
                                                <img className='m-auto' width={100} src={item.image} alt='img'></img>
                                                <p>{item.name}</p>
                                                <span>{item.price}</span>
                                                <span> SL: {item.quantity}</span>
                                            </div>
                                        ))}
                                    </div>
                                </td>
                                <td>
                                    <p>Tên:{item.name} </p>
                                    <p>Địa Chỉ:{item.ward} - {item.district} - {item.province}</p>
                                    <p>SĐT:{item.phone}</p>
                                </td>
                                <td>{item.createdAt}</td>
                                <td>{Number(item.total).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                                <td>{item.status == 0 ? "Đang chờ" : item.status == 1 ? "Chấp nhận" : "Từ chối"}</td>
                                <td>
                                    <Popconfirm
                                        title="Delete the task"
                                        description="Are you sure to delete?"
                                        onConfirm={() => handleCancel(item.id)}
                                        onCancel={cancel}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        {item.status != 0 ? <></> :
                                            <button className='w-[45px] h-[30px] rounded bg-red-700 text-white' >Huỷ</button>}
                                    </Popconfirm>
                                </td>

                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Bill