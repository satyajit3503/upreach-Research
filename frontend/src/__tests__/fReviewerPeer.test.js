import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import ReviewerPeer from "../components/Reviewer/ReviewerPeer";

test('Checking all elements are rendered or not',()=>{
    render( <Router> <ReviewerPeer/> </Router> );
    expect(screen.getByText('Peer Screening')).toBeInTheDocument();
})
