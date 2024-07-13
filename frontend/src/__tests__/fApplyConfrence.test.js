import React from "react";
import { render,screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import ApplyConferences from "../components/ApplyConferences";

// axios mock
jest.mock('axios',()=>{
    post:jest.fn(()=>Promise.resolve({data: 'success '}))

});

//mock useNavigate hook
jest.mock('react-router-dom', ()=>({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

test("Apply conference elements renders correctly",() => {
    render(<Router>  <ApplyConferences/>  </Router>);
//check all elements are rendered successfully
    expect(screen.getByText('apply for conference...')).toBeInTheDocument();
    expect(screen.getByLabelText('CRN')).toBeInTheDocument();
    expect(screen.getByLabelText('Title')).toBeInTheDocument();
    expect(screen.getByLabelText('Author')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    // expect(screen.getByLabelText('domain')).toBeInTheDocument();

})