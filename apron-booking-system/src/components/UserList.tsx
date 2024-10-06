import { useEffect, useState } from 'react';
import { styled } from '../../stitches.config';
import Modal from './Modal';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import Table from './Table';
import DeleteImg from '../assets/delete.svg';
import { TableDataProps, User } from '../types/user';


const Button = styled('button', {
  width: '64px',
  height: '-webkit-fill-available',
  padding: '7px 12px 7px 12px',
  gap: '4px',
  borderRadius: '8px',
  border: '2px',
  borderColor: '#ECEBE3',
  backgroundColor: 'transparent',
  borderStyle: 'solid',
  color: 'Black',
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  [`&:span`]: {
    marginRight: 'auto'
  }
});

const DeleteModal = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '1rem',
  padding: '1rem',
});

const DeleteButton = styled('button', {
  width: '384px',
  height: '64px',
  padding: '0px 32px 0px 32px',
  gap: '8px',
  borderRadius: '16px',
  color: 'white',
  backgroundColor: '#E57171',
  fontSize: 'xx-large',
  lineHeight:' 24px'
});

const CancelButton = styled('button', {
  width: '384px',
  height: '64px',
  padding: '0px 32px 0px 32px',
  gap: '8px',
  borderRadius: '16px',
  color: 'black',
  borderStyle: 'solid',
  borderColor: '#ECEBE3',
  backgroundColor: 'transparent',
  fontSize: 'xx-large',
  lineHeight:' 24px'
});

const Icon = styled('img', {
});

const IconButton = styled('button', {
  backgroundColor: 'transparent',
  maxHeight: '-webkit-fill-available',
  [`& ${Icon}`]: {
    cursor: 'pointer',
  },
});

interface UserListProps {
  users: TableDataProps[];
  onDelete: (id: number) => void;
  onEdit: (user: User, id: number) => void;
}

const UserList = ({ users, onDelete, onEdit }: UserListProps) => {

  const [modalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedUserId, setSelectedUserId] = useState<number|null>(null);
  const [tableData, setTableData] = useState<TableDataProps[]>([]);


  const deleteUserModal = (id: number) => {
    setIsModalOpen(true);
    setSelectedUserId(id);
  };

  const onDeleteUser = () => {
    onDelete(selectedUserId!);
    setIsModalOpen(false);
    setSelectedUserId(null);
  };

  useEffect(() => {
    if(users) {
      const tempTableData = users.map((user, id) => {
        return {
          gender: user.gender,
          firstname: user.firstname,
          lastname: user.lastname,
          age: user.age,
          editButton: <Button data-testid={`edit-btn-${id}`} onClick={() => onEdit(user, id)}><span>Edit</span></Button>,
          deleteButton: <IconButton data-testid={`delete-btn-${id}`}  onClick={() => deleteUserModal(id)}><Icon src={DeleteImg} alt="Delete User" /></IconButton>,
        }
      })
      setTableData(tempTableData);
    }
  }, [users])

  return (
    <>
      <Modal isOpen={modalOpen} onClose={() => setIsModalOpen(false)}>
        <DeleteModal>
          <b>Are you sure you want to delete user?</b>
          <DeleteButton onClick={() => onDeleteUser()}>DELETE</DeleteButton>
          <CancelButton onClick={() => setIsModalOpen(false)}><b>CANCEL</b></CancelButton>
        </DeleteModal>
      </Modal>
      <Table rowData={tableData}></Table>
    </>
  );
};

export default UserList;

