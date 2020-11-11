import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardHeader, Snackbar } from '@material-ui/core';
import UserStatsActivitySelect from './UserStatsActivitySelect';
import UserStatsChart from './UserStatsChart';
import { gql, useQuery } from '@apollo/client';
import CircularProgress from '@material-ui/core/CircularProgress';
import MuiAlert from '@material-ui/lab/Alert';
import ErrorSnackbar from './ErrorSnackbar';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: '32px',
        display: "flex",
        justifyContent: "center",
        flexDirection: "column"
    },
    profileWrapper: {
        maxWidth: '1080px',
        display: "flex",
        alignItems: "center",
        flexDirection: "column"
    },
    spinnerWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        height: '100%'
    }

}));



// API Calls
const GET_ALL_ACTIVITIES = gql`
  query getPostList{
    me {
        postList{
            id
            postDate
            activityList {
                id
                type
                duration
                distance {
                    value
                    unit
                }
                equipment {
                    id
                    type
                    name
                }
                additionalInfo {
                    averageHeartRate
                    elevationGain
                    calories
                }
            }
            # likeList
            # commentList
        }
    }
}
`;

const UserStats = () => {
    const classes = useStyles();
    const [activity, setActivity] = React.useState('');

    const { data, loading, error } = useQuery(GET_ALL_ACTIVITIES);

    if (error) {
        console.error(error);
        return (
            <>
                <ErrorSnackbar/>
                <div>
                    An error was encountered retrieving your stats :(
                </div>
            </>
        )
    }


    if (!loading) {
        console.log('data :>> ', data);
    }

    return (
        <Card>
            <CardHeader
                title="Stats"
            />
            <CardContent>

                <UserStatsActivitySelect activity={activity} setActivity={setActivity} />
                {loading ? 
                (
                    <div className={classes.spinnerWrapper}>
                        <CircularProgress color="primary" />
                    </div>
                )
                : <UserStatsChart postList={data.me.postList} />
                }


            </CardContent>
        </Card>
    );
}

export default UserStats;