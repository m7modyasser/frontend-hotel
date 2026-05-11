import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const isAuthenticated = ApiService.isAuthenticated();
    const isAdmin = ApiService.isAdmin();
    const isUser = ApiService.isUser();
    const navigate = useNavigate();

    const handleLogout = () => {
        const isLogout = window.confirm('Are you sure you want to logout this user?');
        if (isLogout) {
            ApiService.logout();
            navigate('/home');
        }
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <NavLink to="/home">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--accent-brand)' }}>
                        <path d="M3 21h18"></path>
                        <path d="M5 21V7l8-4v18"></path>
                        <path d="M19 21V11l-6-3"></path>
                        <path d="M9 9v.01"></path>
                        <path d="M9 12v.01"></path>
                        <path d="M9 15v.01"></path>
                        <path d="M9 18v.01"></path>
                    </svg>
                    <span>Phegon Hotel</span>
                </NavLink>
            </div>
            
            <div className="menu-toggle" onClick={toggleMenu}>
                <span className={`bar ${isMenuOpen ? 'open' : ''}`}></span>
                <span className={`bar ${isMenuOpen ? 'open' : ''}`}></span>
                <span className={`bar ${isMenuOpen ? 'open' : ''}`}></span>
            </div>

            <ul className={`navbar-ul ${isMenuOpen ? 'show' : ''}`}>
                <li onClick={closeMenu}><NavLink to="/home" activeclassname="active">Home</NavLink></li>
                <li onClick={closeMenu}><NavLink to="/rooms" activeclassname="active">Rooms</NavLink></li>
                <li onClick={closeMenu}><NavLink to="/find-booking" activeclassname="active">Find Booking</NavLink></li>

                {isUser && <li onClick={closeMenu}><NavLink to="/profile" activeclassname="active">Profile</NavLink></li>}
                {isAdmin && <li onClick={closeMenu}><NavLink to="/admin" activeclassname="active">Dashboard</NavLink></li>}

                {!isAuthenticated && <li onClick={closeMenu}><NavLink to="/login" activeclassname="active">Sign In</NavLink></li>}
                {isAuthenticated && <li onClick={() => { closeMenu(); handleLogout(); }} style={{ cursor: 'pointer', fontSize: '14px', fontWeight: '500', color: 'var(--text-secondary)', padding: '8px 16px' }}>Sign Out</li>}
            </ul>
        </nav>
    );
}

export default Navbar;
