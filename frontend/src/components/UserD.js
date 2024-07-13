import React from 'react';
import '../index.css';
import { Link } from 'react-router-dom';
import NavbarLogin from './NavbarLogin'
import Footer from './Footer'
const UserD = () => {
    let crn = localStorage.getItem("crn");
    return (
        <>
            <div className="container">
                <NavbarLogin crn={crn} txt="CRN" />
                <div className="container flex align-items-center text-white py-5" style={{ backgroundColor: "#168aad" }} >

                    <div className="col-lg-10 ">
                        <h1 className="display-5 fw-bold text-white-emphasis lh-1 mb-3">Submit Your Research paper...</h1>
                        <p className="lead ">Don't miss the opportunity to be part of an enriching and intellectually stimulating conference experience</p>
                        <p className="lead">Submit your research paper today and your place on the global stage of academic excellence</p>
                        <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                            <Link type="button" to={"/user/applyconferences"} className="btn btn-light fw-bolder btn-lg px-4 me-md-2 " style={{ boxShadow: "rgba(0,0,0,0.4) 0px 2px 4px ,rgba(0,0,0,0.3) 0px 7px 13px -3px,rgba(0,0,0,0.2) 0px -3px 0px inset" }}>Apply</Link>
                            <Link type="button" to={"/user/checkstatus"} className="btn btn-light fw-bolder btn-lg px-4 me-md-2 " style={{ boxShadow: "rgba(0,0,0,0.4) 0px 2px 4px ,rgba(0,0,0,0.3) 0px 7px 13px -3px,rgba(0,0,0,0.2) 0px -3px 0px inset" }}>Check Status</Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}



export default UserD;