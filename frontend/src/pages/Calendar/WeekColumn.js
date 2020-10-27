import { makeStyles, Card, CardContent, CardHeader, CardActions } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ActivityContent from './ActivityContent';
import React from 'react';


const useStyles = makeStyles((theme) => ({

}));
const WeekColumn = ({date}) => {
    const classes = useStyles();

    return (
        <div>
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
                <ActivityContent />
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

export default WeekColumn;