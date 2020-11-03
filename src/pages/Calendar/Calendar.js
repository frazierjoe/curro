import React, { useEffect, useState } from 'react';

import DayView from './DayView';
import { NewActivityModal } from '../../components/NewActivityModal';
import { ToolBar } from './ToolBar';
import { CalendarView } from './CalendarView';
import WeeklyView from './WeeklyView';

import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';

import { gql, useQuery } from '@apollo/client';

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
    spinnerWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        height: '100%'
    }

}));

// API Calls
const GET_POSTLIST = gql`
  query getPostList{
    me {
        first
        postList{
            id
            title
            note
            author {
                username
            }
            tagList {
                id
                username
            }
            postDate
            createdAt
            updatedAt
            activityList {
                id
                type
                duration
                distance {
                    value
                    unit
                }
                equipment {
                    id
                    type
                    name
                }
                additionalInfo {
                    averageHeartRate
                    elevationGain
                    calories
                }
            }
            # likeList
            # commentList
        }
    }
}
`;

export const Calendar = () => {
    const classes = useStyles();

    // API State
    const { data, loading, error } = useQuery(GET_POSTLIST);
    console.log('data :>> ', data);

    let postList = undefined;
    if (data) {
        postList = data.me.postList;
    }
    // console.log('postList :>> ', postList);  

    // Calendar UI State
    const [date, setDate] = useState(new Date());
    const [view, setView] = React.useState("month");
    const [openModal, setOpenModal] = useState(false);
    const [firstDayOfWeek, setFirstDayOfWeek] = useState("Sunday");

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
            currentViewComponent = <CalendarView postList={postList} date={date} setDate={setDate} setView={setView} firstDayOfWeek={firstDayOfWeek} />;
            break;
        case "week":
            currentViewComponent = <WeeklyView postList={postList} date={date} setDate={setDate} setView={setView} firstDayOfWeek={firstDayOfWeek} />;
            break;
        case "day":
            currentViewComponent = <DayView postList={postList} date={date} />;
            break;
        default:
            currentViewComponent = null;
            alert("Sanity Check: Unrecognized view in Calendar.js");
            break;
    }

    return (
        <div styles={{ height: 670, alignItems: "stretch" }}>
            <ToolBar date={date} setDate={setDate} view={view} setView={setView} setFirstDayOfWeek={setFirstDayOfWeek} />
            {loading ? (
                <div className={classes.spinnerWrapper}>
                    <CircularProgress color="primary" />
                </div>
            )
                : currentViewComponent}
            <NewActivityModal openModal={openModal} handleClose={() => setOpenModal(false)} />
            <span className={classes.addFab}>
                <Fab color="secondary" aria-label="add" onClick={() => setOpenModal(true)}>
                    <AddIcon />
                </Fab>
            </span>
        </div>);
}