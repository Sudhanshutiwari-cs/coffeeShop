import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../Store/authSlice';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const NavbarContainer = styled(motion.nav)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: linear-gradient(90deg, rgba(26,26,26,1) 0%, rgba(34,34,34,1) 50%, rgba(26,26,26,1) 100%);
  color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
`;

const Logo = styled(motion.div)`
  font-size: 2rem;
  font-weight: bold;
  color: #ff6347; /* Tomato color */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  transition: color 0.3s, transform 0.3s;

  &:hover {
    color: #ffa07a; /* Light Salmon color */
    transform: scale(1.1);
  }
`;

const NavLinks = styled(motion.div)`
  display: flex;
  gap: 1.5rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(motion.div)`
  color: #fff;
  text-decoration: none;
  font-size: 1.1rem;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #ff6347; /* Tomato color */
    color: #fff;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;

const MobileMenuButton = styled(motion.button)`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #fff;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 60px;
  left: 0;
  right: 0;
  background-color: #1a1a1a;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const MobileNavLink = styled(motion.div)`
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
  color: #fff;
  &:last-child {
    border-bottom: none;
  }
  &:hover {
    color: #ff6347; /* Tomato color */
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <NavbarContainer
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Logo
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Link to="/">MsCafe</Link>
        </Logo>
        <NavLinks>
          <NavLink whileHover={{ scale: 1.1 }}>
            <Link to="/">Home</Link>
          </NavLink>
          <NavLink whileHover={{ scale: 1.1 }}>
            <Link to="/shop">Shop</Link>
          </NavLink>
          <NavLink whileHover={{ scale: 1.1 }}>
            <Link to="/about">About</Link>
          </NavLink>
          <NavLink whileHover={{ scale: 1.1 }}>
            <Link to="/contact">Contact</Link>
          </NavLink>
          {isLoggedIn ? (
            <>
              <NavLink whileHover={{ scale: 1.1 }}>
                <Link to="/profile">Profile</Link>
              </NavLink>
              <NavLink whileHover={{ scale: 1.1 }}>
                <Link to="/cart">Cart</Link>
              </NavLink>
              <NavLink whileHover={{ scale: 1.1 }} onClick={handleLogout}>
                Logout
              </NavLink>
            </>
          ) : (
            <NavLink whileHover={{ scale: 1.1 }}>
              <Link to="/login">Login</Link>
            </NavLink>
          )}
        </NavLinks>
        <MobileMenuButton
          onClick={toggleMenu}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          ☰
        </MobileMenuButton>
      </NavbarContainer>
      <AnimatePresence>
        {isOpen && (
          <MobileMenu
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <MobileNavLink whileHover={{ scale: 1.05 }}>
              <Link to="/" onClick={toggleMenu}>Home</Link>
            </MobileNavLink>
            <MobileNavLink whileHover={{ scale: 1.05 }}>
              <Link to="/shop" onClick={toggleMenu}>Shop</Link>
            </MobileNavLink>
            <MobileNavLink whileHover={{ scale: 1.05 }}>
              <Link to="/about" onClick={toggleMenu}>About</Link>
            </MobileNavLink>
            <MobileNavLink whileHover={{ scale: 1.05 }}>
              <Link to="/contact" onClick={toggleMenu}>Contact</Link>
            </MobileNavLink>
            {isLoggedIn ? (
              <>
                <MobileNavLink whileHover={{ scale: 1.05 }}>
                  <Link to="/profile" onClick={toggleMenu}>Profile</Link>
                </MobileNavLink>
                <MobileNavLink whileHover={{ scale: 1.05 }}>
                  <Link to="/cart" onClick={toggleMenu}>Cart</Link>
                </MobileNavLink>
                <MobileNavLink whileHover={{ scale: 1.05 }} onClick={() => { handleLogout(); toggleMenu(); }}>
                  Logout
                </MobileNavLink>
              </>
            ) : (
              <MobileNavLink whileHover={{ scale: 1.05 }}>
                <Link to="/login" onClick={toggleMenu}>Login</Link>
              </MobileNavLink>
            )}
          </MobileMenu>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;