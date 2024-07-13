
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ThankYouPage from '../components/ThankYouPage';
import { BrowserRouter as Router } from 'react-router-dom';

describe('ThankYouPage correctly', () => {
  it('renders the page with the correct content', () => {
    const { getByText, getByRole } = render( <Router>  <ThankYouPage />  </Router> );
    const goBackLink = getByRole('link', { name: 'Go Back' });

    expect(getByText('Thank You')).toBeInTheDocument();
    expect(getByText('Your research paper has been submitted successfully.')).toBeInTheDocument();
    expect(getByText('An email has been sent confirming the submission along with application number')).toBeInTheDocument();
    expect(goBackLink).toBeInTheDocument();
    });
    });