
import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const SideNav = ({ showSidebar, toggleSidebar }) => {
    // Function to handle sidebar item click
    const handleSidebarItemClick = () => {
        // Hide the sidebar after clicking on an item
        if (showSidebar) {
            toggleSidebar();
        }
    };

    return (
        <div className={`sidenav ${showSidebar ? 'open' : ''}`}>

            <Link to="/" className="nav-link" style={{ paddingTop: '50px' }} onClick={handleSidebarItemClick}>الرئيسية</Link>
            <Link to="/All_Products" className="nav-link" onClick={handleSidebarItemClick}>المنتجات</Link>
            <Link to="/Categories" className="nav-link" onClick={handleSidebarItemClick}>الفئات</Link>
            <Link to="/offrs" className="nav-link" onClick={handleSidebarItemClick}>العروض</Link>
            <Link to="/order_tracking" className="nav-link" onClick={handleSidebarItemClick}>تتبع طلبك</Link>
            <Link to="/dashboard" className="nav-link" onClick={handleSidebarItemClick}>لوحة التحكم</Link>
        </div>
    );
};

export default SideNav;
