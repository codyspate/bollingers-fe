import React from 'react';
import css from './navbar.module.css';
import Logo from '../../shared/img/logo.png';

const Navbar = () => {
    return (
        <nav className={css.nav}>
            <div className={css.logo}>
                <img src={Logo} alt="Madi and Aaron Logo" />
            </div>
        </nav>
    );
};

export default Navbar;
