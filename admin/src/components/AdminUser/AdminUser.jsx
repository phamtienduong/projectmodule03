import React, { useEffect, useState } from "react";
import { Table, Button } from "antd";
import axios from "axios";

const renderColumns = (handleChangeActive) => [
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Tên Người Dùng",
    dataIndex: "userName",
    key: "userName",
  },
  {
    title: "Số Điện Thoại",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Trạng Thái",
    dataIndex: "status",
    key: "status",
    render: (status) => (
      <>
        <span>{status == 0 ? "Active" : "Ban"}</span>
      </>
    ),
  },
  {
    title: "Tính năng",
    render: (_, user) => (
      <>
        <Button onClick={() => handleChangeActive(user)}>
          {user.status == 0 ? "Ban" : "Active"}
        </Button>
      </>
    ),
  },
];
export default function AdminUser() {
  const [listUser, setListUser] = useState([]);

  const getUser = async () => {
    const token = localStorage.getItem("admin_token");
    // console.log(token);
    try {
      const response = await axios.get("http://localhost:8080/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(response.data);
      if (response.data.users.length != 0)  {
        setListUser(response.data.users)
      }
    } catch (error) {
      console.log(error);
    }

    // setListUser(response.data)
  };

  const handleChangeActive = async (user) => {
    const token = localStorage.getItem("admin_token");
    await axios.patch(`http://localhost:8080/api/users/status`, {
      id: user.userId,
      status: (1 - user.status)
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    getUser();
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <div>
      <div className="col-12">
        <div className="page-title-box">
          <h4 className="page-title" style={{ fontSize: 50 }}>
            Quản lý người dùng
          </h4>
        </div>
      </div>
      <Table
        dataSource={listUser}
        columns={renderColumns(handleChangeActive)}
      />
    </div>
  );
}
