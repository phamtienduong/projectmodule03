import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Table, Button, Modal, message, Popconfirm } from 'antd'


export default function AdminBill() {
    const renderColumns = [
        {
            title: 'UserId',
            dataIndex: 'userId',
            key: 'userId',
        },
        {
            title: 'TotalPrice',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'PhoneNumber',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: 'CreatedAt',
            dataIndex: 'createdAt',
            key: 'createdAt',
        },
        {
            title: 'BilId',
            dataIndex: "bilId",
            key: 'bilId',
        },
        {
            title: 'Address',
            key: 'address',
            dataIndex:"address"
        },
        {
            title: 'Cart',
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
                    <Button onClick={() => handleAccept(bill.bilId)}>Chấp Nhận</Button>
                    <Button onClick={() => handleDeny(bill.bilId)}>Từ chối</Button>
                </div> : <></>}</div>
            )
        }
    ];
    const [bills, setBills] = useState([])

    const getBills = async () => {

        const response = await axios.get("http://localhost:8080/api/v1/bills")
        const data = response.data.data
        
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
        // console.log(id);
        const response = await axios.patch(`http://localhost:8080/api/v1/bills/admindeny`, {
            bilId: id
        })
        getBills()
    }

    const handleAccept = async (id) => {
        // console.log(id);
        const response = await axios.patch(`http://localhost:8080/api/v1/bills/adminaccept`, {
            bilId: id
        })
        if (response.data.result.affectedRows) {
            getBills()
        } else {
            message.error("failue")
        }
        // getBills()
    }

    useEffect(() => {
        getBills()
    }, [])
    return (
        <div>
            <div className="col-12">
                <div className="page-title-box">
                    <h4 className="page-title" style={{ fontSize: 50 }}>Quản lý đơn hàng</h4>
                </div>

            </div>

            <Table style={{marginBottom:"20px"}} dataSource={bills} columns={renderColumns} />
        </div>
    )
}
