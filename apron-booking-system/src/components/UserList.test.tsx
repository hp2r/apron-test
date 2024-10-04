import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import UserList from './UserList';

describe('UserList', () => {
  it('renders user list with users', async () => {
    const users = [
      { gender: 'Male', firstname: 'John', lastname: 'Doe', age: 30 },
      { gender: 'Female', firstname: 'Jane', lastname: 'Doe', age: 25 },
    ];

    const onDelete = vi.fn();
    const onEdit = vi.fn();

    render(
      <UserList users={users} onDelete={onDelete} onEdit={onEdit} />
    );

    await waitFor(() => expect(screen.getByText('John')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('Jane')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('Male')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('Female')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('30')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('25')).toBeInTheDocument());
  });


  it('renders edit modal with John Doe details when edit button is clicked', async () => {
    const users = [
      { gender: 'Male', firstname: 'John', lastname: 'Doe', age: 30 },
    ];

    const onDelete = vi.fn();
    const onEdit = vi.fn();

    render(
      <UserList users={users} onDelete={onDelete} onEdit={onEdit} />
    );

    const editButton = screen.getByTestId('edit-btn-0');
    fireEvent.click(editButton);

    await waitFor(() => expect(screen.getByText('John')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('Doe')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('30')).toBeInTheDocument());
  });

  it('renders delete modal when delete button is clicked', async () => {
    const users = [
      { gender: 'Male', firstname: 'John', lastname: 'Doe', age: 30 },
    ];

    const onDelete = vi.fn();
    const onEdit = vi.fn();

    render(
      <UserList users={users} onDelete={onDelete} onEdit={onEdit} />
    );

    const deleteButton = screen.getByTestId('delete-btn-0');
    fireEvent.click(deleteButton);

    await waitFor(() => expect(screen.getByText('Are you sure you want to delete user?')).toBeInTheDocument());
  });
});