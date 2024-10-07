import { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import Modal from './components/Modal';
import { useUsers } from './queries/useUsers';
import { styled } from '../stitches.config';
import PlusImg from './assets/plus.svg';
import { User } from './types/user';

const queryClient = new QueryClient();

const Icon = styled('img', {
  marginRight: 'auto'
});

const Button = styled('button', {
  width: '130px',
  height: '40px',
  padding: '0px 20px 0px 16px',
  gap: '8px',
  borderRadius: '20px',
  backgroudColor: 'black',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  float: 'right',
  margin: '3em 0 2em 0',
  color: 'white',
  [`& ${Icon}`]: {
    cursor: 'pointer',
  },
  [`&:span`]: {
    marginRight: 'auto',
  }
});

const Toast = styled('div', {
  position: 'fixed',
  top: '5%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'black',
  color: '#fff',
  padding: '8px 12px 8px 12px',
  borderRadius: '8px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
  gap: '8px',
  zIndex: '1'
})

const HeaderRow = styled('div', {
  display: 'flex',
  justifyContent: 'space-between'
})

interface CurrentUser {
  user: User,
  id: number
}

const App = () => {
  const { users, addUser, deleteUser, updateUser, responseSuccess } = useUsers();
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<CurrentUser|null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleAddUser = (user:User) => {
    addUser.mutate(user);
    setIsAddModalOpen(false);
  };

  const handleAddUserModal = () => {
    setIsAddModalOpen(true);
  };

  const handleDeleteUser = (id:number) => {
    deleteUser.mutate(id);
  };

  const handleEditUser = (user:User, id:number) => {
    setCurrentUser({ user, id });
    setIsEditModalOpen(true);
  };

  const handleUpdateUser = (user:User) => {
    if(!currentUser) return;
    updateUser.mutate({ id: currentUser.id, user: user });
    setIsEditModalOpen(false);
    setCurrentUser(null);
  };
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 5000);
  };

  useEffect(() => {
    if (responseSuccess.success) {
      showToast(responseSuccess.message);
    }
  }, [responseSuccess]);

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        {toastMessage && <Toast>{responseSuccess.message}</Toast>}
        <HeaderRow>
          <h1>Users</h1>
          <Button onClick={handleAddUserModal} type="button"><Icon src={PlusImg} alt="Add User"/><span>Add User</span></Button>
        </HeaderRow>
        
        <UserList users={users || []} onDelete={handleDeleteUser} onEdit={handleEditUser} />
        <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
          <UserForm formTitle="Add User" actionLabel='Add' onSubmit={handleAddUser} onCancel={() => setIsAddModalOpen(false)}/>
        </Modal>
        {currentUser &&
        <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
          <UserForm formTitle="Edit User" actionLabel='Save' onSubmit={handleUpdateUser} onCancel={() => setIsEditModalOpen(false)} defaultValues={currentUser.user} />
        </Modal>
        }
      </div>
    </QueryClientProvider>
  );
};

export default App;


