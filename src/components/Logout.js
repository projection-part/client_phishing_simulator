import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <button onClick={handleLogout} style={{ padding: '10px 20px', backgroundColor: '#E3EEFA', color: '#707070', border: 'none', borderRadius: '5px', fontSize:20 }}>
            Logout
        </button>
    );
};

export default Logout;
