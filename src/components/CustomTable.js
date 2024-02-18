import React, { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

import data from '../static/data';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent:'space-between',
    flexDirection:'column',
    marginBottom: theme.spacing(2),
    padding: '30px',
    borderRadius: '10px',
    width: '90%',
    backgroundColor:'#ffffff',
    margin: '20px auto',
    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  textField: {
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2), // Added margin bottom
  },
  select: {
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2), // Added margin bottom
  },
  searchButton: {
    textTransform: 'none',
    marginBottom: theme.spacing(2), // Added margin bottom
  },
  table: {
    minWidth: '700px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
    textTransform: 'uppercase',
    margin: '-0 -10px',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
    div:{
      marginRight: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    select:{
      marginRight: theme.spacing(2),
      marginBottom: theme.spacing(2),
    }
  },
  pagination: {
    display: 'flex',
    alignItems: 'center',
    margin: '15px 0px'
  },
  roundedButton: {
    borderRadius: '5px',
    padding:'5px',
    marginLeft: '5px',
    marginRight: '5px',
  },
  ellipsis: {
    margin: '0 5px',
  },
}));

const columns = [
  'id',
  'shipify',
  'date',
  'status',
  'customer',
  'email',
  'country',
  'shipping',
  'source',
  'ordertype',
];

const CustomTable = () => {
  const classes = useStyles();
  const [visibleColumns, setVisibleColumns] = useState(() => {
    const initialState = {};
    columns.forEach(column => {
      initialState[column] = true;
    });
    return initialState;
  });
  const [selectedColumn, setSelectedColumn] = useState('all');
  const [selectedRows, setSelectedRows] = useState([]);
  const [page, setPage] = useState(1);
  const tableRef = useRef();

  const handleColumnToggle = (columnName) => {
    setSelectedColumn(columnName);
  };

  const handleRowCheckboxChange = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const handleDispatchSelected = () => {
    const updatedVisibleColumns = {};
    columns.forEach(column => {
      updatedVisibleColumns[column] = column === selectedColumn || column === 'id'; // Ensure ID column is always visible
    });
    setVisibleColumns(updatedVisibleColumns);
    tableRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const totalPages = Math.ceil(data.length / 10);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <>
      <div className={classes.root}> 
        <div className={classes.header}>
          <div>
            <h2>Product Summary</h2>
          </div>
          <div>
            <label htmlFor="column-select" style={{margin:'0px 5px 0px 20px'}}>Show</label>
            <Select
              style={{marginBottom:'8px'}}
              id="column-select"
              value={selectedColumn}
              onChange={(event) => handleColumnToggle(event.target.value)}
            >
              <MenuItem value="all"><b>All columns</b></MenuItem>
              {columns.map((column) => (
                <MenuItem key={column} value={column} style={{textTransform: 'capitalize'}}>
                  {column}
                </MenuItem>
              ))}
            </Select>
            <Button
              variant="contained"
              color="primary"
              onClick={handleDispatchSelected}
              disabled={!selectedColumn}
              style={{marginRight:'8px', borderRadius:'10px'}}
            >
              Dispatch Selected
            </Button>
          </div>
          <div className={classes.pagination}>
            <Button
              className={classes.roundedButton}
              disabled={page === 1}
              onClick={() => handlePageChange(page - 1)}
            >
              {"<"}
            </Button>
            {pageNumbers.slice(0, 3).map((pageNumber, index) => (
              <Button
                key={pageNumber}
                variant={page === pageNumber ? 'contained' : 'outlined'}
                color="primary"
                style={{borderRadius:'10px'}}
                className={classes.roundedButton}
                onClick={() => handlePageChange(pageNumber)}
              >
                {pageNumber}
              </Button>
            ))}
            {pageNumbers.length > 2 && (
              <>
                <span className={classes.ellipsis}>...</span>
                <Button
                  variant={page === totalPages ? 'contained' : 'outlined'}
                  color="primary"
                  className={classes.roundedButton}
                  onClick={() => handlePageChange(totalPages)}
                >
                  {totalPages}
                </Button>
              </>
            )}
            <Button
              className={classes.roundedButton}
              disabled={page === totalPages}
              onClick={() => handlePageChange(page + 1)}
            >
              {">"}
            </Button>
          </div>
        </div>
        <TableContainer component={Paper} ref={tableRef}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                {columns.map(
                  (column) =>
                    visibleColumns[column] && (
                      <TableCell key={column} style={{textTransform: 'uppercase', fontWeight: 'bold' }}>{column}</TableCell>
                    )
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.slice((page - 1) * 10, page * 10).map((row) => (
                <TableRow key={row.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedRows.includes(row.id)}
                      onChange={() => handleRowCheckboxChange(row.id)}
                      color="primary"
                    />
                  </TableCell>
                  {columns.map((column) => (
                    visibleColumns[column] && (
                      <TableCell key={column}>
                        {column === 'date' ? formatDate(row[column]) : row[column]}
                      </TableCell>
                    )
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default CustomTable;
