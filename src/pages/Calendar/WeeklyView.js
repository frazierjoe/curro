import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import WeekColumn from './WeekColumn';

const useStyles = makeStyles((theme) => ({
    gridParent: {
        display: "grid",
        gridTemplateColumns: "repeat(7, 1fr)",
        columnGap: "1em"
    }
}));
const WeeklyView = ({date, firstDayOfWeek}) => {
    const classes = useStyles();

    // Get the first day of the month and get the first Sunday of that week.
    let dayOne = new Date(date);
    let sunday = new Date(dayOne);
    sunday.setDate(dayOne.getDate() - dayOne.getDay());

    let item = new Date(sunday);
    if (firstDayOfWeek === "Monday") {
        // Edge case: if the first day of a month is sunday, I want to go back a week.  
        if (dayOne.getDay() === 0) {
            item.setDate(item.getDate() - 7);
        }
        item.setDate(item.getDate() + 1);
    }
    
    let weekColumns = [];
    for (let i = 0; i < 7; i++) {
        let day = new Date(item);
        weekColumns.push(
            <WeekColumn date={day} key={`-week-column + ${day.toISOString()}`}/>
        )
        item.setDate(item.getDate() + 1);
    }

    return (
        <div className={classes.gridParent}>
            {weekColumns}
        </div>
    );
}
 
export default WeeklyView;