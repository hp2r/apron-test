import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { User } from '../types/user';

type UpdateUser = {
  id: number;
  user: User;
};

type ResponseType = {
  success: boolean;
  message: string;
}

const fetchUsers = async () => {
  const response = await fetch('http://localhost:5000/api/users');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const useUsers = () => {
  const queryClient = useQueryClient();
  const { data: users, ...queryInfo } = useQuery('users', fetchUsers);
  const defaultResponse = {success: false, message: ''};
  const [responseSuccess, setResponseSuccess] = useState<ResponseType>(defaultResponse);

  const addUser = useMutation(
    async (newUser: User) => {
      setResponseSuccess(defaultResponse);
      const response = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('users');
        setResponseSuccess({success: true, message: 'User added'});
      },
    }
  );

  const deleteUser = useMutation(
    async (id:number) => {
      setResponseSuccess(defaultResponse);
      const response = await fetch(`http://localhost:5000/api/users/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('users');
        setResponseSuccess({success: true, message: 'User deleted'});
      },
    }
  );

  const updateUser = useMutation(
    async (updatedUser: UpdateUser ) => {
      setResponseSuccess(defaultResponse);
      const response = await fetch(`http://localhost:5000/api/users/${updatedUser.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...updatedUser.user }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('users');
        setResponseSuccess({success: true, message: 'User edited'});
      },
    }
  );

  return { users, addUser, deleteUser, updateUser, responseSuccess, ...queryInfo };
};

