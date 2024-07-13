

import React from 'react';
import { render,screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import UserD from '../components/UserD';


  it('renders user dashboard component with correct elements', () => {
    const crn = '2E83FC3F84C';
    localStorage.setItem('crn', crn);

    render(
      <Router>  
        <UserD />
      </Router>
    );

    expect(screen.getByText('Apply for the Conference here')).toBeInTheDocument();
    expect(screen.getByText("Don't miss the opportunity to be part of an enriching and intellectually stimulating conference experience")).toBeInTheDocument();
    expect(screen.getByText('Submit your research paper today and your place on the global stage of academic excellence')).toBeInTheDocument();
   
    expect(screen.getByRole('link', { name: 'Apply' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Check Status' })).toBeInTheDocument();

    localStorage.removeItem('crn');
  });
