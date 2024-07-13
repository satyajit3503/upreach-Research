import React, { useEffect, useState } from 'react'
import '../index.css';
import NavbarLogin from './NavbarLogin';
import axios from 'axios';
const baseurl = 'http://localhost:5000'

const CheckStatus = () => {

    const [data, setData] = useState([]);
    let crn = localStorage.getItem('crn');

    useEffect(() => {
        axios.post('http://localhost:5000/user/checkstatus', { crn })
            .then((res) => setData(res.data))
    }, []);




    return (
        <div className='table-container'>

            <NavbarLogin crn={crn} txt="CRN" />

            <table className="table table-success table-striped" style={{ boxShadow: "rgba(0,0,0.19) 0px 10px 20px,rgba(0,0,0,0.23) 0px 6px 6px" }}>

                <thead >
                    <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Application no</th>
                        <th scope="col">Title</th>
                        <th scope="col">Domain</th>
                        <th scope="col">Peer Screening</th>
                        <th scope="col">Camera Screening </th>
                        <th scope="col">Presentation Screening</th>
                        <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => {
                        let peer = "pending";
                        let camera = "pending";
                        let present = "pending";

                        if (item.status === 0) {
                            peer = "Ongoing";
                        } else if (item.status === 1) {
                            peer = "Recommended";
                            camera = "Ongoing";
                        } else if (item.status === 2) {
                            peer = "Recommended";
                            camera = "Recommended";
                            present = "Ongoing";
                        } else if (item.status === 3 || item.status === 4) {
                            peer = "Recommended";
                            camera = "Recommended";
                            present = "Recommended";
                        } else {
                            peer = "Rejected";
                            camera = "Rejected";
                            present = "Rejected";
                        }
                        return (
                            <tr key={item._id}>
                                <td>{item.date}</td>
                                <td>{item.application_no}</td>
                                <td>{item.title}</td>
                                <td>{item.domain}</td>
                                <td>{peer}</td>
                                <td>{camera}</td>
                                <td>{present}</td>
                                <th scope="row">
                                    {item.status === 4 ? (
                                        <div className="spinner-grow text-success" role="status">
                                            {/* <span className="visually-hidden">Loading...</span> */}
                                        </div>
                                    ) : item.status === -1 ? (
                                        <div className="spinner-grow text-danger" role="status">
                                            {/* <span className="visually-hidden">Loading...</span> */}
                                        </div>
                                    ) : (
                                        <div className="spinner-grow text-warning d-block" role="status">
                                        </div> 
                                    )}

                                </th>
                            </tr>
                        );
                    })}
                </tbody>

            </table>
        </div>

    )
}

export default CheckStatus;