import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { cacheSlot } from '@apollo/client/cache';
import { useSwipeable, Swipeable } from 'react-swipeable'
import { responsePathAsArray } from 'graphql';
import Month from './Month';
import add from 'date-fns/add';



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


export const CalendarView = ({ postList, date, setDate, setView, firstDayOfWeek }) => {
    // Styles
    const classes = useStyles();

    // Event Handlers
    const next = () => {
        console.log("Swiped next month/week/day")
        setDate(prevDate => {
            let copy = new Date(prevDate);
            console.log('copy :>> ', copy);
            return add(copy, {months: 1});
        });
    }

    const previous = () => {
        console.log("Swiped previous month/week/day");
        setDate(prevDate => {
            let copy = new Date(prevDate);
            console.log('copy :>> ', copy);
            return add(copy, {months: -1});
        });
    }

    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => next(),
        onSwipedRight: () => previous(),
        preventDefaultTouchmoveEvent: true,
        trackMouse: true
    });


    // -------------- Display Logic
    // Change Calendar Table headers depending on chosen firstDayOfWeek
    let tableHeaders = null;
    switch (firstDayOfWeek) {
        case "Sunday":
            tableHeaders = (
                <>
                    <th>SUN</th>
                    <th>MON</th>
                    <th>TUE</th>
                    <th>WED</th>
                    <th>THU</th>
                    <th>FRI</th>
                    <th>SAT</th>
                </>
            )
            break;
        case "Monday":
            tableHeaders = (
                <>
                    <th>MON</th>
                    <th>TUE</th>
                    <th>WED</th>
                    <th>THU</th>
                    <th>FRI</th>
                    <th>SAT</th>
                    <th>SUN</th>
                </>
            )
            break;

        default:
            alert("Sanity Check: Non valid firstDayOfWeek specified");
            break;
    }

    return (
        <div  {...swipeHandlers} className={classes.scrollView}>
            <table className={classes.tableStyling}>
                <thead className={classes.tableHeader}>
                    <tr>
                        {tableHeaders}
                    </tr>
                </thead>
                {/* The Month component generates TBody */}
                <Month postList={postList} date={date} setView={setView} firstDayOfWeek={firstDayOfWeek}/>
            </table>
        </div>);
}
