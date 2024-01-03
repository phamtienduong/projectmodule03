import React from 'react'
import { useState, useEffect } from 'react'
import axios from "axios"
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import "./AdminProduct.scss"
import { Button, Image, Table, Modal, Form, Input, Select, message, Popconfirm, Space } from "antd"
import { storage } from "../../firebase/firebase";

// import type { SearchProps } from '../Search';

//cấu tạo của bảng product
const renderColumns = (handleOkeDelete, handleClickEdit) => [
    {
        title: 'ID',
        dataIndex: 'productId',
        key: 'productId',
    },
    {
        title: 'Ảnh',
        dataIndex: 'image',
        key: 'image',
        render: (image) => <Image src={image} alt="img" width={100} />
    },
    {
        title: 'Tên',
        dataIndex: 'nameProduct',
        key: 'nameProduct',
       
    },
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',

    },
    {
        title: 'Giá',
        dataIndex: 'price',
        key: 'price',
        render: (price) => <>{Number(price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</>
    },
    {
        title: 'Số lượng',
        dataIndex: 'stock',
        key: 'stock',
    },
    {
        title: 'Tính năng',
        key: 'stock',
        render: (_, product) => (<>
            <Button onClick={() => handleClickEdit(product)}>Edit</Button>
            <Popconfirm
                title="Delete product"
                description="Are you sure to delete this task?"
                onConfirm={() => handleOkeDelete(product.productId)}
                onCancel={() => { }}
                okText="Yes"
                cancelText="No"
            >
                <Button danger>Delete</Button>
            </Popconfirm>
        </>)
    },
];

// lấy ra component search
const { Search } = Input;

// khi submit form ko thành công
const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};


