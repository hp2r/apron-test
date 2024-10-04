import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { describe, expect, it, vi } from "vitest";
import UserForm from './UserForm';

describe('UserForm', () => {
  it('renders form with default values', () => {
    render(<UserForm formTitle='Add User' actionLabel='Save' onSubmit={() => {}} onCancel={() => {}} />);
    expect(screen.getByText('Add User')).toBeInTheDocument();
    expect(screen.getByText('Gender')).toBeInTheDocument();
    expect(screen.getByText('Male')).toBeInTheDocument();
    expect(screen.getByText('Female')).toBeInTheDocument();
    expect(screen.getByText('First name')).toBeInTheDocument();
    expect(screen.getByText('Last name')).toBeInTheDocument();
    expect(screen.getByText('Age')).toBeInTheDocument();
    expect(screen.getByText('Save')).toBeInTheDocument();
  });

  it('calls onCancel when cancel button is clicked', async () => {
    const handleCancel = vi.fn();
    render(<UserForm formTitle='Add User' actionLabel='Save' onSubmit={() => {}} onCancel={handleCancel} />);
    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);
    await waitFor(() => expect(handleCancel).toHaveBeenCalledTimes(1));
  });

  it('displays "The minumum age is 18" when age is less than 18', async () => {
    render(<UserForm formTitle='Add User' actionLabel='Save' onSubmit={() => {}} onCancel={() => {}} />);
    const ageInput = screen.getByLabelText('Age');
    fireEvent.change(ageInput, { target: { value: '17' } });
    const submitButton = screen.getByText('Save');
    fireEvent.click(submitButton);
    await waitFor(() => expect(screen.getByText('The minimum age is 18')).toBeInTheDocument());
  });

  it("displays 'The maximum age for male users is 111' when age is greater than 111 for male users", async () => {
    render(<UserForm formTitle='Add User' actionLabel='Save' onSubmit={() => {}} onCancel={() => {}} />);
    const genderSelect = screen.getByLabelText('Gender');
    fireEvent.change(genderSelect, { target: { value: 'Male' } });
    const ageInput = screen.getByLabelText('Age');
    fireEvent.change(ageInput, { target: { value: '112' } });
    const submitButton = screen.getByText('Save');
    fireEvent.click(submitButton);
    await waitFor(() => expect(screen.getByText('The maximum age for Male users is 111')).toBeInTheDocument());
  });

  it("displays 'The maximum age for female users is 117' when age is greater than 117 for female users", async () => {
    render(<UserForm formTitle='Add User' actionLabel='Save' onSubmit={() => {}} onCancel={() => {}} />);
    const genderSelect = screen.getByLabelText('Gender');
    fireEvent.change(genderSelect, { target: { value: 'Female' } });
    const ageInput = screen.getByLabelText('Age');
    fireEvent.change(ageInput, { target: { value: '118' } });
    const submitButton = screen.getByText('Save');
    fireEvent.click(submitButton);
    await waitFor(() => expect(screen.getByText('The maximum age for Female users is 117')).toBeInTheDocument());
  });
});