import { React, useState, useEffect } from 'react';
import Navbar from '../Navbar';
import axios from 'axios';
import { toast } from 'react-toastify';




const PublishedPaper = () => {

    const [conferenceData, setConferenceData] = useState([]);
    const [publisherdata, setPublisherData] = useState('');

    const publisher_crn = localStorage.getItem("crn")
    const application_no = localStorage.getItem("crn")

    useEffect(() => {
        axios.post('http://localhost:5000/publishpaper', application_no)
            .then((res) => {
                if (res) {
                    setConferenceData(res.data.conferenceResult);
                    setPublisherData(res.data.publisherResult);
                    // console.log(res.data.conferenceResult)
                    // console.log(res.data.publisherResult)
                }
                else{
                    toast.error("oops! no data found")
                }
            })
    }, []);

    return (
        <>
            <Navbar />
            <div className="container-fluid mt-1 p-4 d-flex align-items-center" style={{ backgroundColor: "#caf0f8" }}>
                <div className="container d-flex flex-column">
                    <h1>view published papers here ... </h1>

                </div>
            </div>

            <div className='contaner-fluid p-5 mt-1' style={{ backgroundColor: "#caf0f8", height: "100vh" }} >

                <table className="table table-striped " style={{ boxShadow: "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px" }}>


                    <thead>
                        <tr>
                            <th scope="col">PBRN</th>
                            <th scope="col">Author</th>
                            <th scope="col">ARN</th>
                            <th scope="col">CRN</th>
                            <th scope="col">Paper Name</th>
                            <th scope="col">Submission date</th>
                            <th scope="col">Published date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {conferenceData && conferenceData.map((iteam, key) => {
                            return (
                                <tr key={iteam.application_no}>
                                    <td>{publisher_crn}</td>
                                    <td>{iteam.author}</td>
                                    <td>{iteam.application_no}</td>
                                    <td>{iteam.crn}</td>
                                    <td>{iteam.title}</td>
                                    <td>{iteam.date}</td>
                                    <td>{publisherdata[key].date}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
}


export default PublishedPaper;