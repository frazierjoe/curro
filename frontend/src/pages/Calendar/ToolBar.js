import React, { useState }  from 'react';
import { NewActivityModal } from '../../components/NewActivityModal';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import TodayIcon from '@material-ui/icons/Today';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import SettingsIcon from '@material-ui/icons/Settings';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import Tooltip from '@material-ui/core/Tooltip';
import { Button, Hidden } from '@material-ui/core';



const useStyles = makeStyles((theme) => ({
  appbar: {
    backgroundColor: theme.palette.background.main,
    color: '#4c4c4c',
    position: 'static',
  },
  toolbar: {
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 4, 
      paddingRight: 4,
    },
  },
  title: {
    marginRight: theme.spacing(2),
  },
  displayCurrent: {
    flexGrow: 1,
  },
  iconButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      margin: 0, 
    },
  },
}));



export const ToolBar = () => {

  const [view, setView] = React.useState("month");

  const handleViewChange = (event) => {
    setView(event.target.value);
    console.log("View changed to " + event.target.value)
    // setViewType(getViewSelected(event.target.value))
  };

  const currentDate = new Date(Date.now()); 
  var options = { year: 'numeric', month: 'long'};
  const currentMonthYear = currentDate.toLocaleDateString("en-US", options)

  const todayButton = () => {
    console.log("Today Button Clicked")
  }

  const previousButton = () => {
    console.log("Previous Button Clicked")
  }

  const nextButton = () => {
    console.log("Next Button Clicked")
  }

  const settingsButton = () => {
    console.log("Settings Button Clicked")

  }
  
  const classes = useStyles();

  return (
    <AppBar className={classes.appbar}>
    <Toolbar className={classes.toolbar}>
      <Hidden smUp>
        <Tooltip title={currentDate.toDateString()} enterDelay={400} >
          <IconButton color="inherit" onClick={todayButton}>
            <TodayIcon />
          </IconButton>
        </Tooltip>
      </Hidden>
      <Hidden xsDown>
        <TodayIcon className={classes.iconButton} />
      </Hidden>
      <Hidden xsDown>
        <Typography variant="h5" className={classes.title} >
          Calendar
        </Typography>
      </Hidden>
      <Hidden xsDown>
        <Tooltip title={currentDate.toDateString()} enterDelay={400} >
          <Button variant="outlined" size="small" className={classes.iconButton} onClick={todayButton} >Today</Button>
        </Tooltip>
        <Tooltip title={"Previous " + view} enterDelay={400} >
          <IconButton color="inherit" onClick={previousButton}>
            <ChevronLeftIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title={"Next " + view} enterDelay={400} >
          <IconButton color="inherit" className={classes.iconButton} onClick={nextButton}>
            <ChevronRightIcon />
          </IconButton>
        </Tooltip>
      </Hidden>
      <Typography variant="h5" color="textSecondary" className={classes.displayCurrent}>
        {currentMonthYear}
      </Typography>
      <Tooltip title="Settings" enterDelay={400} >
        <IconButton color="inherit" className={classes.iconButton} onClick={settingsButton}>
          <SettingsIcon />
        </IconButton>
      </Tooltip>
      <FormControl>
        <NativeSelect
          value={view}
          name="age"
          onChange={handleViewChange}
        >
          <option value={"day"}>Day</option>
          <option value={"week"}>Week</option>
          <option value={"month"}>Month</option>
        </NativeSelect>
      </FormControl>
    </Toolbar>
    </AppBar>
  );
}
