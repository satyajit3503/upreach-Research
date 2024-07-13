import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom';

const NavbarLogin = (props) => {

    const navigate = useNavigate();

    const logOut = () => {

        localStorage.clear();
        navigate('/')

    }

    return (
        <>
            <div className="container-fluid my-2  border d-flex align-items-center p-3 " style={{ backgroundColor: "#caf0f8" }}>
                <div className="col-lg-10 " >
                    <h1 className=' w-25 text-center'>{props.txt}</h1>
                    <p className="lead bg-light w-25 text-center">{props.crn}</p>
                </div>

                <button className='btn btn-lg h-25 btn-outline-dark' onClick={logOut}>logout</button>
            </div>
        </>
    )
}

export default NavbarLogin;

