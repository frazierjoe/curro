import React, { useState } from 'react';
import { Footer } from '../../components/Footer';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import FormatColorFillIcon from '@material-ui/icons/FormatColorFill';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Pagination from '@material-ui/lab/Pagination';


const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 512,
    margin: "16px auto 16px auto",
    [theme.breakpoints.down('xs')]: {
      margin: 0,
      marginBottom: 16,
      width: "100%",
    },
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  iconButton: {
    padding: 10,
  },
  results: {
    flex: 1,
  },
  pagination: {
    width: '100%',
    margin: "16px auto 16px auto",
    bottom: 0,
    position: 'absolute'
  },
  paginationControl: {
    width: 364,
    margin: 'auto',
  },
 
}));

export const Explore = () => {

  const [filters, setFilters] = useState(() => ['Users']);
  const [searchQuery, setSearchQuery] = useState('');

  const handleFilters = (event, newFilters) => {
    // Make sure there is always a filter selected
    if(newFilters){
      setFilters(newFilters);
    }
  };


  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    console.log("TODO API Call to search for ")
    console.log(searchQuery)
    console.log("with the following filters")
    console.log(filters)
  };

  const classes = useStyles();

  return (
    <div>
      <Paper className={classes.root}>
        <InputBase
          className={classes.input}
          value={searchQuery}
          onChange={handleSearch}
          placeholder={"Search " + filters}
          inputProps={{ 'aria-label': 'search curro' }}
        />
        <IconButton className={classes.iconButton} aria-label="search">
          <SearchIcon />
        </IconButton>
        <Divider className={classes.divider} orientation="vertical" />
        <ToggleButtonGroup value={filters} size="small" onChange={handleFilters} exclusive aria-label="search filters">
          <ToggleButton value="Users" aria-label="bold">
            Users
          </ToggleButton>
          <ToggleButton value="Teams" aria-label="italic">
            Teams
          </ToggleButton>
        </ToggleButtonGroup>
      </Paper>
      <div className={classes.results}>

      </div>
      <div className={classes.pagination}>
        <Pagination count={10} color="secondary" className={classes.paginationControl}/>
      </div>
      <Footer />
    </div>);
}