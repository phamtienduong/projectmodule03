import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Table, Button, Modal, message, Popconfirm } from 'antd'


export default function AdminBill() {
    const renderColumns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'User Mua Hàng',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Giỏ Hàng',
            key: 'category_name',
            render: (_, bills) => (
                <>
                    <p style={{ textDecoration: "underline", cursor: "pointer", color: "blue" }} onClick={() => showModal(bills.cart)}>Chi tiết sản phẩm</p>
                </>
            )
        },
        {
            title: 'Tổng Tiền',
            dataIndex: 'total',
            key: 'total',
            render: (total) => <> {Number(total).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</>

        },
        {
            title: 'Thông Tin Người Mua Hàng',
            dataIndex: 'name',
            key: 'name',
            render:(_,bill)=>(
                <>  
                    <div>
                    <p>Tên:{bill.name}</p>
                    </div>
                    <div>
                    <p>Địa chỉ:{(bill.ward)+(bill.district)+(bill.province)}</p>
                    </div>
                    <div>
                    <p>SĐT:{bill.phone}</p>
                    </div>
                    <div>
                    <p>Thời gian mua:{bill.createdAt}</p>
                    </div>
                    
                </>
            )

        },
        {
            title: 'Trạng Thái',
            dataIndex: "status",
            key: 'status',
            render: (active) => (<><span>{active == 0 ? "Đang chờ" : active == 1 ? "Chấp nhận" : "Từ chối"}</span></>)
        },
        {
            title: 'Tính năng',
            key: 'role',
            render: (_, bills) => (<>
                {
                    bills.status == 0 ?
                        <>
                            <Button onClick={() => handleChangeActive(bills.id, 1)}>
                                Chấp Nhận
                            </Button>
                            <Button onClick={() => handleChangeActive(bills.id, 2)}>
                                Từ Chối
                            </Button>
                        </> : <></>
                }
            </>)

        }

    ];
    const [bills, setBills] = useState([])

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productUpdate, setProductUpdate] = useState()
    const [infoCart, setInfoCart] = useState()


    const handleChangeActive = async (id, status) => {
        await axios.patch(`http://localhost:7500/bills/${id}`, { status })
        await getBills()
    }

    const showModal = (cart) => {
        setInfoCart(cart)
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        setProductUpdate()
    };

    // const onFinish = (values) => {
    //     console.log('Success:', values);
    // };

    // const onFinishFailed = (errorInfo) => {
    //     console.log('Failed:', errorInfo);
    // };


    const getBills = async () => {
        const response = await axios.get("http://localhost:7500/bills")
        
        setBills(response.data);
    }
    useEffect(() => {
        getBills()
    }, [])
    return (
        <div>
            {
                isModalOpen &&
                <Modal
                    maskClosable={false}
                    width={800}
                    title="Thông tin giỏ hàng"
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    footer={<></>}
                >
                    <div style={{display: "flex", gap: 20, flexWrap: "wrap"}}>
                        {infoCart.map((item, index) => (
                            <div key={index}>
                                <p style={{textAlign:"center"}}>
                                    {item.name}
                                </p>
                                <img src={item.image} alt="" style={{ width: "120px", height: "auto", marginLeft: "30px" }} />
                                <p style={{ marginLeft: "60px" }}>{Number(item.price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                                <p style={{ marginLeft: "60px" }}>Số lượng: {item.quantity}</p>
                            </div>
                        ))}
                    </div>
                </Modal>
            }
            <div className="col-12">
                <div className="page-title-box">
                    <h4 className="page-title" style={{ fontSize: 50 }}>Quản lý đơn hàng</h4>
                </div>

            </div>

            <Table style={{marginBottom:"20px"}} dataSource={bills} columns={renderColumns} />
        </div>
    )
}
