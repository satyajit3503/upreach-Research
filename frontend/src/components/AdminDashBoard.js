import React from "react";
// import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import DomainName from "./DomainList";
const AdminDashBoard = () => {
    const baseurl = "http://localhost:5000";
    const [category, setCategory] = useState("crn");
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState(5);
    const [data, setData] = useState([]);
    const [cat, setCat] = useState("crn");
    const [inp, setInp] = useState("");
    const [sts, setSts] = useState(5);
    const [showAll, setshowAll] = useState(false);
    const [showRecord, setshowRecord] = useState(false);
    const [val, setval] = useState();
    const [userHide, setuserHide] = useState(true);
    const [reviewerHide, setreviewerHide] = useState(true);
    const [publisherHide, setpublisherHide] = useState(true);
    const ARN = localStorage.getItem("crn");
    const adminName = localStorage.getItem("admin");
    const navigate = useNavigate();
    // mis
    
    var adName = "Admin";
    if (adminName) {
        adName = (
            adminName.split(" ")[0][0] + adminName.split(" ")[1][0]
        ).toUpperCase();
    }
    const url = useRef("nothing");
    const refresh = () => {
        setCategory("crn");
        setSearch("");
        setStatus(5);
        setData([]);
        setshowRecord(false);
        setuserHide(true);
        setreviewerHide(true);
        setpublisherHide(true);
    };
    useEffect(() => {
        if (val === "1") {
            url.current = "applicantinfo";
            refresh();
            setuserHide(false);
        } else if (val === "2") {
            url.current = "reviewerinfo";
            refresh();
            setreviewerHide(false);
        } else if (val === "3") {
            url.current = "publisherinfo";
            refresh();
            setpublisherHide(false);
        } else {
            refresh();
        }
    }, [val]);

    const handleSubmit = () => {
        if (category === "none") {
            setCat(category);
            setSts(status);
        } else {
            if (search === "") {
                toast.info("Please Enter search value !");
            } else {
                setCat(category);
                setInp(search);
                setSts(status);
                setshowAll(!showAll);
            }
        }
    };

    const excelDownload = (e) => {
        axios
            .get(`${baseurl}/admin/${url.current}`)
            .then((result) => {
                if (result.data.sts === "success") {
                    toast.success("File Successfully created ");
                } else {
                    toast.error(result.data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        axios
            .post(`${baseurl}/admin/${url.current}`, { cat, inp, sts })
            .then((result) => {
                if (result.data.length !== 0) {
                    setshowRecord(true);
                    setData(result.data);
                } else {
                    setshowRecord(false);
                }
            })
            .catch((err) => console.log("Error while rendering..."));
    }, [cat, inp, sts, showAll]);

    const handleAll = () => {
        if (!userHide) {
            setCategory("none");
            setStatus(5);
        }
        axios
            .get(`${baseurl}/admin/${url.current}`)
            .then((result) => {
                if (result.data.all.length !== 0) {
                    setshowRecord(true);
                    setData(result.data.all);
                } else {
                    setshowRecord(false);
                }
            })
            .catch((err) => console.log("Error while rendering..."));
    };

    return (
        <>
            <Navbar />
            <div
                className="container-fluid  border d-flex align-items-center "
                style={{ backgroundColor: "#caf0f8" }}
            >
                <div className="col-lg-9">
                    <h5 className=" w-25 text-center mt-1">AdRN</h5>
                    <p className=" bg-light w-25 text-center">{ARN}</p>
                </div>
                <div className="col-lg-2 ">
                    <select
                        className="form-select"
                        defaultValue={0}
                        value={val}
                        onChange={(e) => {
                            setval(e.target.value);
                        }}
                        id="category"
                        required=""
                    >
                        <option value="0" disabled defaultValue>
                            View By Category
                        </option>
                        <option value="1">Applicant</option>
                        <option value="2">Reviewer</option>
                        <option value="3">Publisher</option>
                    </select>
                </div>
              
            </div>

            {/* Applicant DashBoard  */}
            <div className=" mt-1  text-center" hidden={userHide}>
                <div
                    className="container-fluid d-flex flex-column align-items-center"
                    style={{ backgroundColor: "#caf0f8", height: "15vh" }}
                >
                    <div className="container">
                        <h4 className="text-dark d-block">Search by Applicant details</h4>
                    </div>
                    <div className="col d-flex align-items-center">
                        <label className="">Search By :</label>
                        <select
                            className="p-1 ml-1"
                            value={category}
                            onChange={(e) => {
                                setCategory(e.target.value);
                                setSearch("");
                            }}
                        >
                            <option value="none">None</option>
                            <option value="crn">CRN</option>
                            <option value="application_no">Application No</option>
                            <option value="email">Email</option>
                            <option value="domain">Domain</option>
                            <option value="date">Date</option>
                        </select>
                        {category !== "none" ? (
                            category === "domain" ? (
                                <select
                                    className="p-1 ml-2"
                                    onChange={(e) => setSearch(e.target.value)}
                                >
                                    <option value="" defaultValue disabled>
                                        Choose Domain
                                    </option>
                                    <option value="Healthcare">Healthcare</option>
                                    <option value="Technology">Technology</option>
                                    <option value="Cloud">Cloud</option>
                                    <option value="Banking">Banking</option>
                                    <option value="Machine Learning">Machine Learning</option>
                                    <option value="Robotics">Robotics</option>
                                </select>
                            ) : (
                                <input
                                    className="p-1 ml-2"
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder={`Enter the ${category}`}
                                />
                            )
                        ) : (
                            <input
                                className="p-1 ml-2"
                                type="text"
                                value=""
                                placeholder={`Showing all`}
                                readOnly
                            />
                        )}
                        <label className="ml-3">Status:</label>
                        <select
                            className="py-1 my-2 ml-3"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value={5}>All</option>
                            <option value={4}>Accepted</option>
                            <option value={0}>In Progress</option>
                            <option value={-1}>Rejected</option>
                        </select>
                        <button
                            className="btn-primary btn col-1 mx-5"
                            onClick={(e) => handleSubmit()}
                        >
                            Search
                        </button>
                        <button className="btn-primary btn col-2 mx-1" onClick={handleAll}>
                            Show All
                        </button>
                      
                    </div>
                </div>
                <div className="d-flex align-items-center justify-content-center">
                    {showRecord ? (
                        <table
                            className="table-striped table-hover"
                            style={{ width: "99vw" }}
                        >
                            <thead>
                                <tr>
                                    <th>CRN</th>
                                    <th>Application No</th>
                                    <th>Title</th>
                                    <th>Author</th>
                                    <th>Email</th>
                                    <th>Domain</th>
                                    <th>Abstract</th>
                                    <th>Status</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((info, i) => {
                                    var sts = "";
                                    switch (info.status) {
                                        case -1: {
                                            sts = "Rejected";
                                            break;
                                        }
                                        case 4: {
                                            sts = "Accepted";
                                            break;
                                        }
                                        default: {
                                            sts = "In Progress";
                                        }
                                    }
                                    return (
                                        <tr key={i}>
                                            <td>{info.crn}</td>
                                            <td>{info.application_no}</td>
                                            <td>{info.title}</td>
                                            <td>{info.author}</td>
                                            <td>{info.email}</td>
                                            <td>{info.domain}</td>
                                            <td>{info.abstract}</td>
                                            <td>{sts}</td>
                                            <td>{info.date}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    ) : (
                        <div
                            style={{
                                display: "flex",
                                height: "80vh",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <h1>No Record Found</h1>
                        </div>
                    )}
                </div>
            </div>

            {/* Reviewer DashBoard  */}
            <div className=" mt-1  text-center" hidden={reviewerHide}>
                <div
                    className="container-fluid d-flex flex-column align-items-center"
                    style={{ backgroundColor: "#caf0f8", height: "15vh" }}
                >
                    <div className="container">
                        <h4 className="text-dark d-block">Search by Reviewer details</h4>
                    </div>
                    <div className="col d-flex align-items-center">
                        <label className="">Search By :</label>
                        <select
                            className="p-1 ml-1"
                            value={category}
                            onChange={(e) => {
                                setCategory(e.target.value);
                                setSearch("");
                            }}
                        >
                            <option value="crn">RRN</option>
                            <option value="name">Name</option>
                            <option value="email">Email</option>
                            <option value="domain">Domain</option>
                        </select>
                        {category === "domain" ? (
                            <select
                                className="p-1 ml-2"
                                onChange={(e) => setSearch(e.target.value)}
                            >
                                <option value="" selected disabled>
                                    Choose Domain
                                </option>
                                <option value="Healthcare">Healthcare</option>
                                <option value="Technology">Technology</option>
                                <option value="Cloud">Cloud</option>
                                <option value="Banking">Banking</option>
                                <option value="Machine Learning">Machine Learning</option>
                                <option value="Robotics">Robotics</option>
                            </select>
                        ) : (
                            <input
                                className="p-1 ml-2"
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder={`Enter the ${category}`}
                            />
                        )}
                        <button
                            className="btn-primary btn col-1 mx-5"
                            onClick={(e) => handleSubmit()}
                        >
                            Search
                        </button>
                        <button className="btn-primary btn col-2 mx-1" onClick={handleAll}>
                            Show All
                        </button>
                   
                    </div>
                </div>
                <div className="d-flex align-items-center justify-content-center">
                    {showRecord ? (
                        <table
                            className="table-striped table-hover"
                            style={{ width: "99vw" }}
                        >
                            <thead>
                                <tr>
                                    <th>RRN</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Domain</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((info, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{info.crn}</td>
                                            <td>{info.name}</td>
                                            <td>{info.email}</td>
                                            <td>{info.domain}</td>
                                            <td>{info.date}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    ) : (
                        <div
                            style={{
                                display: "flex",
                                height: "80vh",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <h1>No Record Found</h1>
                        </div>
                    )}
                </div>
            </div>

            {/* Publisher DashBoard  */}
            <div className=" mt-1  text-center" hidden={publisherHide}>
                <div
                    className="container-fluid d-flex flex-column align-items-center"
                    style={{ backgroundColor: "#caf0f8", height: "15vh" }}
                >
                    <div className="container">
                        <h4 className="text-dark d-block">Search by Publisher details</h4>
                    </div>
                    <div className="col d-flex align-items-center">
                        <label className="">Search By :</label>
                        <select
                            className="p-1 ml-1"
                            value={category}
                            onChange={(e) => {
                                setCategory(e.target.value);
                                setSearch("");
                            }}
                        >
                            <option value="crn">PRN</option>
                            <option value="name">Name</option>
                            <option value="email">Email</option>
                        </select>
                        <input
                            className="p-1 ml-2"
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder={`Enter the ${category}`}
                        />
                        <button
                            className="btn-primary btn col-1 mx-5"
                            onClick={(e) => handleSubmit()}
                        >
                            Search
                        </button>
                        <button className="btn-primary btn col-2 mx-1" onClick={handleAll}>
                            Show All
                        </button>
                       
                    </div>
                </div>
                <div className="d-flex align-items-center justify-content-center">
                    {showRecord ? (
                        <table
                            className="table-striped table-hover"
                            style={{ width: "99vw" }}
                        >
                            <thead>
                                <tr>
                                    <th>RRN</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((info, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{info.crn}</td>
                                            <td>{info.name}</td>
                                            <td>{info.email}</td>
                                            <td>{info.date}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    ) : (
                        <div
                            style={{
                                display: "flex",
                                height: "80vh",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <h1>No Record Found</h1>
                        </div>
                    )}
                </div>
            </div>

            {userHide && reviewerHide && publisherHide ? (
                <div
                    style={{
                        width: "100vw",
                        display: "flex",
                        alignItems: "center",
                        height: "60vh",
                        justifyContent: "center",
                    }}
                >
                    <h1 className="">Welcome {adminName} to our Website.</h1>
                </div>
            ) : (
                <></>
            )}
        </>
    );
};
export default AdminDashBoard;
