import { makeStyles, Card, CardContent } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    card:{
        height: "140px",
        maxWidth: "400px",
        margin: "2em"
    },

}));

const DayView = ({date}) => {
    const classes = useStyles();
    return (
        <>
            <Card>{date.toLocaleDateString({ year: 'numeric', month: 'long', day: 'numeric' })}</Card>
            <Card className={classes.card}>
                <CardContent>
                    I think maybe go with css grid's auto features from jeannette Youtube lady.
                </CardContent>
            </Card>
            <Card className={classes.card}>
                <CardContent>
                    Bruh
                </CardContent>
            </Card>
        </>
    );
}

export default DayView;