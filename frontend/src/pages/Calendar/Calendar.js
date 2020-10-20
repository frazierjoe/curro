import React, { useEffect, useState } from 'react';
import { NewActivityModal } from '../../components/NewActivityModal';
import { ToolBar } from './ToolBar';
import { CalendarView } from './CalendarView';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import DayView from './DayView';
import WeeklyView from './WeeklyView';


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
    const classes = useStyles();

    // Calendar State
    const [date, setDate] = useState(new Date());
    const [view, setView] = React.useState("month");
    const [openModal, setOpenModal] = useState(false);

    // Event Handlers ********
    const viewSwitchKeyPressListener = (e) => {
        switch (e.key) {
            case "m":
                setView("month");
                break;
            case "w":
                setView("week");
                break;
            case "d":
                setView("day");
                break;
            default:
                break;
        }
    };
    useEffect(() => {
        document.addEventListener("keydown", viewSwitchKeyPressListener, false);
    })

    // Display Logic
    let currentViewComponent = null;
    switch (view) {
        case "month":
            currentViewComponent = <CalendarView date={date} setDate={setDate} setView={setView} />;
            break;
        case "week":
            currentViewComponent = <WeeklyView date={date}/>;
            break;
        case "day":
            currentViewComponent = <DayView date={date} />;
            break;
        default:
            currentViewComponent = null;
            alert("Sanity Check: Unrecognized view in Calendar.js");
            break;
    }

    return (
        <div styles={{ height: 670, alignItems: "stretch" }}>
            <ToolBar date={date} setDate={setDate} view={view} setView={setView} />
            {currentViewComponent}
            <NewActivityModal openModal={openModal} handleClose={() => setOpenModal(false)} />
            <span className={classes.addFab}>
                <Fab color="secondary" aria-label="add" onClick={() => setOpenModal(true)}>
                    <AddIcon />
                </Fab>
            </span>
        </div>);
}
