import React, { useState, useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';
// import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from 'react-router-dom';
import userImage from '../../assets/images/profile1.jpg';

const MainHeader: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/member-login');
  };

  const handleNavigation = (path: string) => {
    console.log(isLoggedIn);
    if (!isLoggedIn && path === '/MemberCenter') {
      alert('您還沒有登入，請先登入！');
      navigate('/member-login');
    } else {
      navigate(path);
    }
  };
  return (
    <Dropdown as='li' className='nav-item dropdown profile-dropdown ms-4'>
      <Dropdown.Toggle as='a' className='nav-link' id='dropdown-profile'>
        <img src={userImage} alt='Profile' />
        <div className='profile-info'>
          <h6 className='title'>Brian</h6>
          <span>info@gmail.com</span>
        </div>
      </Dropdown.Toggle>

      <Dropdown.Menu className='dropdown-menu-end'>
        <Dropdown.Header>
          <h6>Brian</h6>
          <span>info@gmail.com</span>
        </Dropdown.Header>
        <Dropdown.Item onClick={() => handleNavigation('/MemberCenter')}>
          會員中心
        </Dropdown.Item>
        <Dropdown.Item href='shop-cart.html'>My Order</Dropdown.Item>
        <Dropdown.Item href='wishlist.html'>Wishlist</Dropdown.Item>
        <Dropdown.Divider />
        {isLoggedIn ? (
          <Dropdown.Item onClick={handleLogout}>Log Out</Dropdown.Item>
        ) : (
          <Dropdown.Item href='member-login'>Log In</Dropdown.Item>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default MainHeader;
