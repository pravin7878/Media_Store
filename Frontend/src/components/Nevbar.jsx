import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { logoutUser } from '../../redux/slices/authSlice';

// import { login, logout } from '../../redux/slices/authSlice';

const Navbar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isLogged , user} = useSelector(state => state.auth)


    const hedelLogin = () => {
        if (isLogged) {
            toast.success("you are already logned!")
        }
        else {
            navigate("/user/login")
        }
    }

    const hendelLogout = () => {
        dispatch(logoutUser())
    }

   
    return (
        <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">Media_Store</h1>
            {
                isLogged ?
                    <div className='flex gap-5 text-center items-center'>
                        {isLogged && <h3 className='font-bold text-xl'>Hi! {user?.user?.name}</h3>}
                        <button onClick={hendelLogout} className="bg-white text-blue-600 px-4 py-2 rounded font-bold">Logout</button>
                    </div>
                    :
                    <button onClick={hedelLogin} className="bg-white text-blue-600 px-4 py-2 rounded font-bold">login</button>
            }
        </nav>
    );
};

export default Navbar;
