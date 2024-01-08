import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "./Bill.css"
import { Button, message, Popconfirm, Table } from 'antd';
function Bill() {

    const renderColumns = [
        {
            title: 'userId',
            dataIndex: 'userId',
            key: 'userId',
        },
        {
            title: 'totalPrice',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
        },
        {
            title: 'status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'phoneNumber',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: 'createdAt',
            dataIndex: 'createdAt',
            key: 'createdAt',
        },
        {
            title: 'bilId',
            dataIndex: "bilId",
            key: 'bilId',
        },
        {
            title: 'address',
            key: 'address',
            dataIndex:"address"
        },
        {
            title: 'cart',
            key: 'cart',
            dataIndex:"cart",
            render: (cart) => <div style={{height: 200, overflowY: "scroll"}}>{cart.map((item, index) => (
                <div key={index} style={{borderBottom: "1px solid #333"}}>
                    <p>{item.nameProduct} | {item.quantity} | {item.price} </p>
                    <p>
                        <img width={100} src={item.image} alt='' />
                    </p>
                    <p>{item.description}</p>
                </div>
            ))}</div>
        },
        {
            title: 'action',
            key: 'action',
            width: 100,
            render: (bill) => (
                <div>{bill.status == "đang xử lý" ? <div>
                    <Button onClick={() => handleDeny(bill.bilId)}>Tu choi</Button>
                </div> : <></>}</div>
            )
        }
    ];

    const userLogin = JSON.parse(localStorage.getItem("user_login"))
    // console.log(userLogin);
    const [bills, setBills] = useState([])

    const getBills = async () => {
        // const result = await axios.get(`http://localhost:8080/bills?userId=${userLogin.id}`)
        // setBills(result.data)
        const response = await axios.get(`http://localhost:8080/api/v1/bill/${userLogin.userId}`)
        // console.log(response.data.data);
        const listBillDetail = response.data.data

        const listIdBill = []
        for (const item of listBillDetail) {
            if (!listIdBill.includes(item.bilId)) {
                listIdBill.push(item.bilId)
            }
        }

        const data = []
        for (const id of listIdBill) {
            const billDetails = listBillDetail.filter(item => item.bilId == id )
            data.push(billDetails)
        }
        
        let result = []
        for(let  i = 0; i < data.length; i++) {
            const bill = data[i]
            let resultItem = {}
            let cart = []
            for(let j = 0; j < bill.length; j++) {
                // const {}
                const {
                    userId, bilId, address, phoneNumber , status, totalPrice, createdAt,
                    stock, categoryId, productId, billId,
                    ...data
                } = bill[j]
                resultItem = {userId, bilId, address, phoneNumber , status, totalPrice, createdAt}
                cart.push(data)
            }
            resultItem = {...resultItem, cart}
            result.push(resultItem)
        }
        // console.log(result);
        
        setBills(result);
    }
    

    const handleDeny = async (id) => {
        console.log(id);
        const response = await axios.patch(`http://localhost:8080/api/v1/bills/userdeny`, {
            bilId: id
        })
        getBills()
    }

    useEffect(() => {
        getBills()
    }, [])


    return (
        <div>
            {/* <table className='mb-4' cellPadding={10} cellSpacing={10} style={{ width: "80%", border: "1px solid #333", margin: "0 auto" }}>
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
                    {bills.map((item,index) => {
                        return (
                            <tr key={index} style={{ border: "1px solid #333" }} className='row-tbody'>
                                <td>{index+1}</td>
                                <td>
                                    <div>
                                        <div>
                                            <img className='m-auto' width={100} src={item.image} alt='img'></img>
                                            <p>{item.nameProduct}</p>
                                            <span>{item.price}</span>
                                            <span> SL: {item.quantity}</span>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <p>Tên:{item.name} </p>
                                    <p>Địa Chỉ:{item.address}</p>
                                    <p>SĐT:{item.phoneNumber}</p>
                                </td>
                                <td>{item.createdAt}</td>
                                <td>{Number(item.totalPrice).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                                <td>{item.status === "Đang xử lý" ? "Đang chờ" : item.status === "Chấp nhận" ? "Chấp nhận" : "Từ chối"}</td>
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
            </table> */}

            <Table style={{marginBottom:"20px"}} dataSource={bills} columns={renderColumns} />
        </div>
    )
}

export default Bill