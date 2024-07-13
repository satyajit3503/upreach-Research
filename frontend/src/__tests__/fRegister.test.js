import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter
import Register from '../components/Register';

// Mock axios module
jest.mock('axios', () => ({
  post: jest.fn(() => Promise.resolve({ data: 'Success' }))
}));
// Mock useNavigate hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

// beforeAll(()=>{
//     console.log('***TEST results onwards***')
//     })
    
describe('Register component', () => {
  it('Register component renders correctly', () => {
    render(
      <Router>
        <Register />
      </Router>
    );

    // Test if input fields and buttons are rendered
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Category')).toBeInTheDocument();
    expect(screen.getByTestId('register-button')).toBeInTheDocument();

    // expect(screen.getByLabelText('Register')).toBeInTheDocument();
    
    // const btn=screen.getAllByText('Register');
    // expect(btn.tagName).toBe('button');

    expect(screen.getByText('Already have an account')).toBeInTheDocument();
  });
});