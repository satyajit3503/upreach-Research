import React from 'react';

const AdminCheckStatus = () => {
    return (

        <>
            <div className='container-fluid ' style={{backgroundColor:"#168aad"}}>

                <div class=" px-4 py-5 text-center">
                    <div class="py-5">

                        <h1 class="display-4 fw-bolder text-white">Application ID</h1>
                        <div className='container w-50 my-4 p-3 text-dark bg-light' style={{boxShadow:"rgba(50,50,93,0.25) 0px 30px 60px -12px inset,rgba(0,0,0,0.3) 0px 18px 36px -18px inset"}}>

                            <h3 class="display-6 ">63748736488902736</h3>
                        </div>
                        <h1 class=" display-4 mb-4 text-white">Accepted</h1>
                        <div class="col-lg-6 mx-auto">
 
                            <div class="d-grid gap-2 d-sm-flex justify-content-sm-center ">
                                <button type="button" class="btn btn-outline-light btn-lg px-4 me-sm-3 fw-bold">YES</button>
                                <button type="button" class="btn btn-outline-light btn-lg px-4">NO</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className='container p-3 bg-light'>

                <table class="table table-dark table-hover" style={{boxShadow:"rgba(0,0,0,0.19) 0px 10px 20px, rgba(0,0,0,0.23) 0px 6px 6px"}}>

                    <thead>
                        <tr>
                            <th scope="col">Status Of</th>
                            <th scope="col">Reviewer 1</th>
                            <th scope="col">Reviewer 2</th>
                            {/* <th scope="col">Handle</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">Peer Screening</th>
                            <td>Recommended</td>
                            <td>Recommended</td>
                            {/* <td>@mdo</td> */}
                        </tr>
                        <tr>
                            <th scope="row">Camera Screening</th>
                            <td>Recommended</td>
                            <td>In Progress</td>
                            {/* <td>@fat</td> */}
                        </tr>
                        <tr>
                            <th scope="row">Presentation screening</th>
                            <td>Recommended</td>
                            <td>Pending</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
}


export default AdminCheckStatus;