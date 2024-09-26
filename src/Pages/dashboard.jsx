import React, { useEffect } from 'react'
import Navbar from '../Components/navbar';
import { useNavigate } from 'react-router-dom';
import { checkUser } from '../Components/localStorage';

const DashBoard = () => {

  // state variables
  const navigate = useNavigate();
  

  // check if user is logged in
  useEffect(() => {
    if (!checkUser()) {
      navigate('/login');
    }
  }, []);

  
  return (
    <Navbar>
    <div className='content'>Welcome to DashBoard</div>
    </Navbar>
  )
}

export default DashBoard;