import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import axios from "axios";
import { toast } from 'react-toastify';
import { Navigate, useNavigate } from "react-router-dom";

const ReviewerPresentation = () => {

    const reviewer_crn = localStorage.getItem("crn");
    const application_no = localStorage.getItem("arn");

    const [data, setData] = useState([]);

    const [comments, setComment] = useState('')
    const [marks, setMarks] = useState('');
    const [status, setStatus] = useState('');

    const navigate = useNavigate();

    let flag = false;


    useEffect(() => {
        axios.post('http://localhost:5000/peerapi', { application_no })
            .then((res) => {
                setData(res.data[0]);
                // console.log(res.data[0])
            })
    }, []);


    const validation = () => {
        let result = true;

        if (comments === '' || comments === null) {
            result = false;
            toast.error("please give comment");
        }
        else if (marks === '' || marks === null) {
            result = false;
            toast.error("enter marks");
        }
        else if (status === '' || status === null) {
            result = false;
            toast.error("select status");
        }
        return result;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validation()) {
            if (data.status < 3) {
                axios.post('http://localhost:5000/presentationapi/form', { application_no, comments, marks, reviewer_crn, status })
                    .then((res) => {
                        if (res.data === "success") {
                            toast.success("successful");
                            flag = true;
                            e.target.reset();
                            navigate('/reviewerdashboard')
                        }
                    })
            }
            else{
                toast.error("already reviewed");
                e.target.reset();
            }
        }
    }


    return (
        <>
            <Navbar />
            <div className="container d-flex my-5 p-0" style={{ height: "60vh" }} >
                <div className="container  w-50 d-flex align-items-center justify-content-evenly flex-column rounded p-2" style={{ backgroundColor: "#caf0f8" }}>

                    <h2 className="fw-bolder mb-3 text-center text-dark">Presentation screening</h2>
                    <h6>Click below link for start presentation screening meeting</h6>
                    <a href={`${data.link}`} target="_blank" > {data.link}</a>
                    <div className="container d-flex  ">
                        <div className="col fw-bolder">Author name</div>
                        <div className="col">{data.author}</div>
                    </div>
                    <div className="container d-flex  ">
                        <div className="col fw-bolder">Author email</div>
                        <div className="col">{data.email}</div>
                    </div>
                    <div className="container d-flex  ">
                        <div className="col fw-bolder">Phone number</div>
                        <div className="col">{data.phone}</div>
                    </div>
                    <div className="container d-flex ">
                        <div className="col fw-bolder">CRN</div>
                        <div className="col">{data.crn}</div>
                    </div>
                    <div className="container d-flex ">
                        <div className="col fw-bolder">Application Number</div>
                        <div className="col">{data.application_no}</div>
                    </div>
                    <div className="container d-flex ">
                        <div className="col fw-bolder">Title</div>
                        <div className="col">{data.title}</div>
                    </div>
                    <div className="container d-flex ">
                        <div className="col fw-bolder">Date</div>
                        <div className="col">{data.date}</div>
                    </div>
                    <div className="container d-flex ">
                        <div className="col fw-bolder">Status</div>
                        <div className="col">{data.status > 2 ? "Recommend" : data.status === -1 ? "Not Recommend" : "No Completed"}</div>
                    </div>
                    <div className="container d-flex ">
                        <div className="col ml-3 fw-bolder"><i className="fa-regular fa-file-lines fa-2x"></i></div>
                        <div className="col"><a href={`http://localhost:5000/uploads/${data.file}`} >View Paper</a></div>
                        {/* <img src={`http://localhost:5000/uploads/`+data.file} alt=""/> */}
                    </div>
                </div>



                <div className="container w-25 p-3 rounded" style={{ backgroundColor: "#caf0f8" }} >
                    <div className=" text-center  rounded-3" >
                        <form onSubmit={handleSubmit}>
                            <div className="form-floating my-3">
                                <textarea onChange={(e) => setComment(e.target.value)} className="form-control" placeholder="Leave a comment here" id="floatingTextarea"></textarea>
                                <label htmlFor="floatingTextarea">Comments</label>
                            </div>
                            <div className="form-floating my-3">
                                <input onChange={(e) => setMarks(e.target.value)} type="number" className="form-control" id="floatingMarks" />
                                <label htmlFor="floatingMarks">Marks</label>
                            </div>

                            <div className="form-floating my-3 d-flex">

                                <div className="my-3" onChange={(e) => setStatus(e.target.value)}>
                                    <div className="form-check">
                                        <input id="notrec" value="Not Recommend" type="radio" className="form-check-input" required="" />
                                        <label className="form-check-label text-dark " htmlFor="notrec" >Not Recommend</label>
                                    </div>
                                    <div className="form-check">
                                        <input id="rec" value="Recommend" type="radio" className="form-check-input " required="" />
                                        <label className="form-check-label mx-3 text-dark" htmlFor="rec">Recommend</label>
                                    </div>
                                </div>
                            </div>
                            <div className="m-2 d-flex justify-content-center">
                                <button type='submit' className='btn btn-light btn-md fw-bolder fs-6 w-50' style={{ boxShadow: "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset" }}>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </>
    );
}

export default ReviewerPresentation;