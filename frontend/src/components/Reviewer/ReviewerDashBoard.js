import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';
import axios from 'axios';
const ReviewerDashBoard = () => {
    const crn = localStorage.getItem("crn");

    const [data, setData] = useState([]);

    useEffect(() => {
        axios.post('http://localhost:5000/reviewerdashboard',{crn})
            .then((res) => setData(res.data.applicantData))
    }, []);
    return (
        <>
            <Navbar  />
            <div className="container-fluid  border d-flex align-items-center p-3" style={{ backgroundColor: "#caf0f8" }}>
                <div className="col-lg-10 " >

                    <h4 className=' w-25 text-center'>Reviewer Ref. no.</h4>
                    <p className="lead bg-light w-25 text-center">{crn}</p>
                </div>
            </div>

            <div className='contaner p-5 mt-1' style={{ backgroundColor: "#caf0f8", height: "100vh" }}>
                <table className="table table-striped " style={{ boxShadow: "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px" }}>
                    <thead>
                        <tr>
                            <th scope="col">Date</th>
                            <th scope="col">CRN</th>
                            <th scope="col">ARN</th>
                            <th scope="col">Title</th>
                            <th scope="col">Domain</th>
                            <th scope="col">Peer Screening</th>
                            <th scope="col">Camera Screening</th>
                            <th scope="col">Presentation screening</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => {
                            return (
                                <tr key={item._id}>
                                    <td>{item.date.toLocaleString()}</td>
                                    <td>{item.crn}</td>
                                    <td>{item.application_no}</td>
                                    <td>{item.title}</td>
                                    <td>{item.domain}</td>
                                    <td><Link to="/reviewerdashboard/reviewerscreening/reviewerpeer" onClick={(e)=>localStorage.setItem("arn",item.application_no)} >Review</Link></td>
                                    <td><Link to="/reviewerdashboard/reviewerscreening/reviewercamera" onClick={(e)=>localStorage.setItem("arn",item.application_no)}>Review</Link></td>
                                    <td><Link to="/reviewerdashboard/reviewerscreening/reviewerpresentation" onClick={(e)=>localStorage.setItem("arn",item.application_no)}>Review</Link></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>


            </div>

        </>

    );
}

export default ReviewerDashBoard;
