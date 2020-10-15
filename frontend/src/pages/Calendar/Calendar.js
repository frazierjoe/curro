import React, { useState }  from 'react';
import { NewActivityModal } from '../../components/NewActivityModal';
import { ToolBar } from './ToolBar';
import { CalendarView } from './CalendarView';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles((theme) => ({
  addFab: {
    position: 'fixed',
    bottom: 16,
    right: 16,
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));


export const Calendar = () => {

  const [openModal, setOpenModal] = useState(false)

  const classes = useStyles();

  function FormRow() {
    return (
      <React.Fragment>
        <Grid item xs={1}>
          <Paper className={classes.paper}>item</Paper>
        </Grid>
        <Grid item xs={1}>
          <Paper className={classes.paper}>item</Paper>
        </Grid>
        <Grid item xs={1}>
          <Paper className={classes.paper}>item</Paper>
        </Grid>
        <Grid item xs={1}>
          <Paper className={classes.paper}>item</Paper>
        </Grid>
        <Grid item xs={1}>
          <Paper className={classes.paper}>item</Paper>
        </Grid>
        <Grid item xs={1}>
          <Paper className={classes.paper}>item</Paper>
        </Grid>
        <Grid item xs={1}>
          <Paper className={classes.paper}>item</Paper>
        </Grid>
      </React.Fragment>
    );
  }

  return (
    <div styles={{height: "100%", alignItems:"stretch"}}>
      <ToolBar/>
      <CalendarView/>
      <NewActivityModal openModal={openModal} handleClose={() => setOpenModal(false)}/>
      <span className={classes.addFab}>
        <Fab color="secondary" aria-label="add" onClick={() => setOpenModal(true)}>
            <AddIcon />
        </Fab>
      </span>
    </div>);
}
