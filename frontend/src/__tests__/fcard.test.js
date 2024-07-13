import React from "react";
import { screen,render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Cards from '../components/Cards';

test("Checking that all elements are rendered successfully", ()=>{
  render(<Router> <Cards/> </ Router>);

  expect(screen.getByText("Call For Paper")).toBeInTheDocument();

  const call=screen.getAllByText("The 16th Asian Conference on Education");
  expect(call).toHaveLength(3);

  const location= screen.getAllByText("Nov 26-29,2024 | Join us in Tokyo,Japan and Online");
  expect(location).toHaveLength(3);

  // const about=screen.getByText('About Institute');
  // expect(about.tagName).tobe('H1')

  const about = screen.getByText('About Institute');
  expect(about.tagName).toBe('H1');

  // const morebtn=screen.getAllByText('more');
  // expect(morebtn.tagName).toBe('BUTTON');

  const morecount=screen.getAllByText('more');
  expect(morecount).toHaveLength(6);

  const title=screen.getAllByText('Special title treatment');
  expect(title).toHaveLength(3);
})