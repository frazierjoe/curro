import React from 'react';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    // Always displayed styling
    dayWrapperStyling : {
        display: "flex",
        flexDirection: "column",
        height: "100%"
    },
    cellStyling : {
        border: "1px solid black",
        height: "calc(100%/6)",
        minHeight: "50px",
        width: "calc(100%/7)"
    },

    // Conditional Styles
    offMonthStyling: {
        color: theme.palette.text.secondary
    }
}));

const Day = ({ dayDate, currentMonth }) => {
    const classes = useStyles();
    const offMonth = currentMonth !== dayDate.getMonth();
    return (
        <td className={classes.cellStyling}>
            <div className={`${classes.dayWrapperStyling} ${offMonth ? classes.offMonthStyling : ''}`}>
                {dayDate.getDate()}
            </div>
        </td>
    );
}

export default Day;