export default function AdminProduct() {

    // lưu sản phẩm
    const [products, setProducts] = useState([])
    // lưu category
    const [categories, setCategories] = useState([]);

    // mở modal thêm sửa
    const [isModalOpen, setIsModalOpen] = useState(false);
    // lưu thông tin product cần sửa
    const [productUpdate, setProductUpdate] = useState()

    const [search,setSearch] = useState("")
    
    const onSearch = (value, _e, info) => console.log(info?.source, value);

    // hien thi modal 
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };
    // tat modal
    const handleCancel = () => {
        // xoá các trường đã nhập
        form.resetFields()
        // tắt modal
        setIsModalOpen(false);
        // set lại thông tin cần update
        setProductUpdate()
    };

    // lấy thông tin category
    const getCategories = async () => {
        const result = await axios.get("http://localhost:8080/api/v1/categories")
        setCategories(result.data.categories)
    }

    // lấy thông tin prodcut
    const getProducts = async () => {
        const result = await axios.get("http://localhost:8080/api/v1/products")
        setProducts(result.data.reverse())
    }

    useEffect(() => {
        getCategories()
        getProducts();
    }, []); // [] đảm bảo useEffect chỉ chạy một lần sau khi component được render

    // xử lý thêm sản phẩm
    // lưu giữ file ảnh được chọn
    const [fileImage, setFileImage] = useState()
    // giữ liên kết đến form để thông qua nó có thể xoá form, đổ dữ liệu
    const [form] = Form.useForm()

    // khi chọn ảnh thì lưu ảnh đó vào bộ nhớ
    const handleChangeImage = (e) => {
        setFileImage(e.target.files[0])
    }

    const handleChangeCategory = (value) => { };

    // hàm thêm hoặc sửa sp
    const onFinish = async (values) => {
        // console.log(values);

        // nếu có thông tin về sản phẩm cần sửa thì sẽ sửa
        if (productUpdate) {
            // lưu thông tin product 
            let newProduct
            // nếu cập nhật prodcut mà có ảnh thì
            if (fileImage) {
                // gửi ảnh lên firebase rồi lấy lại link
                const imageRef = ref(storage, `image/${fileImage.name}`)
                await uploadBytes(imageRef, fileImage);
                const url = await getDownloadURL(imageRef);

                // nếu gửi lên thành công
                if (url) {
                    // thêm thông tin để chuyển đi update
                    // lấy thông tin mới và link ảnh mới
                    newProduct = {
                        ...values,
                        image: url
                    }
                } else {
                    message.error('Upload Image Failed!')
                }
            } else {
                // sửa sản phẩm và không cập nhật ảnh
                // lấy thông tin mới và giữ lại ảnh cũ
                newProduct = {
                    ...values,
                    image: productUpdate.image
                }
            }
            // gửi dữ liệu lên db
            const result = await axios.put(`http://localhost:8080/api/v1/products/${productUpdate.productId}`, newProduct)
            if (result.status == 200) {
                message.success("Sửa thành công")
                form.resetFields() // xoá thông tin nhập nơi form
                setFileImage() // xoá thông tin về ảnh đã chọn
                await getProducts() // lấy thông tin sản phẩm để vẽ lại
            } else {
                message.error('Sửa thất bại')
            }

            return
        }

        // đây là khi thêm sản phẩm
        // nếu đã chọn ảnh
        if (fileImage) {
            // đưa ảnh lên firebase rồi lấy link
            const imageRef = ref(storage, `image/${fileImage.name}`)
            await uploadBytes(imageRef, fileImage);
            const url = await getDownloadURL(imageRef);

            if (url) {
                // lấy thông tin mới nhập và link ảnh
                const newProduct = {
                    ...values,
                    image: url
                }
                // gửi thông tin lên db
                const result = await axios.post("http://localhost:8080/api/v1/products", newProduct)
                if (result.status == 201) {
                    message.success("Thêm mới thành công")
                    form.resetFields()
                    setFileImage()
                    await getProducts()
                } else {
                    message.error('Thêm mới thất bại')
                }
            } else {
                message.error('Upload Image Failed!')
            }
        } else {
            message.error("Chọn ảnh")
        }
    };

    // xoá sp
    const handleOkeDelete = async (id) => {
        const result = await axios.delete(`http://localhost:8080/api/v1/products/${id}`)
        if (result.status == 200) {
            message.success(result.data.message)
            getProducts()
        } else {
            message.error(result.data.message)
        }
    }

    // khi click nút edit
    const handleClickEdit = (product) => {
        // console.log(product);
        // đẩy thông tin của sp lên form
        form.setFieldsValue({
            ...product
        });
        // lưu thông tin của sp cần sửa lại
        setProductUpdate(product)
        // mở form
        setIsModalOpen(true)
    }

    // gọi lại data khi searh
    const handleClickSearch = async (value) => {
        console.log(value);
        const result = await axios.get(`http://localhost:8080/api/v1/products/search?nameProduct=${value}`)
        console.log(result);
        setProducts(result.data)
    }
    return (
        <>
            {
                isModalOpen &&
                <Modal
                    maskClosable={false}
                    width={800}
                    title="Info Product"
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    footer={<></>}
                >
                    <Form
                        name="basic"
                        form={form}
                        labelCol={{
                            span: 4,
                        }}
                        wrapperCol={{
                            span: 20,
                        }}
                        style={{
                            maxWidth: 800,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="category"
                            name="categoryId"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your category!',
                                },
                            ]}
                        >
                            <Select
                                defaultValue={1}

                                style={{
                                    width: 220,
                                }}
                                onChange={handleChangeCategory}
                                options={categories.map((item) => {
                                    return { value: item.categoryId, label: item.nameCategory };
                                })}
                            />
                        </Form.Item>

                        <Form.Item
                            label="nameProduct"
                            name="nameProduct"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your nameProduct!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="price"
                            name="price"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your price!',
                                },
                            ]}
                        >
                            <Input type='number' />
                        </Form.Item>

                        <Form.Item
                            label="stock"
                            name="stock"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your stock!',
                                },
                            ]}
                        >
                            <Input type='number' />
                        </Form.Item>

                        <Form.Item
                            label="description"
                            name="description"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your description!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="image"
                            name="image"
                            htmlFor='file-image'
                        >
                            <Input id='file-image' type='file' style={{ display: "none" }} onChange={handleChangeImage} />
                            <Image src={productUpdate?.id ? productUpdate.image : fileImage ? URL.createObjectURL(fileImage) : ""} alt='image' width={100} />

                        </Form.Item>


                        <Form.Item
                            wrapperCol={{
                                offset: 12,
                                span: 12,
                            }}
                        >
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            }
            <div className="row">
                <div className="col-12">
                    <div className="page-title-box">
                        <h4 className="page-title" style={{ fontSize: 50 }}>Quản lí sản phẩm</h4>
                    </div>
                    <div style={{display:"flex",justifyContent:"space-between", marginBottom:"20px"}}>
                        <div>
                            <Button style={{ minWidth: 100 }} onClick={showModal}>Add</Button>
                        </div>
                        <div>
                            <Space direction="vertical">
                                <Search
                                    placeholder="input search text"
                                    allowClear
                                    // enterButton="search"
                                    // value={search}
                                    size="large"
                                    onSearch={handleClickSearch}
                                />
                            </Space>
                        </div>
                    </div>

                    <Table style={{ marginBottom: "20px" }} dataSource={products} columns={renderColumns(handleOkeDelete, handleClickEdit)} />
                    {/* <button onclick="searchButton()">Search</button> */}
                    {/* <table id="tableSearch" /> */}
                    {/* <div className="product">
                    <div className="crud">
                        <h3>Thông tin sản phẩm</h3>
                        <table style={{ fontSize: 20, color: '#000000' }}>
                            <tbody><tr>
                                <td style={{ paddingBottom: 20 }}>Loại sản phẩm</td>
                                <td style={{ paddingBottom: 20 }}>
                                    <select
                                        name="category"
                                        // value={newProduct.categoryId}
                                        onChange={handleInputChange}
                                    >
                                        <option value={0} disabled selected>Chọn loại sản phẩm</option>
                                        {category.map((item, index) => (
                                            <option key={index} value={item.id}>{item.category_name}</option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                                <tr>
                                    <td style={{ paddingBottom: 20 }}>Tên sản phẩm</td>
                                    <td style={{ paddingBottom: 20 }}>
                                        <input
                                            type="text"
                                            style={{ outline: 'none' }}
                                            // value={newProduct.name}
                                            name='name'
                                            onChange={handleInputChange}

                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ paddingBottom: 20 }}>
                                        <label htmlFor="imgProduct">Ảnh sản phẩm</label>
                                    </td>
                                    <td style={{ paddingBottom: 20 }}>
                                        <input
                                            type="file"
                                            style={{ outline: 'none' }}
                                            hidden
                                            name='image'
                                            // value={newProduct.image}
                                            onChange={changeImage}

                                        />
                                        <img src={""} alt="img" width="100px" height="100px" style={{ backgroundSize: 'cover' }} />
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ paddingBottom: 20 }}>Giá sản phẩm</td>
                                    <td style={{ paddingBottom: 20 }}>
                                        <input
                                            type="text"
                                            style={{ outline: 'none' }}
                                            // value={newProduct.price}
                                            name='price'
                                            onChange={handleInputChange}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ paddingBottom: 20 }}>Số lượng</td>
                                    <td style={{ paddingBottom: 20 }}>
                                        <input
                                            type="text"
                                            style={{ outline: 'none' }}
                                            // value={newProduct.quantity}
                                            name='quantity'
                                            onChange={handleInputChange}
                                        />
                                    </td>
                                </tr>
                            </tbody></table>
                        <div className="buttonSave">
                            <button onClick={true ? handleEdit : handleAddProduct}>
                                {true ? "Edit" : "Add"}
                            </button>
                        </div>
                    </div>
                    <div className="productAdded">
                        <h3>Sản phẩm đã được thêm</h3>
                        <table id="tableAdded" style={{ textAlign: 'center', fontSize: 20 }}>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Ảnh</th>
                                    <th>Tên Sản Phẩm</th>
                                    <th>Loại sản phẩm</th>
                                    <th>Giá</th>
                                    <th>Số Lượng</th>
                                    <th>Tính năng</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((product) => (
                                    <tr key={product.id}>
                                        <td>{product.id}</td>
                                        <td>
                                            <img src={product.image} alt="img" width={100} />
                                        </td>
                                        <td>{product.name}</td>
                                        <td>{product.category_id}</td>
                                        <td>{product.price}</td>
                                        <td>{product.stock}</td>
                                        <td>
                                            <button>Edit</button>
                                            <button>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div> */}
                </div>
            </div>
        </>
    )
}
