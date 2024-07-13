import { React, useEffect } from 'react';
import Navbar from '../Navbar';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import DomainName from '../DomainList';
const PublisherDashboard = () => {
    const crn = localStorage.getItem("crn");
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/publisherdashboard',)
            .then((res) => {
                setData(res.data);
                // console.log(res.data);
            })
    }, []);

    const [domain, setDomain] = useState()
    const [hide, setHide] = useState(true)
    const handleChange = (e) => {
        if (e.target.value == "AI" || e.target.value == "ML" || e.target.value == "Robotics") {
            setDomain(e.target.value)
            setHide(false)
        }
        else {
            setHide(true)
        }
    }
    return (<>
        <Navbar />
        <div className="container-fluid mt-1 p-4 d-flex align-items-center" style={{ backgroundColor: "#caf0f8" }}>
            <div className="container d-flex flex-column">
                <h1>PB Ref.No.</h1>
                <p className='lead'>{crn}</p>
            </div>
            <div className="container h-25 w-50 d-flex justify-content-end ">
                {/* <select className="form-select px-1 form-select-lg mr-3" value={domain} onChange={(e) => { handleChange(e) }} id="specificSizeSelect">
                    <option defaultValue >Select by domain</option>
                    {DomainName.map((item)=>{
                        return (
                            <option>{item}</option>
                        )
                    })}
                </select> */}

                <Link to="/publisherdashboard/publishedpaper"> <button className='btn btn-primary btn-lg'>View Published paper</button> </Link>
            </div>
        </div>

        <div className='contaner-fluid p-5 mt-1' style={{ backgroundColor: "#caf0f8", height: "100vh" }} >

            <table className="table table-striped " style={{ boxShadow: "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px" }}>


                <thead>
                    <tr>
                        <th scope="col">Sl no.</th>
                        <th scope="col">Domain</th>
                        <th scope="col">ARN</th>
                        <th scope="col">CRN</th>
                        <th scope="col">Paper Name</th>
                        <th scope="col">Submission date</th>
                        <th scope="col">Final Verdict</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item,key) => {
                        return (
                            <tr key={item._id}>
                                <td>{key}</td>
                                <td>{item.domain}</td>
                                <td>{item.application_no}</td>
                                <td>{item.crn}</td>
                                <td>{item.title}</td>
                                <td>{item.date}</td>
                                <td><Link to="/publisherdashboard/verdictstage" onClick={(e)=>localStorage.setItem("arn",item.application_no)} >Review</Link></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

        </div>
    </>);
}


export default PublisherDashboard;