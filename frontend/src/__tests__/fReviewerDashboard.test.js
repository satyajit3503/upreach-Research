// import React from "react";
// import { render, screen } from "@testing-library/react";
// import { BrowserRouter as Router } from "react-router-dom";
// import ReviewerDashBoard from '../components/Reviewer/ReviewerDashBoard';

// //mock axios module
// jest.mock('axios',()=>({
//     post:jest.fn(()=>Promise.resolve({data:"success"}))
// }))

// test("All elements of reviewer component renders successfully", ()=>{
//     render( <Router> <ReviewerDashBoard/> </Router> )

//     //checking all elements are rendered correctly
//     expect(screen.getByText('Date')).toBeInTheDocument();
// })


import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import ReviewerDashboard from '../components/Reviewer/ReviewerDashBoard';
import { axios } from "axios";

// Mocking Axios
jest.mock('axios');

test("ReviewerDashboard renders correctly", async () => {
    axios.post.mockResolvedValueOnce({ data: { status: "success", applicantData: [] } });

    render(
        <Router>
            <ReviewerDashboard />
        </Router>
    );

    

    // Wait for the component to finish loading
    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));

    // Expect the table headers to be present
    expect(screen.getByText("Date")).toBeInTheDocument();
    expect(screen.getByText("CRN")).toBeInTheDocument();
    expect(screen.getByText("ARN")).toBeInTheDocument();
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Domain")).toBeInTheDocument();
    expect(screen.getByText("Peer Screening")).toBeInTheDocument();
    expect(screen.getByText("Camera Screening")).toBeInTheDocument();
    expect(screen.getByText("Presentation screening")).toBeInTheDocument();
});