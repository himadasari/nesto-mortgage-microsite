import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import type { Applicant } from '../../types';
import ApplicationForm from '../../components/ApplicationForm/ApplicationForm';

const initialData: Applicant = {
  firstName: 'Hima',
  lastName: 'Dasari',
  email: 'hima.dasari@client.ca',
  phone: '1234567890',
};

describe('ApplicationForm', () => {
  it('renders initial applicant details', () => {
    render(
      <ApplicationForm
        initialData={initialData}
        onSubmit={vi.fn()}
        isLoading={false}
      />,
    );

    expect(screen.getByDisplayValue('Hima')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Dasari')).toBeInTheDocument();
    expect(
      screen.getByDisplayValue('hima.dasari@client.ca'),
    ).toBeInTheDocument();
    expect(screen.getByDisplayValue('1234567890')).toBeInTheDocument();
  });

  it('updates applicant information on input change', () => {
    render(
      <ApplicationForm
        initialData={initialData}
        onSubmit={vi.fn()}
        isLoading={false}
      />,
    );

    const emailInput = screen.getByDisplayValue('hima.dasari@client.ca');

    fireEvent.change(emailInput, {
      target: { value: 'hima.updated@client.ca' },
    });

    expect(emailInput).toHaveValue('hima.updated@client.ca');
  });

  it('submits updated applicant data', () => {
    const handleSubmit = vi.fn();

    render(
      <ApplicationForm
        initialData={initialData}
        onSubmit={handleSubmit}
        isLoading={false}
      />,
    );

    const phoneInput = screen.getByDisplayValue('1234567890');

    fireEvent.change(phoneInput, {
      target: { value: '1234567891' },
    });

    const button = screen.getByRole('button');

    fireEvent.click(button);

    expect(handleSubmit).toHaveBeenCalledWith({
      ...initialData,
      phone: '1234567891',
    });
  });

  it('disables submit button while saving', () => {
    render(
      <ApplicationForm
        initialData={initialData}
        onSubmit={vi.fn()}
        isLoading={true}
      />,
    );

    const button = screen.getByRole('button');

    expect(button).toBeDisabled();
  });
});
