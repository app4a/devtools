import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import K8sYamlGenerator from '../components/K8sYamlGenerator';

// Mock clipboard API
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn(() => Promise.resolve()),
  },
});

describe('K8sYamlGenerator', () => {
  const defaultProps = {
    name: 'Kubernetes YAML Generator',
    description: 'Generate Kubernetes YAML configurations with visual builder'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders component with title', () => {
    render(<K8sYamlGenerator {...defaultProps} />);
    expect(screen.getByText('Kubernetes YAML Generator')).toBeInTheDocument();
  });

  test('renders builder tab', () => {
    render(<K8sYamlGenerator {...defaultProps} />);
    expect(screen.getByText('Builder')).toBeInTheDocument();
  });

  test('renders templates tab', () => {
    render(<K8sYamlGenerator {...defaultProps} />);
    expect(screen.getByText('Templates')).toBeInTheDocument();
  });

  test('renders advanced tab', () => {
    render(<K8sYamlGenerator {...defaultProps} />);
    expect(screen.getByText('Advanced')).toBeInTheDocument();
  });

  test('renders validation tab', () => {
    render(<K8sYamlGenerator {...defaultProps} />);
    expect(screen.getByText('Validation')).toBeInTheDocument();
  });

  test('renders resource name input', () => {
    render(<K8sYamlGenerator {...defaultProps} />);
    expect(screen.getByLabelText('Resource Name')).toBeInTheDocument();
  });

  test('renders generated YAML section', () => {
    render(<K8sYamlGenerator {...defaultProps} />);
    expect(screen.getByText('Generated YAML')).toBeInTheDocument();
  });

  test('renders resource info section', () => {
    render(<K8sYamlGenerator {...defaultProps} />);
    expect(screen.getByText('Resource Info')).toBeInTheDocument();
  });
});

