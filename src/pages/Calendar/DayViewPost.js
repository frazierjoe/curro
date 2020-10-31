import React from 'react';
import { makeStyles, Card, CardContent, CardHeader, CardActions } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ActivityContent from './ActivityContent';

const useStyles = makeStyles((theme) => ({
    card: {
        width: "40%",
        margin: "2em",
    },
}));

const DayViewPost = ({ post }) => {
    const classes = useStyles();
    console.log('post :>> ', post);
    return (
        <Card className={classes.card}>
            <CardHeader
                title={post.title}
                subheader={(new Date(post.postDate)).toLocaleDateString({ year: 'numeric', month: 'long', day: 'numeric' })}
            />
            <CardContent>
                {post.note}
            </CardContent>

            <ActivityContent activityList={post.activityList}/>
            
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
            </CardActions>
        </Card>
    )
}
export default DayViewPost;
