import React from 'react';
import css from './navbar.module.css';
import Logo from '../../shared/img/logo.png';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
    background: #fff;
`;
const Navbar = () => {
    return (
        <Nav className={css.nav}>
            <div className={css.logo}>
                <Link to="/">
                    <img src={Logo} alt="Madi and Aaron Logo" />
                </Link>
            </div>
        </Nav>
    );
};

export default Navbar;
