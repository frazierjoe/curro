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

const Day = ({ dayDate, currentMonth, setView, postsInWeek }) => {
    // Styling
    const classes = useStyles();
    const offMonth = currentMonth !== dayDate.getMonth();

    // Linear Scan
    // Todo: Not Efficient, only works for one post in a day
    let post = undefined;
    if (postsInWeek){
        postsInWeek.filter(post => {
            let postDate = new Date(post.createdAt);
            if (postDate.getDate() === dayDate.getDate() && postDate.getMonth() === dayDate.getMonth() && postDate.getFullYear() === dayDate.getFullYear()){
                return true;
            }
            return false;
        })
    }

    // Event Handlers
    const enterDayView = () => {
        console.log('Clicked on' + dayDate.toISOString());
        setView("day");
    };

    return (
        <td className={classes.cellStyling}>
            {/* Always have dayWrapperStyling. Sometimes have offMonthStyling */}
            <div className={`${classes.dayWrapperStyling} ${offMonth ? classes.offMonthStyling : ''}`}>
                {/* Div that changes to day view */}
                <div onClick={enterDayView}>
                    {dayDate.getDate()}
                    {post ? "I have a post today": ""}
                </div>
            </div>
        </td>
    );
}

export default Day;