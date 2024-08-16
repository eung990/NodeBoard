import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Drawer, Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import './Sections/NavBar.css';
import axios from 'axios';
import { useSelector } from 'react-redux';

function NavBar() {
  const [visible, setVisible] = useState(false);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  // useEffect(() => {
  //   console.log(user);
  // }, [user]);

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

  const isAuthenticated = user.authSuccess?.data?.isAuth;
  const isAdmin = user.authSuccess?.data?.role === 'admin';

  const renderMenuItems = () => (
    <>
      <Link to="/" onClick={onClose}>Home</Link>
      {!isAuthenticated && (
        <>
          <Link to="/login" onClick={onClose}>Login</Link>
          <Link to="/signUp" onClick={onClose}>Sign Up</Link>
        </>
      )}
      {isAuthenticated && (
        <>
          <Link to="/product/upload" onClick={onClose}>Upload</Link>
          <Link onClick={onLogoutHandler}>Logout</Link>
        </>
      )}
      {isAdmin && <Link to="/admin" onClick={onClose}>Admin</Link>}
    </>
  );

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Home</Link>
      </div>
      <div className="navbar-menu">
        <div className="navbar-menu-desktop">
          {renderMenuItems()}
        </div>
        <Button className="navbar-menu-mobile" onClick={showDrawer}>
          <MenuOutlined />
        </Button>
        <Drawer
          title="Menu"
          placement="right"
          closable={false}
          onClose={onClose}
          open={visible}
        >
          {renderMenuItems()}
        </Drawer>
      </div>
    </nav>
  );
}

export default NavBar;