import { Card, CardHeader, makeStyles } from '@material-ui/core';
import { add } from 'date-fns';
import React from 'react';
import { useSwipeable } from 'react-swipeable';
import DayViewPost from './DayViewPost';

const useStyles = makeStyles((theme) => ({
    dayViewPostsWrapper: {
        display: "flex", 
        justifyItems: "center", 
        alignItems: "center", 
        justifyContent: "center", 
        flexDirection: "column"
    },
    card: {
        width: "40%",
        margin: "2em",
    },
}));



const DayView = ({ postList, date, setDate }) => {
    const classes = useStyles();

    // Event Handlers
    const next = () => {
        console.log("Swiped next month/week/day")
        setDate(prevDate => {
            let copy = new Date(prevDate);
            console.log('copy :>> ', copy);
            return add(copy, {days: 1});
        });
    }

    const previous = () => {
        console.log("Swiped previous month/week/day");
        setDate(prevDate => {
            let copy = new Date(prevDate);
            console.log('copy :>> ', copy);
            return add(copy, {days: -1});
        });
    }

    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => next(),
        onSwipedRight: () => previous(),
        preventDefaultTouchmoveEvent: true,
        trackMouse: true
    });


    // Linear Scan through postList to find a matching date
    let postsToday = postList.filter(post => {
        let postDate = new Date(post.postDate);
        let sameYear = date.getFullYear() === postDate.getFullYear();
        let sameMonth = date.getMonth() === postDate.getMonth();
        let sameDate = date.getDate() === postDate.getDate();
        let exactSameDate = sameYear && sameMonth && sameDate;
        return exactSameDate;
    });

    // Map them to cards
    let postComponents = postsToday.map(post => <DayViewPost post={post} key={`-dayView-post-${post.id}`}/>);


    console.log('postsToday :>> ', postsToday);
    let noPostMessage = null;
    if (postsToday.length === 0){
        console.log('0');
        noPostMessage = (
            <Card className={classes.card}>
                <CardHeader title="No Posts Today :(" />
            </Card>
        )
    }

    return (
        <div {...swipeHandlers} className={classes.dayViewPostsWrapper}>
            {noPostMessage}
            {postComponents}
        </div>
    );
}

export default DayView;