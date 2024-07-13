
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter
import Login from '../components/Login';
import axios from 'axios';

// Mock axios module
jest.mock('axios', ()=>({
  post:jest.fn(()=>Promise.resolve({data : 'Success'}))
}))

// Mock useNavigate hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));


describe('Login component', () => {

  it('input fields renders correctly', () => {
    const { getByLabelText, getByTestId,getByText } = render(<Router> <Login /> </Router>);

    // Test if input fields and buttons are rendered
    expect(getByLabelText('Enter email')).toBeInTheDocument();
    expect(getByLabelText('Category')).toBeInTheDocument();
    expect(getByLabelText('Enter password')).toBeInTheDocument();
    expect(getByTestId('login-button')).toBeInTheDocument();
    expect(getByText('New User')).toBeInTheDocument();
  });


  it('submits login form successfully', async () => {
    axios.post.mockResolvedValue({
      data: {
        status: 'Success',
        data: { crn: '2E83FC3F84C' }
      }
    });
    const { getByLabelText, getByText, getByTestId } = render(<Router> <Login /> </Router>);

    // Fill out the login form
    fireEvent.change(getByLabelText('Enter email'), { target: { value: 'suraskhit@email.co' } });
    fireEvent.change(getByLabelText('Category'), { target: { value: 'Applicant' } });
    fireEvent.change(getByLabelText('Enter password'), { target: { value: 'suraskhit' } });

    // Submit the form
    fireEvent.click(getByTestId('login-button'));

  });
});

