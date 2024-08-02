import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Drawer, Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import './Sections/NavBar.css';
import axios from 'axios';

function NavBar() {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  const onLogoutHandler = async () => {
    try {
        const res = await axios.get("/api/users/logout");
        if (res.data.success) {
            navigate("/login");
            console.log("로그아웃 완료");
        } else {
            console.log("로그아웃 실패");
        }
    } catch (error) {
        console.error("로그아웃 중 오류 발생", error);
    }
}
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Home</Link>
      </div>
      <div className="navbar-menu">
        <div className="navbar-menu-desktop">

          <Link to="/login">Login</Link>
          <Link to="/signUp">Sign Up</Link>
          <Link onClick={onLogoutHandler}>logout</Link>
          <Link to="/product/upload">Upload</Link>
          <Link to="/admin">Admin</Link>
        </div>
        <Button className="navbar-menu-mobile" onClick={showDrawer}>
          <MenuOutlined />
        </Button>
        <Drawer
          title="Menu"
          placement="right"
          closable={false}
          onClose={onClose}
          visible={visible}
        >
          <Link to="/" onClick={onClose}>Home</Link>
          <Link onClick={onLogoutHandler}>logout</Link>
          <Link to="/login" onClick={onClose}>Login</Link>
          <Link to="/signUp" onClick={onClose}>Sign Up</Link>
          <Link to="/product/upload" onClick={onClose}>Upload</Link>
          <Link to="/admin" onClick={onClose}>Admin</Link>
        </Drawer>
      </div>
    </nav>
  );
}

export default NavBar;