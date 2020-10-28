import { makeStyles, Card, CardContent, CardHeader, CardActions } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import React from 'react';
import ActivityContent from './ActivityContent';


const useStyles = makeStyles((theme) => ({
    card: {
        maxWidth: "400px",
        margin: "2em",
    },

}));

const DayView = ({ date }) => {
    const classes = useStyles();
    return (
        <div style={{display: "flex", justifyContent: "center"}}>
            <Card className={classes.card}>
                <CardHeader
                    title="I just went on a sick run dude"
                    subheader={date.toLocaleDateString({ year: 'numeric', month: 'long', day: 'numeric' })}
                />
                <CardContent>
                    Ran 3 miles, puked, ran 3 miles, puked, ran 3 miles, pukedRan 3 miles, puked, ran 3 miles, puked, ran 3 miles, puked
                    Ran 3 miles, puked, ran 3 miles, puked, ran 3 miles, pukedRan 3 miles, puked, ran 3 miles, puked, ran 3 miles, pukedRan 3 miles, puked, ran 3 miles, puked, ran 3 miles, puked
                    Ran 3 miles, puked, ran 3 miles, puked, ran 3 miles, pukedRan 3 miles, puked, ran 3 miles, puked, ran 3 miles, puked
                </CardContent>
                <ActivityContent/>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                        <ShareIcon />
                    </IconButton>
                </CardActions>
            </Card>
        </div>
    );
}

export default DayView;