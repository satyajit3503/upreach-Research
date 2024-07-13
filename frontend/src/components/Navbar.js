import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navigate, useNavigate } from 'react-router-dom';
import {  isLoggedIn } from '../auth.js/authentication';

const Navbar = () => {

    const navigate = useNavigate();

    const [login, setLogin] = useState(false);
    const [user, setUser] = useState(undefined);

    useEffect(() => {

        setLogin(isLoggedIn())
        // setUser(getCurrentUserDetail())
    }, [login])

    // const handleLogin = () => {
    //     if (localStorage.getItem("crn")) {
    //         setIsLoggedIn(true);
    //     }
    // };

    const handleLogout = () => {
        setLogin(false);
        localStorage.clear();
        navigate('/');
        console.log("logout clicked...")
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg  py-2" style={{ backgroundColor: "#168aad" }}>
                <div className="container-fluid ">
                    <Link className="navbar-toggler" type="Link" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </Link>
                    <div className='col-2'>
                        <h2 className='lead fw-bolder fs-5 text-light' style={{ textShadow: "-1px -1px 1px #111, 2px 2px 1px #363636" }}>Upreach-Research</h2>
                    </div>
                    <div className="collapse d-flex justify-content-between navbar-collapse" id="navbarTogglerDemo03">
                        <form className="d-flex justify-content-evenly w-100" role="search">
                            <input className="form-control  w-50" type="search" placeholder="Search" aria-label="Search" style={{ boxShadow: " rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset " }} />


                            {login && (

                                <div className="col-2 d-flex  ">
                                    <Link to="/profile" className="nav-link d-flex flex-column justify-content-center align-items-center text-white mx-4"><i className="fa-solid fa-user "></i>Profile</Link>
                                    <button  className="text-dark text-decoration-none btn btn-light" id="login" style={{ boxShadow: " rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset" }} onClick={handleLogout}>Logout</button>
                                </div>
                            )}
                            {!login && (

                                <div className="col-1 d-flex  ">
                                    <Link to={"/register"} type="Link" className="text-dark text-decoration-none btn btn-light " style={{ margin: "0px 10px 0px 10px", align: "right", boxShadow: " rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset" }} id="register">Register</Link>
                                    <Link to={"/login"} type="Link" className="text-dark text-decoration-none btn btn-light " id="login" style={{ boxShadow: " rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset" }} >Login</Link>
                                </div>
                            )}

                        </form>
                    </div>
                </div>
            </nav>

            <nav className="navbar navbar-expand py-0 px-4 border-top" style={{ backgroundColor: "#168aad" }} >
                <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                    <ul className="navbar-nav " >
                        <li className="nav-item">
                            <Link className="nav-link active text-light " aria-current="page" to={"/books"} >Books</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active text-light" aria-current="page" to={"/conferences"}>Conferences</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active text-light" to={"/journals"} >Journals</Link>
                        </li>
                    </ul>
                </div>
            </nav>

        </>
    );
};

export default Navbar;