import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(2),
    padding: '30px',
    borderRadius: '10px',
    width: '90%',
    backgroundColor: '#ffffff',
    margin: '20px auto',
    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  textField: {
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2), 
  },
  select: {
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2), 
  },
  searchButton: {
    textTransform: 'none',
    marginBottom: theme.spacing(2), 
  },
}));

const CustomFilter = ({ onSearch, onCategoryChange, onStatusChange }) => {
  const classes = useStyles();
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const handleSearch = () => {
    onSearch(searchText, selectedCategory, selectedStatus);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    onCategoryChange(event.target.value);
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
    onStatusChange(event.target.value);
  };

  return (
    <div className={classes.root}>
      <div>
      <b style={{display:"block"}}>What are you looking for?</b>
      <TextField
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        className={classes.textField}
        placeholder="Search for category, name, company, etc"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      </div>
      <div>
      <b style={{display:"block"}}>Category</b>
      <Select
        className={classes.select}
        label="Category"
        value={selectedCategory}
        onChange={handleCategoryChange}
      >
        <MenuItem value="All">All</MenuItem>
        <MenuItem value="Electronics">Electronics</MenuItem>
        <MenuItem value="Clothing">Clothing</MenuItem>
        <MenuItem value="Books">Books</MenuItem>
      </Select>
      </div>
      <div>
        <b style={{display:"block"}}>Status</b>
      <Select
        className={classes.select}
        label="Status"
        value={selectedStatus}
        onChange={handleStatusChange}
      >
        <MenuItem value="All">All</MenuItem>
        <MenuItem value="Pending">Pending</MenuItem>
        <MenuItem value="Processing">Processing</MenuItem>
        <MenuItem value="Completed">Completed</MenuItem>
      </Select>
      </div>
      
      <Button
        className={classes.searchButton}
        variant="contained"
        color="primary"
        onClick={handleSearch}
        style={{borderRadius:'10px'}}
      >
        SEARCH
      </Button>
    </div>
  );
};

export default CustomFilter;
