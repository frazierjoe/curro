import React, { useState }  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  Paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    borderRadius: 0,
    height: 192
  },
  weekday: {
    padding: 1,
    textAlign: 'Center',
    color: theme.palette.text.secondary,
    borderRadius: 0,
  }
}));


export const CalendarView = () => {

  const classes = useStyles();

  function WeekView(props) {
    return (
      <Grid container direction="row" justify="center" alignItems="stretch" >
        <Grid item xs>
          <Paper className={classes.Paper}>{1+(props.week*7)}</Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.Paper}>{2+(props.week*7)}</Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.Paper}>{3+(props.week*7)}</Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.Paper}>{4+(props.week*7)}</Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.Paper}>{5+(props.week*7)}</Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.Paper}>{6+(props.week*7)}</Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.Paper}>{7+(props.week*7)}</Paper>
        </Grid>
      </Grid>
    );
  }

  function WeekDayLabel() {
    return (
      <Grid container direction="row" justify="center" alignItems="stretch" >
        <Grid item xs>
          <Paper className={classes.weekday} >MON</Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.weekday} >TUE</Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.weekday} >WED</Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.weekday} >THU</Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.weekday} >FRI</Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.weekday} >SAT</Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.weekday} >SUN</Paper>
        </Grid>
      </Grid>
    );
  }

  return (
    <div>
      <Grid container direction="column" justify="center" alignItems="stretch">
        <Grid item xs={12}>
          <WeekDayLabel/>
        </Grid>
        <Grid item xs={12}>
          <WeekView week={0}/>
        </Grid>
        <Grid item xs={12}>
          <WeekView week={1}/>
        </Grid>
        <Grid item xs={12}>
          <WeekView week={2}/>
        </Grid>
        <Grid item xs={12}>
          <WeekView week={3}/>
        </Grid>
      </Grid>
    </div>);
}
