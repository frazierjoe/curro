import { makeStyles } from '@material-ui/core';
import React from 'react';
import DayViewPost from './DayViewPost';

const useStyles = makeStyles((theme) => ({
    dayViewPostsWrapper: {
        display: "flex", 
        justifyItems: "center", 
        alignItems: "center", 
        justifyContent: "center", 
        flexDirection: "column"
    }
}));



const DayView = ({ postList, date }) => {
    const classes = useStyles();

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

    return (
        <div className={classes.dayViewPostsWrapper}>
            {postComponents}
        </div>
    );
}

export default DayView;