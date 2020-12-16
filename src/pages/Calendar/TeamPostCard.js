import { Card, CardContent, CardHeader, Hidden, makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    cardContent: {
        textAlign: "left"
    }
}));
const TeamPostCard = ({post}) => {
    const classes = useStyles();
    return (
        <Card>
            <CardHeader title={post.title}/>
            <CardContent className={classes.cardContent}>
                <Hidden smDown>{post.note}</Hidden>
            </CardContent>
        </Card>
    );
}
 
export default TeamPostCard;