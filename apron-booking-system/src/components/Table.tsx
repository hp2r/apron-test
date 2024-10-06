import { useState } from "react";
import { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { styled } from '../../stitches.config';
import { TableDataProps } from "../types/user";
import { numberSort } from "../utils/numberSort";

interface TableProps {
  rowData: TableDataProps[];
}

interface ButtonProps {
  data: TableDataProps
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
  const EditButton = (params:ButtonProps) => {
      return params.data.editButton;
  };
  const DeleteButton = (params:ButtonProps) => {
      return params.data.deleteButton;
  };

  const [columnDefs] = useState([
    { field: 'gender', headerName: 'Gender' },
    { field: 'firstname', headerName: 'First Name' },
    { field: 'lastname', headerName: 'Last Name' },
    { field: 'age', headerName: 'Age',  comparator: numberSort },
    {
      field: 'editButton',
      headerName: '',
      cellRenderer: (params: {data: TableDataProps}): React.ReactNode => (
          EditButton(params)
      ),
    },
    {
      field: 'deleteButton',
      headerName: '',
      cellRenderer: (params: {data: TableDataProps}): React.ReactNode => (
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
  