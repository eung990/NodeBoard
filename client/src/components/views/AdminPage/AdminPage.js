import React, { useEffect, useState } from 'react';
import { Layout, Table, Button, Typography, Space, message } from 'antd';
import { EditOutlined, DeleteOutlined, BulbOutlined } from '@ant-design/icons';
import './Sections/AdminPage.css';
import axios from 'axios';

const { Header, Content } = Layout;
const { Title } = Typography;

// 더미 데이터
const dummyUsers = [
  { _id: '1', name: '김철수', email: 'chulsoo@example.com', createdAt: '2023-01-15T09:00:00.000Z' },
  { _id: '2', name: '이영희', email: 'younghee@example.com', createdAt: '2023-02-20T10:30:00.000Z' },
  { _id: '3', name: '박민준', email: 'minjun@example.com', createdAt: '2023-03-10T14:15:00.000Z' },
  { _id: '4', name: '정수연', email: 'suyeon@example.com', createdAt: '2023-04-05T11:45:00.000Z' },
  { _id: '5', name: '강지원', email: 'jiwon@example.com', createdAt: '2023-05-22T16:20:00.000Z' },
];

function AdminPage() {
  const [users, setUsers] = useState(dummyUsers);


  useEffect(() => {
    axios.get('/api/users/findUsers')
    .then(res => {

    })
  })
  const handleEdit = (userId) => {
    message.info(`사용자 ID ${userId}의 정보를 수정합니다.`);
  };

  const handleDelete = (userId) => {
    setUsers(users.filter(user => user._id !== userId));
    message.success('사용자가 삭제되었습니다.');
  };

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
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: '작업',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record._id)}
            className="edit-button"
          >
            수정
          </Button>
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record._id)}
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
          dataSource={users}
          rowKey="_id"
        />
      </Content>
    </Layout>
  );
}

export default AdminPage;