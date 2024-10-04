import { useState } from "react";
// Theme
import { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
// React Grid Logic
import "ag-grid-community/styles/ag-grid.css";
// Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css";

import { styled } from '../../stitches.config';

interface TableProps {
    rowData: any[];
  }

  interface IRow {
    gender: 'male' | 'female';
    firstname: string;
    lastname: string;
    age: number;
  }

  const TableContainer = styled('div', {
    padding: '16px',
    gap: '0px',
    borderRadius: '16px',
    border: '1px',
    opacity: '0px',
    justifyContent: 'center',
    display: 'flex',
    margin: 'auto'
  })

  const Table: React.FC<TableProps> = ({ rowData }) => {
    const EditButton = (params:any) => {
        return params.data.editButton;
    };

    const DeleteButton = (params:any) => {
        return params.data.deleteButton;
    };

    const numberSort = (num1: number, num2: number) => {
        return num1 - num2;
    };

    const [columnDefs] = useState([
      { field: 'gender', headerName: 'Gender' },
      { field: 'firstname', headerName: 'First Name' },
      { field: 'lastname', headerName: 'Last Name' },
      { field: 'age', headerName: 'Age', comparator: numberSort },
      {
        field: 'editButton',
        headerName: '',
        cellRenderer: (params: any) => (
            EditButton(params)
        ),
      },
      {
        field: 'deleteButton',
        headerName: '',
        cellRenderer: (params: any) => (
            DeleteButton(params)
        ),
      },
    ]);

    const defaultColDef: ColDef = {
        flex: 1,
    };
  
    return (
      <TableContainer>
        <div className={"ag-theme-quartz"} style={{ width: '1296px', height: '448px' }}>
            <AgGridReact
                defaultColDef={defaultColDef}
                rowData={rowData}
                columnDefs={columnDefs}
            />
        </div>
      </TableContainer>
    );
  };
  
  export default Table;
  