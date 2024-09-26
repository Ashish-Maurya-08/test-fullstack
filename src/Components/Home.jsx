import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getUser, checkUser } from './localStorage';

const Home = () => {

    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!checkUser()) {
            navigate('/login');
        }
        else {
            setUser(getUser());
            navigate('/dashboard');
        }
    }, []);

    return (
        <>
        </>
    )
}

export default Home;