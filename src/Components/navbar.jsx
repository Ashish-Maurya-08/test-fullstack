import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { getUser, removeUser } from './localStorage';
import './common.css';

const Navbar = ({children}) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        removeUser();
        navigate('/');
    }
    const user = getUser();

    return (
        <div>
        <div className='navbar'>
            <div className='nav_links'>
                <Link to='/'>Home</Link>
                <Link to='/employeeList'>Employee List</Link>
            </div>
            <div className='nav_links'>
                <Link to='/dashboard'>{user}</Link>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
        {children}
        </div>
    )
};

export default Navbar;