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



import { Button } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  appbar: {
    backgroundColor: theme.palette.info,
    position: 'static',
  },
  title: {
    marginRight: theme.spacing(2),
  },
  displayCurrent: {
    flexGrow: 1,
  },
  iconButton: {
    marginRight: theme.spacing(2),
  },
}));


export const ToolBar = () => {

  const [view, setView] = React.useState(31);

  const handleViewChange = (event) => {
    setView(event.target.value);
  };

  const classes = useStyles();

  return (
    <Toolbar>
      <IconButton edge="start" color="inherit" >
        <TodayIcon />
      </IconButton>
      <Typography variant="h5" className={classes.title}>
        Calendar
      </Typography>
      <Button variant="outlined" size="small" className={classes.iconButton}>Today</Button>
      <IconButton color="inherit">
        <ChevronLeftIcon />
      </IconButton>
      <IconButton color="inherit" className={classes.iconButton}>
        <ChevronRightIcon />
      </IconButton>
      <Typography variant="h5" color="textSecondary" className={classes.displayCurrent}>
        October 2020
      </Typography>
      <IconButton color="inherit" className={classes.iconButton}>
        <SettingsIcon />
      </IconButton>
      <FormControl>
        <NativeSelect
          value={view}
          name="age"
          onChange={handleViewChange}
        >
          <option value={1}>Day</option>
          <option value={7}>Week</option>
          <option value={31}>Month</option>
        </NativeSelect>
      </FormControl>
    </Toolbar>
  );
}
