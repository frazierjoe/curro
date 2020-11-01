import { makeStyles, Card, CardContent, CardHeader, CardActions, Divider, List, ListItem } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import React from 'react';


const useStyles = makeStyles((theme) => ({
    weekColumn: {
        marginTop: "1em"
    },
    weekHeader: {
        padding: "1em",
        textAlign: "center"
    }
}));
const WeekColumn = ({postsToday, date}) => {
    const classes = useStyles();

    let titles = postsToday.map(post => {
        return (<ListItem>{post.title}</ListItem>)
    })
    let titlesList = (
        <List>
            {titles}
        </List>
    )

    return (
        <div>
            <Card className={classes.weekColumn}>
                <div className={classes.weekHeader}>
                    {getDayStringShortened(date)} {date.toLocaleDateString(undefined, {day: "numeric"})}
                </div>
                <Divider></Divider>
                {titlesList}
            </Card>
        </div>
    );
}

export default WeekColumn;

function getDayString(date){
    let day = date.getDay();
    let dayString = '';
    switch (day) {
        case 0:
            dayString = 'Sunday'
            break;
        case 1:
            dayString = 'Monday'
            break;
        case 2:
            dayString = 'Tuesday'
            break;
        case 3:
            dayString = 'Wednesday'
            break;
        case 4:
            dayString = 'Thursday'
            break;
        case 5:
            dayString = 'Friday'
            break;
        case 6:
            dayString = 'Saturday'
            break;

        default:
            break;
    }
    return dayString;
}

function getDayStringShortened(date){
    let day = date.getDay();
    let dayString = '';
    switch (day) {
        case 0:
            dayString = 'SUN'
            break;
        case 1:
            dayString = 'MON'
            break;
        case 2:
            dayString = 'TUE'
            break;
        case 3:
            dayString = 'WED'
            break;
        case 4:
            dayString = 'THU'
            break;
        case 5:
            dayString = 'FRI'
            break;
        case 6:
            dayString = 'SAT'
            break;

        default:
            break;
    }
    return dayString;
}