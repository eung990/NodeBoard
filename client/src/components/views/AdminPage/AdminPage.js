import React, { useEffect, useState } from 'react';
import { Layout, Table, Button, Typography, Space, message } from 'antd';
import { EditOutlined, DeleteOutlined, BulbOutlined } from '@ant-design/icons';
import './Sections/AdminPage.css';
import axios from 'axios';

const { Header, Content } = Layout;
const { Title } = Typography;

function AdminPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('/api/users/findAllUsers')
    .then(res => {
      if(res.data.success) {
        console.log(res.data.users);
        setUsers(res.data.users);
      } else {
        message.error('사용자 정보를 불러오는데 실패했습니다.');
      }
    })
  }, []) // 빈 배열을 넣어 마운트 시에만 실행되도록 수정

  const handleEdit = (userId) => {
    message.info(`사용자 ID ${userId}의 정보를 수정합니다.`);
  };

  const handleDelete = (userId) => {
    setUsers(users.filter(user => user._id !== userId));
    message.success('사용자가 삭제되었습니다.');
  };

  const usersList = users.map((user) => ({
    key: user._id,
    name: user.userName,
    email: user.email,
    createdAt: new Date(user.createdAt).toLocaleDateString(),
  }));

  const columns = [
    {
      title: '이름',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '이메일',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '가입일',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: '작업',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record.key)}
            className="edit-button"
          >
            수정
          </Button>
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.key)}
            className="delete-button"
          >
            삭제
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Layout className="admin-layout">
      <Header className="admin-header">
        <Title level={3} style={{ color: 'white', margin: 0 }}>
          <BulbOutlined /> 관리자 페이지
        </Title>
      </Header>
      <Content className="admin-content">
        <Title level={4}>회원 목록</Title>
        <Table
          columns={columns}
          dataSource={usersList}
          rowKey="key"
        />
      </Content>
    </Layout>
  );
}

export default AdminPage;
