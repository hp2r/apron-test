import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { describe, expect, it } from "vitest";
import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query';

describe('App', () => {
  it('renders users list', async () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    );
    await waitFor(() => expect(screen.getByText('Users')).toBeInTheDocument());
  });

  it('renders add user button', async () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    );
    await waitFor(() => expect(screen.getByText('Add User')).toBeInTheDocument());
  });

  it('opens add user modal when button is clicked', async () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    );
    const addButton = await waitFor(() => screen.getByText('Add User'));
    fireEvent.click(addButton);
    await waitFor(() => expect(screen.getByText('Add')).toBeInTheDocument());
  });
});