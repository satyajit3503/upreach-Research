import React from 'react';
import { render } from '@testing-library/react';
import Footer from '../components/Footer';

describe('Footer component', () => {
  test('Testing footer elements renders correctly', () => {
    const { getByText } = render(<Footer />);
    
    // Test if specific elements are rendered
    expect(getByText('C360C')).toBeInTheDocument();
    expect(getByText('Currently v5.0.2.')).toBeInTheDocument();
    expect(getByText('Analytics by Fathom')).toBeInTheDocument();
    expect(getByText('Links')).toBeInTheDocument();
    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('Docs')).toBeInTheDocument();
    expect(getByText('Examples')).toBeInTheDocument();
    expect(getByText('books')).toBeInTheDocument();
    expect(getByText('Blog')).toBeInTheDocument();
    expect(getByText('Swag Store')).toBeInTheDocument();
    expect(getByText('Guides')).toBeInTheDocument();
    expect(getByText('Getting started')).toBeInTheDocument();
    expect(getByText('Starter template')).toBeInTheDocument();
    expect(getByText('Webpack')).toBeInTheDocument();
    expect(getByText('Parcel')).toBeInTheDocument();
    expect(getByText('Projects')).toBeInTheDocument();
    expect(getByText('Bootstrap 5')).toBeInTheDocument();
    expect(getByText('Bootstrap 4')).toBeInTheDocument();
    expect(getByText('Icons')).toBeInTheDocument();
    expect(getByText('RFS')).toBeInTheDocument();
    expect(getByText('npm starter')).toBeInTheDocument();
    expect(getByText('Community')).toBeInTheDocument();
    expect(getByText('Issues')).toBeInTheDocument();
    expect(getByText('Discussions')).toBeInTheDocument();
    expect(getByText('Corporate sponsors')).toBeInTheDocument();
    expect(getByText('Open Collective')).toBeInTheDocument();
    expect(getByText('Stack Overflow')).toBeInTheDocument();
  });
});
