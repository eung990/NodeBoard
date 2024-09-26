import React, { useEffect, useState } from 'react';
import { Layout, Table, Button, Typography, Space, message, Pagination } from 'antd';
import { DeleteOutlined, BulbOutlined } from '@ant-design/icons';
import './Sections/AdminPage.css';
import axios from 'axios';

const { Header, Content } = Layout;
const { Title } = Typography;

function AdminPage() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async (page = 1) => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/users/findAllUsers?page=${page}&limit=5`);
      if (res.data.success) {
        setUsers(res.data.users);
        setTotalPages(res.data.totalPages);
        setCurrentPage(res.data.currentPage);
      } else {
        message.error('사용자 정보를 불러오는데 실패했습니다.');
      }
    } catch (error) {
      message.error('서버 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);


  const handleDelete = async (userId) => {
    try {
      // 실제 삭제 API 호출
      console.log('====userId: ', userId)
      await axios.delete(`/api/users/deleteUser?userId=${userId}`);
      setUsers(users.filter(user => user._id !== userId));
      message.success('사용자가 삭제되었습니다.');
    } catch (error) {
      message.error('사용자 삭제에 실패했습니다.');
    }
  };

  const handlePageChange = (page) => {
    fetchUsers(page);
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
    },
    {
      title: '작업',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          {/* <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record.key)}
            className="edit-button"
          >
            수정
          </Button> */}
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
          dataSource={users.map(user => ({
            key: user._id,
            name: user.userName,
            email: user.email,
            createdAt: new Date(user.createdAt).toLocaleDateString(),
          }))}
          pagination={false}
          loading={loading}
        />
        <Pagination
          current={currentPage}
          total={totalPages * 5}
          pageSize={5}
          onChange={handlePageChange}
          showSizeChanger={false}
          showQuickJumper
          showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
        />
      </Content>
    </Layout>
  );
}

export default AdminPage;