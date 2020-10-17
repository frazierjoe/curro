import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { cacheSlot } from '@apollo/client/cache';
import { useSwipeable, Swipeable } from 'react-swipeable'
import { responsePathAsArray } from 'graphql';
import Month from './Month';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  headerSpacer: {
    height: "24px"
  },
  scrollView: {
    [theme.breakpoints.down('sm')]: {
      maxHeight: 'calc(100vh - 112px)',
      fallbacks: [
        { maxHeight: '-moz-calc(100vh - 112px)' },
        { maxHeight: '-webkit-calc(100vh - 112px)' },
        { maxHeight: '-o-calc(100vh - 112px)' }
      ],
    },
    [theme.breakpoints.up('md')]: {
      maxHeight: 'calc(100vh - 128px)',
      fallbacks: [
        { maxHeight: '-moz-calc(100vh - 128px)' },
        { maxHeight: '-webkit-calc(100vh - 128px)' },
        { maxHeight: '-o-calc(100vh - 128px)' }
      ],
    },
    overflow: 'auto',
  },
  mainView: {
    scrollbarWidth: 'none',
  },
  tableStyling: {
    borderCollapse: "collapse",
    border: "1px solid black",
    width: "100%",
    height: "80vh"
  },
  tableHeader: {
    color: theme.palette.text.primary,
  }
}));


export const CalendarView = ({ date, setDate }) => {

  const next = () => {
    console.log("Swiped next month/week/day")
    setDate(prevDate => {
      let copy = new Date(prevDate);
      copy.setMonth(copy.getMonth() + 1);
      return copy;
    });
  }
  const previous = () => {
    console.log("Swiped previous month/week/day");
    setDate(prevDate => {
      let copy = new Date(prevDate);
      copy.setMonth(copy.getMonth() - 1);
      return copy;
    });

  }

  const handlers = useSwipeable({
    onSwipedLeft: () => next(),
    onSwipedRight: () => previous(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  const classes = useStyles();

  return (
    <div  {...handlers} className={classes.scrollView}>
      <table className={classes.tableStyling}>
        <thead className={classes.tableHeader}>
          <tr>
            <th>SUN</th>
            <th>MON</th>
            <th>TUE</th>
            <th>WED</th>
            <th>THU</th>
            <th>FRI</th>
            <th>SAT</th>
          </tr>
        </thead>
        {/* The Month component generates TBody */}
        <Month date={date} />
      </table>
    </div>);
}
